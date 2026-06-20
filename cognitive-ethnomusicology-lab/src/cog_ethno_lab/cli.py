from __future__ import annotations

import json
from pathlib import Path

import click
import pandas as pd

from .annotation_schema import write_schema
from .audio_features import batch_extract
from .coding_templates import create_interview_coding_templates
from .data_ingest import generate_sample_recordings, register_recordings
from .omeka_mapping import generate_omeka_import_csv
from .pipeline import initialize_study, run_study_pipeline
from .report_export import export_report_package
from .rhythm_clustering import cluster_rhythm_styles, write_cluster_outputs
from .rhythm_analysis import compare_group_tempo
from .transcript_support import (
    analyze_code_frequency,
    analyze_speaker_turns,
    analyze_transcript_directory,
    write_transcript_template,
)


@click.group()
def main() -> None:
    """CLI for cognitive ethnomusicology lab tasks."""


@main.command()
@click.option("--output", default="docs/annotation_schema.yaml", show_default=True)
def schema(output: str) -> None:
    path = write_schema(output)
    click.echo(f"Schema written to {path}")


@main.command("transcript-template")
@click.option("--recording-id", required=True)
@click.option("--output-dir", default="data/raw/transcripts", show_default=True)
def transcript_template(recording_id: str, output_dir: str) -> None:
    path = write_transcript_template(recording_id=recording_id, output_dir=output_dir)
    click.echo(f"Transcript template written to {path}")


@main.command("create-coding-templates")
@click.option("--output-dir", default="data/templates", show_default=True)
def create_coding_templates(output_dir: str) -> None:
    artifacts = create_interview_coding_templates(output_dir)
    click.echo(json.dumps(artifacts, indent=2))


@main.command("init-study")
@click.option("--root", default=".", show_default=True)
def init_study(root: str) -> None:
    artifacts = initialize_study(root)
    click.echo(json.dumps(artifacts, indent=2))


@main.command("ingest-recordings")
@click.option("--audio-dir", default="data/raw/audio", show_default=True)
@click.option("--index", default="data/raw/recording_index.csv", show_default=True)
@click.option("--community", default="", show_default=True)
@click.option("--location", default="", show_default=True)
@click.option("--event-context", default="", show_default=True)
def ingest_recordings(audio_dir: str, index: str, community: str, location: str, event_context: str) -> None:
    df = register_recordings(
        audio_dir=audio_dir,
        index_csv=index,
        community=community,
        location=location,
        event_context=event_context,
    )
    click.echo(f"Recording index updated with {len(df)} total rows: {index}")


@main.command("generate-sample-recordings")
@click.option("--output-dir", default="data/raw/audio", show_default=True)
def generate_samples(output_dir: str) -> None:
    paths = generate_sample_recordings(output_dir=output_dir)
    click.echo(json.dumps([str(path) for path in paths], indent=2))


@main.command("extract-features")
@click.option("--audio-dir", default="data/raw/audio", show_default=True)
@click.option("--output", default="data/processed/features.csv", show_default=True)
def extract_features(audio_dir: str, output: str) -> None:
    path = Path(audio_dir)
    files = sorted(
        [*path.glob("*.wav"), *path.glob("*.mp3"), *path.glob("*.flac"), *path.glob("*.m4a")]
    )
    if not files:
        raise click.ClickException(f"No audio files found in {audio_dir}")

    df = batch_extract(files, output)
    click.echo(f"Extracted features for {len(df)} files to {output}")


@main.command("compare-rhythm")
@click.option("--features", default="data/processed/features.csv", show_default=True)
@click.option("--group", default="community", show_default=True)
@click.option("--output", default="data/processed/rhythm_summary.json", show_default=True)
def compare_rhythm(features: str, group: str, output: str) -> None:
    df = pd.read_csv(features)
    summary = compare_group_tempo(df, group_column=group)
    Path(output).parent.mkdir(parents=True, exist_ok=True)
    with open(output, "w", encoding="utf-8") as f:
        json.dump(summary.to_dict(orient="records"), f, indent=2)
    click.echo(f"Rhythm summary written to {output}")


