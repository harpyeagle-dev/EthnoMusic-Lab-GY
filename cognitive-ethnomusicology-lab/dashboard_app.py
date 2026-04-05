from __future__ import annotations

import importlib
import json
import sys
from pathlib import Path

import librosa
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

ROOT = Path(__file__).resolve().parent
SRC_DIR = ROOT / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))


create_interview_coding_templates = importlib.import_module(
    "cog_ethno_lab.coding_templates"
).create_interview_coding_templates
data_ingest_module = importlib.import_module("cog_ethno_lab.data_ingest")
generate_sample_recordings = data_ingest_module.generate_sample_recordings
register_recordings = data_ingest_module.register_recordings
generate_omeka_import_csv = importlib.import_module("cog_ethno_lab.omeka_mapping").generate_omeka_import_csv
pipeline_module = importlib.import_module("cog_ethno_lab.pipeline")
initialize_study = pipeline_module.initialize_study
run_study_pipeline = pipeline_module.run_study_pipeline
export_report_package = importlib.import_module("cog_ethno_lab.report_export").export_report_package
compare_group_tempo = importlib.import_module("cog_ethno_lab.rhythm_analysis").compare_group_tempo
rhythm_module = importlib.import_module("cog_ethno_lab.rhythm_clustering")
cluster_rhythm_styles = rhythm_module.cluster_rhythm_styles
write_cluster_outputs = rhythm_module.write_cluster_outputs
analyze_transcript_directory = importlib.import_module(
    "cog_ethno_lab.transcript_support"
).analyze_transcript_directory
autofix_transcript_data = importlib.import_module(
    "cog_ethno_lab.transcript_support"
).autofix_transcript_data
validate_transcript_data = importlib.import_module(
    "cog_ethno_lab.transcript_support"
).validate_transcript_data

st.set_page_config(page_title="Cognitive Ethnomusicology Dashboard", layout="wide")

DATA_RAW = ROOT / "data" / "raw"
DATA_PROCESSED = ROOT / "data" / "processed"
EXPORTS_DIR = ROOT / "exports"

index_path = DATA_RAW / "recording_index.csv"
features_path = DATA_PROCESSED / "features.csv"
clusters_path = DATA_PROCESSED / "rhythm_clusters.csv"
summary_path = DATA_PROCESSED / "rhythm_summary.json"
transcript_batch_path = DATA_PROCESSED / "transcript_batch_summary.json"
transcripts_dir = DATA_RAW / "transcripts"


def load_csv(path: Path) -> pd.DataFrame | None:
    if not path.exists():
        return None
    return pd.read_csv(path)


def load_json(path: Path) -> dict | list | None:
    if not path.exists():
        return None
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def latest_export_folder() -> Path | None:
    if not EXPORTS_DIR.exists():
        return None
    candidates = sorted([path for path in EXPORTS_DIR.glob("lab_report_*") if path.is_dir()])
    return candidates[-1] if candidates else None


@st.cache_data(show_spinner=False)
def load_audio_for_visualization(audio_path: str) -> tuple[np.ndarray, int]:
    y, sample_rate = librosa.load(audio_path, sr=22050)
    return y, sample_rate


@st.cache_data(show_spinner=False)
def load_audio_markers(audio_path: str) -> dict[str, object]:
    y, sample_rate = load_audio_for_visualization(audio_path)
    onset_frames = librosa.onset.onset_detect(y=y, sr=sample_rate)
    onset_times = librosa.frames_to_time(onset_frames, sr=sample_rate)
    tempo_raw, beat_frames = librosa.beat.beat_track(y=y, sr=sample_rate)
    beat_times = librosa.frames_to_time(beat_frames, sr=sample_rate)
    tempo = float(np.asarray(tempo_raw).reshape(-1)[0])
    return {
        "y": y,
        "sample_rate": sample_rate,
        "onset_times": onset_times,
        "beat_times": beat_times,
        "tempo": tempo,
    }


def build_waveform_figure(
    y: np.ndarray,
    sample_rate: int,
    title: str,
    onset_times: np.ndarray | None = None,
    beat_times: np.ndarray | None = None,
) -> go.Figure:
    times = np.arange(len(y)) / sample_rate
    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=times,
            y=y,
            mode="lines",
            line={"color": "#1f6f5f", "width": 1.2},
            fill="tozeroy",
            fillcolor="rgba(31, 111, 95, 0.18)",
            name="Amplitude",
        )
    )

    onset_times = onset_times if onset_times is not None else np.array([])
    beat_times = beat_times if beat_times is not None else np.array([])

    for onset in onset_times[:240]:
        fig.add_vline(x=float(onset), line_width=0.7, line_dash="dot", line_color="rgba(225, 112, 85, 0.40)")
    for beat in beat_times[:240]:
        fig.add_vline(x=float(beat), line_width=1.0, line_dash="solid", line_color="rgba(25, 86, 158, 0.38)")

    fig.update_layout(
        title=title,
        xaxis_title="Time (s)",
        yaxis_title="Amplitude",
        margin={"l": 20, "r": 20, "t": 50, "b": 20},
        height=320,
        template="plotly_white",
    )
    return fig


