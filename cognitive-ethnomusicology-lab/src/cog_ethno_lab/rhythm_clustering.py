from __future__ import annotations

import json
from pathlib import Path

import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler


DEFAULT_CLUSTER_COLUMNS = [
    "tempo_bpm",
    "onset_strength_mean",
    "onset_strength_std",
    "spectral_centroid_mean",
    "duration_sec",
]


def cluster_rhythm_styles(
    features_df: pd.DataFrame,
    n_clusters: int = 3,
    feature_columns: list[str] | None = None,
) -> tuple[pd.DataFrame, list[dict[str, float | int]]]:
    selected_columns = feature_columns or DEFAULT_CLUSTER_COLUMNS
    missing = [column for column in selected_columns if column not in features_df.columns]
    if missing:
        raise ValueError(f"Missing required columns for clustering: {missing}")
    if len(features_df) < n_clusters:
        raise ValueError("Number of rows must be at least the number of clusters")

    model_frame = features_df[selected_columns].copy()
    scaled_values = StandardScaler().fit_transform(model_frame)
    labels = KMeans(n_clusters=n_clusters, n_init=10, random_state=42).fit_predict(scaled_values)

    labeled_df = features_df.copy()
    labeled_df["rhythm_cluster"] = labels

    summary = (
        labeled_df.groupby("rhythm_cluster")[selected_columns]
        .mean(numeric_only=True)
        .reset_index()
        .to_dict(orient="records")
    )
    return labeled_df, summary


def write_cluster_outputs(
    labeled_df: pd.DataFrame,
    summary_records: list[dict[str, float | int]],
    output_csv: str | Path,
    summary_json: str | Path,
) -> None:
    output_csv_path = Path(output_csv)
    summary_json_path = Path(summary_json)
    output_csv_path.parent.mkdir(parents=True, exist_ok=True)
    summary_json_path.parent.mkdir(parents=True, exist_ok=True)

    labeled_df.to_csv(output_csv_path, index=False)
    with summary_json_path.open("w", encoding="utf-8") as handle:
        json.dump(summary_records, handle, indent=2)