@main.command("cluster-rhythms")
@click.option("--features", default="data/processed/features.csv", show_default=True)
@click.option("--clusters", default=3, show_default=True, type=int)
@click.option("--output", default="data/processed/rhythm_clusters.csv", show_default=True)
@click.option("--summary", default="data/processed/rhythm_cluster_summary.json", show_default=True)
def cluster_rhythms(features: str, clusters: int, output: str, summary: str) -> None:
    features_path = Path(features)
    if not features_path.exists():
        raise click.ClickException(
            f"Features file not found at {features}. Run 'cog-ethno-lab run-pipeline' or 'cog-ethno-lab extract-features' first."
        )

    df = pd.read_csv(features_path)
    labeled_df, summary_records = cluster_rhythm_styles(df, n_clusters=clusters)
    write_cluster_outputs(labeled_df, summary_records, output_csv=output, summary_json=summary)
    click.echo(f"Rhythm clusters written to {output} and {summary}")


@main.command("analyze-speakers")
@click.option("--transcript", required=True, help="Path to filled transcript CSV")
@click.option("--output", default=None, help="Save speaker summary to JSON")
def analyze_speakers(transcript: str, output: str | None) -> None:
    df = pd.read_csv(transcript)
    summary = analyze_speaker_turns(df)
    click.echo(json.dumps(summary, indent=2))
    if output:
        Path(output).parent.mkdir(parents=True, exist_ok=True)
        with open(output, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)
        click.echo(f"Speaker summary written to {output}")


@main.command("analyze-codes")
@click.option("--transcript", required=True, help="Path to filled transcript CSV")
@click.option("--code-column", default="performance_event", show_default=True, help="Column to analyze")
@click.option("--output", default=None, help="Save code frequency to JSON")
def analyze_codes(transcript: str, code_column: str, output: str | None) -> None:
    df = pd.read_csv(transcript)
    summary = analyze_code_frequency(df, code_column=code_column)
    click.echo(json.dumps(summary, indent=2))
    if output:
        Path(output).parent.mkdir(parents=True, exist_ok=True)
        with open(output, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)
        click.echo(f"Code frequency written to {output}")


@main.command("analyze-transcript-batch")
@click.option("--transcripts-dir", default="data/raw/transcripts", show_default=True)
@click.option("--code-column", default="performance_event", show_default=True)
@click.option("--output", default="data/processed/transcript_batch_summary.json", show_default=True)
def analyze_transcript_batch(transcripts_dir: str, code_column: str, output: str) -> None:
    summary = analyze_transcript_directory(transcripts_dir, code_column=code_column)
    Path(output).parent.mkdir(parents=True, exist_ok=True)
    with open(output, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)
    click.echo(f"Transcript batch summary written to {output}")


@main.command("run-pipeline")
@click.option("--root", default=".", show_default=True)
@click.option("--group", default="community", show_default=True)
def run_pipeline(root: str, group: str) -> None:
    artifacts = run_study_pipeline(root=root, group_column=group)
    click.echo(json.dumps(artifacts, indent=2))


