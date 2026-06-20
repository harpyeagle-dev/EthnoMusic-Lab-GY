from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

from .annotation_schema import write_schema
from .audio_features import batch_extract
from .rhythm_analysis import compare_group_tempo


SUPPORTED_AUDIO_EXTENSIONS = (".wav", ".mp3", ".flac", ".m4a")


def _find_audio_files(audio_dir: Path) -> list[Path]:
    return sorted(
        path for path in audio_dir.iterdir() if path.is_file() and path.suffix.lower() in SUPPORTED_AUDIO_EXTENSIONS
    )


def _write_recording_index(path: Path) -> Path:
    template = pd.DataFrame(
        [
            {
                "recording_id": "sample-001",
                "file_name": "example.wav",
                "community": "",
                "location": "",
                "event_context": "",
                "performer_notes": "",
            }
        ]
    )
    template.to_csv(path, index=False)
    return path


def initialize_study(root: str | Path = ".") -> dict[str, str]:
    base = Path(root)
    audio_dir = base / "data/raw/audio"
    transcripts_dir = base / "data/raw/transcripts"
    processed_dir = base / "data/processed"
    docs_dir = base / "docs"
    notebooks_dir = base / "notebooks"
    metadata_path = base / "data/raw/recording_index.csv"
    schema_path = base / "docs/annotation_schema.yaml"

    audio_dir.mkdir(parents=True, exist_ok=True)
    transcripts_dir.mkdir(parents=True, exist_ok=True)
    processed_dir.mkdir(parents=True, exist_ok=True)
    docs_dir.mkdir(parents=True, exist_ok=True)
    notebooks_dir.mkdir(parents=True, exist_ok=True)

    if not metadata_path.exists():
        _write_recording_index(metadata_path)
    if not schema_path.exists():
        write_schema(schema_path)

    return {
        "audio_dir": str(audio_dir),
        "transcripts_dir": str(transcripts_dir),
        "metadata_csv": str(metadata_path),
        "schema_yaml": str(schema_path),
        "processed_dir": str(processed_dir),
    }


def run_study_pipeline(root: str | Path = ".", group_column: str = "community") -> dict[str, str | int]:
    base = Path(root)
    initialize_study(base)

    audio_dir = base / "data/raw/audio"
    metadata_path = base / "data/raw/recording_index.csv"
    features_path = base / "data/processed/features.csv"
    summary_path = base / "data/processed/rhythm_summary.json"

    audio_files = _find_audio_files(audio_dir)
    used_existing_features = False

    if audio_files:
        features_df = batch_extract(audio_files, features_path)
    elif features_path.exists():
        features_df = pd.read_csv(features_path)
        used_existing_features = True
    else:
        return {
            "status": "waiting-for-audio",
            "message": "Add files to data/raw/audio or provide data/processed/features.csv.",
            "audio_dir": str(audio_dir),
            "metadata_csv": str(metadata_path),
        }

    if metadata_path.exists():
        metadata_df = pd.read_csv(metadata_path)
        if "file_name" in metadata_df.columns and "file_name" in features_df.columns:
            merged_df = features_df.merge(metadata_df, how="left", on="file_name")
            merged_df.to_csv(features_path, index=False)
            features_df = merged_df

    if group_column not in features_df.columns:
        return {
            "status": "features-ready",
            "message": f"Features are ready, but group column '{group_column}' is missing.",
            "features_csv": str(features_path),
            "metadata_csv": str(metadata_path),
        }

    summary_df = compare_group_tempo(features_df, group_column=group_column)
    with summary_path.open("w", encoding="utf-8") as handle:
        json.dump(summary_df.to_dict(orient="records"), handle, indent=2)

    return {
        "status": "complete",
        "audio_files": len(audio_files),
        "used_existing_features": int(used_existing_features),
        "features_csv": str(features_path),
        "rhythm_summary_json": str(summary_path),
    }