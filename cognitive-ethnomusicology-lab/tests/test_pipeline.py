from pathlib import Path

import pandas as pd

from cog_ethno_lab.pipeline import initialize_study, run_study_pipeline


def test_initialize_study_creates_expected_artifacts(tmp_path: Path) -> None:
    artifacts = initialize_study(tmp_path)

    assert Path(artifacts["audio_dir"]).exists()
    assert Path(artifacts["metadata_csv"]).exists()
    assert Path(artifacts["schema_yaml"]).exists()


def test_run_study_pipeline_uses_existing_features(tmp_path: Path) -> None:
    initialize_study(tmp_path)

    features_path = tmp_path / "data/processed/features.csv"
    pd.DataFrame(
        {
            "file_name": ["example.wav", "example-2.wav"],
            "tempo_bpm": [92, 110],
            "onset_strength_mean": [0.2, 0.35],
            "duration_sec": [80, 95],
        }
    ).to_csv(features_path, index=False)

    pd.DataFrame(
        {
            "recording_id": ["sample-001", "sample-002"],
            "file_name": ["example.wav", "example-2.wav"],
            "community": ["A", "B"],
            "location": ["Site 1", "Site 2"],
            "event_context": ["Ritual", "Rehearsal"],
            "performer_notes": ["", ""],
        }
    ).to_csv(tmp_path / "data/raw/recording_index.csv", index=False)

    artifacts = run_study_pipeline(tmp_path)

    assert artifacts["status"] == "complete"
    assert Path(artifacts["rhythm_summary_json"]).exists()