@main.command("full-run")
@click.option("--root", default=".", show_default=True)
@click.option("--group", default="community", show_default=True)
@click.option("--clusters", default=3, show_default=True, type=int)
@click.option("--generate-samples", is_flag=True, help="Generate synthetic recordings if no audio is present.")
@click.option("--community", default="", show_default=True)
@click.option("--location", default="", show_default=True)
@click.option("--event-context", default="", show_default=True)
def full_run(
    root: str,
    group: str,
    clusters: int,
    generate_samples: bool,
    community: str,
    location: str,
    event_context: str,
) -> None:
    base = Path(root)
    artifacts = initialize_study(base)

    audio_dir = base / "data/raw/audio"
    if generate_samples:
        generate_sample_recordings(audio_dir)

    register_recordings(
        audio_dir=audio_dir,
        index_csv=base / "data/raw/recording_index.csv",
        community=community,
        location=location,
        event_context=event_context,
    )

    template_artifacts = create_interview_coding_templates(base / "data/templates")
    pipeline_artifacts = run_study_pipeline(root=base, group_column=group)

    transcript_summary = analyze_transcript_directory(base / "data/raw/transcripts", code_column="performance_event")
    transcript_summary_path = base / "data/processed/transcript_batch_summary.json"
    transcript_summary_path.parent.mkdir(parents=True, exist_ok=True)
    with transcript_summary_path.open("w", encoding="utf-8") as handle:
        json.dump(transcript_summary, handle, indent=2)

    if pipeline_artifacts.get("status") == "complete":
        features_path = base / "data/processed/features.csv"
        clusters_path = base / "data/processed/rhythm_clusters.csv"
        cluster_summary_path = base / "data/processed/rhythm_cluster_summary.json"
        rhythm_summary_path = base / "data/processed/rhythm_summary.json"

        features_df = pd.read_csv(features_path)
        labeled_df, cluster_summary = cluster_rhythm_styles(features_df, n_clusters=clusters)
        write_cluster_outputs(labeled_df, cluster_summary, output_csv=clusters_path, summary_json=cluster_summary_path)

        if group in labeled_df.columns:
            rhythm_summary = compare_group_tempo(labeled_df, group_column=group)
            with rhythm_summary_path.open("w", encoding="utf-8") as handle:
                json.dump(rhythm_summary.to_dict(orient="records"), handle, indent=2)

    click.echo(
        json.dumps(
            {
                "study": artifacts,
                "templates": template_artifacts,
                "pipeline": pipeline_artifacts,
                "transcript_batch_summary": str(transcript_summary_path),
            },
            indent=2,
        )
    )


@main.command("dashboard")
@click.option("--app", default="dashboard_app.py", show_default=True)
def dashboard(app: str) -> None:
    from subprocess import run

    result = run(["streamlit", "run", app], check=False)
    if result.returncode != 0:
        raise click.ClickException("Failed to launch dashboard. Ensure streamlit is installed and app path is correct.")


@main.command("export-report-package")
@click.option("--root", default=".", show_default=True)
@click.option("--output-dir", default="exports", show_default=True)
@click.option("--title", default="Cognitive Ethnomusicology Export", show_default=True)
@click.option("--creator", default="Lab Team", show_default=True)
@click.option("--rights", default="Research Use", show_default=True)
@click.option(
    "--source-url",
    default="https://digitalheritagegy.com/s/s/digitalheritage/page/home",
    show_default=True,
)
def export_package(root: str, output_dir: str, title: str, creator: str, rights: str, source_url: str) -> None:
    artifacts = export_report_package(
        root=root,
        output_dir=output_dir,
        title=title,
        creator=creator,
        rights=rights,
        source_url=source_url,
    )
    click.echo(json.dumps(artifacts, indent=2))


@main.command("generate-omeka-import-csv")
@click.option("--root", default=".", show_default=True)
@click.option("--export-folder", default=None, help="Specific export folder. Defaults to latest under exports/.")
@click.option("--output-csv", default=None, help="Output CSV path. Defaults to OMEKA_IMPORT_ITEMS.csv in export folder.")
@click.option("--profile-json", default=None, help="Optional field mapping profile JSON.")
def generate_omeka_csv(
    root: str,
    export_folder: str | None,
    output_csv: str | None,
    profile_json: str | None,
) -> None:
    artifacts = generate_omeka_import_csv(
        root=root,
        export_folder=export_folder,
        output_csv=output_csv,
        profile_json=profile_json,
    )
    click.echo(json.dumps(artifacts, indent=2))


if __name__ == "__main__":
    main()
