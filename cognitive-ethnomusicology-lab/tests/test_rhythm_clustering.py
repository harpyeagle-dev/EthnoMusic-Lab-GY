import pandas as pd

from cog_ethno_lab.rhythm_clustering import cluster_rhythm_styles


def test_cluster_rhythm_styles_assigns_cluster_labels() -> None:
    df = pd.DataFrame(
        {
            "tempo_bpm": [90, 95, 120],
            "onset_strength_mean": [0.2, 0.25, 0.4],
            "onset_strength_std": [0.05, 0.04, 0.08],
            "spectral_centroid_mean": [1400, 1450, 2200],
            "duration_sec": [80, 84, 110],
        }
    )

    labeled_df, summary = cluster_rhythm_styles(df, n_clusters=2)

    assert "rhythm_cluster" in labeled_df.columns
    assert len(summary) == 2