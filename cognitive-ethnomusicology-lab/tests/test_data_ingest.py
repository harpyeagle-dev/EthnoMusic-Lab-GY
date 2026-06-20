from pathlib import Path

import pandas as pd

from cog_ethno_lab.data_ingest import generate_sample_recordings, register_recordings


def test_generate_sample_recordings_creates_files(tmp_path: Path) -> None:
    paths = generate_sample_recordings(tmp_path)
    assert len(paths) == 3
    assert all(path.exists() for path in paths)


def test_register_recordings_adds_missing_files(tmp_path: Path) -> None:
    audio_dir = tmp_path / "audio"
    index_path = tmp_path / "recording_index.csv"
    generate_sample_recordings(audio_dir)

    df = register_recordings(
        audio_dir=audio_dir,
        index_csv=index_path,
        community="Kabakaburi",
        location="Region 1",
        event_context="Rehearsal",
    )

    assert df.shape[0] == 3
    assert set(df["community"]) == {"Kabakaburi"}

    # Running twice should not duplicate rows.
    df2 = register_recordings(audio_dir=audio_dir, index_csv=index_path)
    assert df2.shape[0] == 3
