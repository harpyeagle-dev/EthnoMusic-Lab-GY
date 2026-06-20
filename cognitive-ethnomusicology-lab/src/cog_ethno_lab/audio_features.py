from __future__ import annotations

from pathlib import Path
from typing import Any

import librosa
import numpy as np
import pandas as pd


def extract_track_features(audio_path: str | Path, sr: int = 22050) -> dict[str, Any]:
    """Extract compact descriptors useful for comparative rhythm studies."""
    source_path = Path(audio_path)
    y, sample_rate = librosa.load(str(source_path), sr=sr)

    tempo_raw, _ = librosa.beat.beat_track(y=y, sr=sample_rate)
    # librosa may return tempo as scalar or 1-element ndarray depending on version.
    tempo = float(np.asarray(tempo_raw).reshape(-1)[0])
    onset_env = librosa.onset.onset_strength(y=y, sr=sample_rate)
    spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sample_rate)

    return {
        "audio_path": str(source_path),
        "file_name": source_path.name,
        "duration_sec": float(librosa.get_duration(y=y, sr=sample_rate)),
        "tempo_bpm": tempo,
        "onset_strength_mean": float(np.mean(onset_env)),
        "onset_strength_std": float(np.std(onset_env)),
        "spectral_centroid_mean": float(np.mean(spectral_centroid)),
    }


def batch_extract(audio_files: list[str | Path], output_csv: str | Path) -> pd.DataFrame:
    rows = [extract_track_features(path) for path in audio_files]
    df = pd.DataFrame(rows)
    Path(output_csv).parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_csv, index=False)
    return df
