from __future__ import annotations

import pandas as pd


def compare_group_tempo(
    features_df: pd.DataFrame,
    group_column: str = "community",
    tempo_column: str = "tempo_bpm",
) -> pd.DataFrame:
    """Compare tempo distribution summaries across groups."""
    required = {group_column, tempo_column}
    missing = required - set(features_df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")

    summary = (
        features_df.groupby(group_column)[tempo_column]
        .agg(["count", "mean", "median", "std", "min", "max"])
        .reset_index()
    )
    return summary