def build_spectrogram_figure(y: np.ndarray, sample_rate: int, title: str) -> go.Figure:
    spec = np.abs(librosa.stft(y, n_fft=2048, hop_length=512))
    spec_db = librosa.amplitude_to_db(spec, ref=np.max)
    times = librosa.times_like(spec_db, sr=sample_rate, hop_length=512)
    freqs = librosa.fft_frequencies(sr=sample_rate, n_fft=2048)

    fig = go.Figure(
        data=go.Heatmap(
            z=spec_db,
            x=times,
            y=freqs,
            colorscale="Cividis",
            colorbar={"title": "dB"},
        )
    )
    fig.update_layout(
        title=title,
        xaxis_title="Time (s)",
        yaxis_title="Frequency (Hz)",
        margin={"l": 20, "r": 20, "t": 50, "b": 20},
        height=360,
        template="plotly_white",
    )
    fig.update_yaxes(range=[0, min(8000, sample_rate // 2)])
    return fig


def run_full_workflow(generate_samples: bool, community: str, location: str, event_context: str) -> dict[str, str | int]:
    initialize_study(ROOT)

    if generate_samples:
        generate_sample_recordings(DATA_RAW / "audio")

    register_recordings(
        audio_dir=DATA_RAW / "audio",
        index_csv=DATA_RAW / "recording_index.csv",
        community=community,
        location=location,
        event_context=event_context,
    )

    create_interview_coding_templates(ROOT / "data/templates")
    pipeline_artifacts = run_study_pipeline(ROOT, group_column="community")

    transcript_summary = analyze_transcript_directory(DATA_RAW / "transcripts", code_column="performance_event")
    transcript_summary_path = DATA_PROCESSED / "transcript_batch_summary.json"
    transcript_summary_path.parent.mkdir(parents=True, exist_ok=True)
    transcript_summary_path.write_text(json.dumps(transcript_summary, indent=2), encoding="utf-8")

    if pipeline_artifacts.get("status") == "complete":
        features_df = pd.read_csv(DATA_PROCESSED / "features.csv")
        labeled_df, cluster_summary = cluster_rhythm_styles(features_df, n_clusters=3)
        write_cluster_outputs(
            labeled_df,
            cluster_summary,
            output_csv=DATA_PROCESSED / "rhythm_clusters.csv",
            summary_json=DATA_PROCESSED / "rhythm_cluster_summary.json",
        )
        if "community" in labeled_df.columns:
            rhythm_summary = compare_group_tempo(labeled_df, group_column="community")
            (DATA_PROCESSED / "rhythm_summary.json").write_text(
                json.dumps(rhythm_summary.to_dict(orient="records"), indent=2),
                encoding="utf-8",
            )

    return pipeline_artifacts


index_df = load_csv(index_path)
features_df = load_csv(features_path)
clusters_df = load_csv(clusters_path)
transcript_files = sorted(transcripts_dir.glob("*.csv")) if transcripts_dir.exists() else []
summary_data = load_json(summary_path)
transcript_batch_data = load_json(transcript_batch_path)
latest_export = latest_export_folder()

st.markdown(
    """
    <style>
    .stApp {
        background:
            radial-gradient(circle at top left, rgba(216, 183, 102, 0.18), transparent 28%),
            linear-gradient(180deg, #f8f4eb 0%, #f2ede0 100%);
    }
    .block-container {
        padding-top: 2rem;
        max-width: 1280px;
    }
    .hero {
        padding: 1.25rem 1.4rem;
        border-radius: 18px;
        background: linear-gradient(135deg, #153243 0%, #2e5e4e 100%);
        color: #f5efe2;
        margin-bottom: 1rem;
        box-shadow: 0 16px 40px rgba(21, 50, 67, 0.18);
    }
    .hero h1 {
        margin: 0;
        font-size: 2rem;
    }
    .hero p {
        margin: 0.5rem 0 0 0;
        max-width: 56rem;
        line-height: 1.5;
    }
    .artifact-card {
        padding: 0.9rem 1rem;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid rgba(21, 50, 67, 0.08);
        min-height: 120px;
    }
    .artifact-card strong {
        display: block;
        margin-bottom: 0.35rem;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    """
    <div class="hero">
      <h1>Cognitive Ethnomusicology Dashboard</h1>
      <p>Browse recordings, rhythm features, transcript activity, and archive packages from one field-to-analysis workspace.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

with st.sidebar:
    st.header("Workspace")
    st.write(f"Root: {ROOT}")
    st.write(f"Latest export: {latest_export.name if latest_export else 'None'}")
    st.divider()
    st.subheader("Actions")
    mode = st.radio("Mode", ["Analysis View", "Coder View"], index=0)
    generate_samples_flag = st.checkbox("Generate sample recordings", value=False)
    community_value = st.text_input("Community", value="Kabakaburi")
    location_value = st.text_input("Location", value="Region2")
    event_context_value = st.text_input("Event context", value="Rehearsal")

    if st.button("Run Full Workflow", use_container_width=True):
        try:
            pipeline_result = run_full_workflow(
                generate_samples=generate_samples_flag,
                community=community_value,
                location=location_value,
                event_context=event_context_value,
            )
            st.success(f"Workflow finished: {pipeline_result.get('status', 'complete')}")
            st.rerun()
        except Exception as exc:
            st.error(f"Workflow failed: {exc}")

    if st.button("Create Export Package", use_container_width=True):
        try:
            result = export_report_package(
                root=ROOT,
                output_dir="exports",
                title="Kabakaburi Lab Export",
                creator="Digital Heritage GY",
                rights="Community Permission Required",
                source_url="https://digitalheritagegy.com/s/s/digitalheritage/page/home",
            )
            st.success(f"Export created: {Path(result['zip_archive']).name}")
            st.rerun()
        except Exception as exc:
            st.error(f"Export failed: {exc}")

    if st.button("Generate Omeka Import CSV", use_container_width=True):
        try:
            result = generate_omeka_import_csv(
                root=ROOT,
                profile_json=ROOT / "data/templates/omeka_field_profile.example.json",
            )
            st.success(f"Omeka CSV created: {Path(result['output_csv']).name}")
            st.rerun()
        except Exception as exc:
            st.error(f"Omeka CSV generation failed: {exc}")

    st.divider()
    st.caption("Terminal equivalents")
    st.code("cog-ethno-lab full-run --root . --generate-samples", language="bash")
    st.code("cog-ethno-lab export-report-package --root . --output-dir exports", language="bash")
    st.code("cog-ethno-lab generate-omeka-import-csv --root .", language="bash")

col1, col2, col3, col4 = st.columns(4)
col1.metric("Recordings Indexed", int(index_df.shape[0]) if index_df is not None else 0)
col2.metric("Feature Rows", int(features_df.shape[0]) if features_df is not None else 0)
col3.metric("Transcript Files", len(transcript_files))
col4.metric("Export Packages", len([p for p in EXPORTS_DIR.glob('lab_report_*') if p.is_dir()]) if EXPORTS_DIR.exists() else 0)

st.divider()

tab1, tab2, tab3, tab4, tab5 = st.tabs(["Overview", "Recordings", "Rhythm Features", "Transcripts", "Exports"])

with tab1:
    left, right = st.columns([1.2, 1])
    with left:
        st.subheader("Study Snapshot")
        if index_df is not None:
            snapshot = index_df[[col for col in ["recording_id", "file_name", "community", "location", "event_context"] if col in index_df.columns]]
            st.dataframe(snapshot, use_container_width=True, height=260)
        else:
            st.info("No recording index found yet.")

    with right:
        st.subheader("Processed Outputs")
        cards = st.columns(2)
        card_data = [
            ("Features", features_path.exists(), features_path.name),
            ("Rhythm Summary", summary_path.exists(), summary_path.name),
            ("Transcript Batch", transcript_batch_path.exists(), transcript_batch_path.name),
            ("Latest Export", latest_export is not None, latest_export.name if latest_export else "Not available"),
        ]
        for idx, (label, exists, value) in enumerate(card_data):
            with cards[idx % 2]:
                st.markdown(
                    f"<div class='artifact-card'><strong>{label}</strong>{'Available' if exists else 'Missing'}<br>{value}</div>",
                    unsafe_allow_html=True,
                )

    if features_df is not None and {"tempo_bpm", "community"}.issubset(features_df.columns):
        st.subheader("Community Tempo Profile")
        tempo_fig = px.violin(
            features_df,
            x="community",
            y="tempo_bpm",
            box=True,
            points="all",
            color="community",
            title="Tempo distribution across indexed communities",
        )
        tempo_fig.update_layout(showlegend=False)
        st.plotly_chart(tempo_fig, use_container_width=True)

with tab2:
    st.subheader("Recording Index")
    if index_df is not None:
        idx_df = index_df.copy()
        st.dataframe(idx_df, use_container_width=True)
        st.download_button(
            "Download Recording Index CSV",
            data=idx_df.to_csv(index=False),
            file_name="recording_index.csv",
            mime="text/csv",
            use_container_width=True,
        )
        if "community" in idx_df.columns:
            community_counts = idx_df["community"].fillna("Unassigned").replace("", "Unassigned").value_counts().reset_index()
            community_counts.columns = ["community", "count"]
            fig = px.bar(community_counts, x="community", y="count", color="community", title="Recording count by community")
            fig.update_layout(showlegend=False)
            st.plotly_chart(fig, use_container_width=True)

        audio_files = sorted((DATA_RAW / "audio").glob("*.wav")) + sorted((DATA_RAW / "audio").glob("*.mp3"))
        if audio_files:
            st.subheader("Audio Preview")
            selected_audio = st.selectbox("Audio file", audio_files, format_func=lambda p: p.name)
            st.audio(str(selected_audio))

            markers = load_audio_markers(str(selected_audio))
            y = markers["y"]
            sample_rate = int(markers["sample_rate"])
            onset_times = np.asarray(markers["onset_times"])
            beat_times = np.asarray(markers["beat_times"])
            tempo = float(markers["tempo"])

            stat1, stat2, stat3 = st.columns(3)
            stat1.metric("Estimated Tempo (BPM)", f"{tempo:.1f}")
            stat2.metric("Detected Onsets", int(onset_times.shape[0]))
            stat3.metric("Detected Beats", int(beat_times.shape[0]))

            waveform_col, spectrogram_col = st.columns(2)
            waveform_col.plotly_chart(
                build_waveform_figure(
                    y,
                    sample_rate,
                    f"Waveform with Beat/Onset Overlays: {selected_audio.name}",
                    onset_times=onset_times,
                    beat_times=beat_times,
                ),
                use_container_width=True,
            )
            spectrogram_col.plotly_chart(
                build_spectrogram_figure(y, sample_rate, f"Spectrogram: {selected_audio.name}"),
                use_container_width=True,
            )
    else:
        st.info("No recording index found yet. Run: cog-ethno-lab init-study")

with tab3:
    st.subheader("Features and Clusters")
    if features_df is not None:
        feat_df = features_df.copy()
        st.dataframe(feat_df.head(100), use_container_width=True)
        st.download_button(
            "Download Features CSV",
            data=feat_df.to_csv(index=False),
            file_name="features.csv",
            mime="text/csv",
            use_container_width=True,
        )
        if {"tempo_bpm", "community"}.issubset(feat_df.columns):
            fig = px.box(feat_df, x="community", y="tempo_bpm", title="Tempo by Community")
            st.plotly_chart(fig, use_container_width=True)
        if {"tempo_bpm", "onset_strength_mean"}.issubset(feat_df.columns):
            color_col = "community" if "community" in feat_df.columns else None
            fig2 = px.scatter(
                feat_df,
                x="tempo_bpm",
                y="onset_strength_mean",
                color=color_col,
                title="Tempo vs Onset Strength",
            )
            st.plotly_chart(fig2, use_container_width=True)
    else:
        st.warning("No features.csv yet. Run: cog-ethno-lab run-pipeline")

    if clusters_df is not None:
        st.subheader("Clustered Rhythm Data")
        cl_df = clusters_df.copy()
        st.dataframe(cl_df.head(100), use_container_width=True)
        if {"rhythm_cluster", "tempo_bpm"}.issubset(cl_df.columns):
            cluster_fig = px.scatter(
                cl_df,
                x="tempo_bpm",
                y="onset_strength_mean" if "onset_strength_mean" in cl_df.columns else "duration_sec",
                color="rhythm_cluster",
                hover_data=[col for col in ["file_name", "community"] if col in cl_df.columns],
                title="Rhythm cluster separation",
            )
            st.plotly_chart(cluster_fig, use_container_width=True)

with tab4:
    st.subheader("Transcript Browser")
    if transcript_files:
        selected = st.selectbox("Transcript file", transcript_files, format_func=lambda p: p.name)
        if selected:
            tdf = pd.read_csv(selected)

            if mode == "Coder View":
                st.info("Coder View active: focus on transcript editing and timestamp alignment.")
            else:
                st.info("Analysis View active: edit transcript and review speaker summaries.")

            edited_df = st.data_editor(
                tdf,
                use_container_width=True,
                num_rows="dynamic",
                key=f"editor_{selected.name}",
            )
            c_save, c_reload, c_snap = st.columns([1, 1, 1])
            if c_save.button("Save Transcript Changes", use_container_width=True):
                edited_df.to_csv(selected, index=False)
                st.success(f"Saved transcript: {selected.name}")
            if c_reload.button("Reload From Disk", use_container_width=True):
                st.rerun()
            if c_snap.button("Snap Times to Beat Grid", use_container_width=True):
                audio_candidates = sorted((DATA_RAW / "audio").glob("*.wav")) + sorted((DATA_RAW / "audio").glob("*.mp3"))
                if not audio_candidates:
                    st.error("No reference audio files available in data/raw/audio")
                elif {"start_time_sec", "end_time_sec"}.issubset(edited_df.columns):
                    reference_audio = audio_candidates[0]
                    markers = load_audio_markers(str(reference_audio))
                    beat_times = np.asarray(markers["beat_times"])
                    if beat_times.size == 0:
                        st.error("No beats detected in reference audio.")
                    else:
                        for column in ["start_time_sec", "end_time_sec"]:
                            values = pd.to_numeric(edited_df[column], errors="coerce").fillna(0.0).to_numpy()
                            snapped = [float(beat_times[np.argmin(np.abs(beat_times - value))]) for value in values]
                            edited_df[column] = snapped
                        st.success(f"Snapped timestamps using beat grid from {reference_audio.name}")

            c_validate, c_fix = st.columns([1, 1])
            if c_validate.button("Validate Transcript", use_container_width=True):
                report = validate_transcript_data(edited_df)
                if report["is_valid"]:
                    st.success("Transcript validation passed. No issues found.")
                else:
                    st.warning(f"Found {report['issue_count']} issues")
                    st.json(report)

            if c_fix.button("Auto-fix Common Issues", use_container_width=True):
                fixed_df = autofix_transcript_data(edited_df)
                fixed_df.to_csv(selected, index=False)
                st.success("Applied auto-fixes and saved transcript. Reloading editor.")
                st.rerun()

            st.download_button(
                "Download Edited Transcript CSV",
                data=edited_df.to_csv(index=False),
                file_name=selected.name,
                mime="text/csv",
                use_container_width=True,
            )

            if {"speaker_id", "start_time_sec", "end_time_sec"}.issubset(tdf.columns):
                speaker = (
                    edited_df.groupby("speaker_id")
                    .agg(turn_count=("speaker_id", "count"), start_time_sec=("start_time_sec", "min"), end_time_sec=("end_time_sec", "max"))
                    .reset_index()
                )
                speaker["duration_sec"] = speaker["end_time_sec"] - speaker["start_time_sec"]
                fig3 = px.bar(speaker, x="speaker_id", y="turn_count", color="speaker_id", title="Speaker Turn Count")
                fig4 = px.bar(speaker, x="speaker_id", y="duration_sec", color="speaker_id", title="Speaker Duration")
                c1, c2 = st.columns(2)
                c1.plotly_chart(fig3, use_container_width=True)
                c2.plotly_chart(fig4, use_container_width=True)

        if transcript_batch_data:
            st.subheader("Transcript Batch Summary")
            st.json(transcript_batch_data)
    else:
        st.info("No transcript CSV files found in data/raw/transcripts")

with tab5:
    st.subheader("Export Packages")
    if latest_export:
        st.write(f"Latest export: {latest_export.name}")
        export_files = sorted(latest_export.iterdir())
        export_df = pd.DataFrame(
            {
                "file_name": [path.name for path in export_files],
                "size_bytes": [path.stat().st_size for path in export_files],
            }
        )
        st.dataframe(export_df, use_container_width=True)

        omeka_manifest = load_json(latest_export / "OMEKA_MANIFEST.json")
        report_summary = load_json(latest_export / "REPORT_SUMMARY.json")
        import_csv = latest_export / "OMEKA_IMPORT_ITEMS.csv"

        left, right = st.columns(2)
        with left:
            st.subheader("Omeka Manifest")
            if omeka_manifest:
                st.json(omeka_manifest)
        with right:
            st.subheader("Report Summary")
            if report_summary:
                st.json(report_summary)

        if import_csv.exists():
            st.subheader("Omeka Import CSV")
            st.dataframe(pd.read_csv(import_csv), use_container_width=True)
    else:
        st.info("No export packages found yet. Run: cog-ethno-lab export-report-package --root . --output-dir exports")
