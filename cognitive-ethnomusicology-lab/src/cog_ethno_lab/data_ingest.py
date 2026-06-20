from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd
import soundfile as sf

SUPPORTED_AUDIO_EXTENSIONS = {".wav", ".mp3", ".flac", ".m4a"}


def _next_recording_id(existing_ids: pd.Series) -> str:
    numeric_ids = (
        existing_ids.astype(str)
        .str.extract(r"(\d+)$", expand=False)
        .dropna()
        .astype(int)
    )
    next_id = int(numeric_ids.max()) + 1 if not numeric_ids.empty else 1
    return f"rec-{next_id:04d}"


def register_recordings(
    audio_dir: str | Path,
    index_csv: str | Path,
    community: str = "",
    location: str = "",
    event_context: str = "",
) -> pd.DataFrame:
    """Register audio files in the recording index, appending only missing file names."""
    audio_root = Path(audio_dir)
    if not audio_root.exists():
        raise ValueError(f"Audio directory does not exist: {audio_root}")

    files = sorted(
        path.name
        for path in audio_root.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_AUDIO_EXTENSIONS
    )
    if not files:
        raise ValueError(f"No supported audio files found in {audio_root}")

    index_path = Path(index_csv)
    index_path.parent.mkdir(parents=True, exist_ok=True)

    if index_path.exists():
        index_df = pd.read_csv(index_path)
    else:
        index_df = pd.DataFrame(
            columns=["recording_id", "file_name", "community", "location", "event_context", "performer_notes"]
        )

    existing = set(index_df.get("file_name", pd.Series(dtype=str)).astype(str).tolist())

    rows: list[dict[str, str]] = []
    for file_name in files:
        if file_name in existing:
            continue
        rows.append(
            {
                "recording_id": _next_recording_id(index_df.get("recording_id", pd.Series(dtype=str))),
                "file_name": file_name,
                "community": community,
                "location": location,
                "event_context": event_context,
                "performer_notes": "",
            }
        )
        if rows:
            index_df = pd.concat([index_df, pd.DataFrame(rows[-1:])], ignore_index=True)

    index_df.to_csv(index_path, index=False)
    return index_df


def generate_sample_recordings(output_dir: str | Path, sample_rate: int = 22050) -> list[Path]:
    """Generate short synthetic recordings for pipeline smoke-testing."""
    root = Path(output_dir)
    root.mkdir(parents=True, exist_ok=True)

    durations = [8.0, 9.5, 7.0]
    tempos = [88, 104, 122]
    freqs = [220.0, 261.6, 329.6]
    paths: list[Path] = []

    for idx, (duration, tempo, freq) in enumerate(zip(durations, tempos, freqs, strict=True), start=1):
        t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
        base = 0.12 * np.sin(2 * np.pi * freq * t)
        beat_hz = tempo / 60.0
        pulse = (np.sin(2 * np.pi * beat_hz * t) > 0.95).astype(float)
        envelope = np.clip(np.convolve(pulse, np.hanning(512), mode="same"), 0, 1)
        signal = base + 0.28 * envelope * np.sin(2 * np.pi * (freq * 2.0) * t)

        path = root / f"sample_field_{idx:02d}.wav"
        sf.write(path, signal, sample_rate)
        paths.append(path)

    return paths
