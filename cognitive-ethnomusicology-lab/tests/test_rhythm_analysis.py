import pandas as pd

from cog_ethno_lab.rhythm_analysis import compare_group_tempo


def test_compare_group_tempo_returns_summary() -> None:
    df = pd.DataFrame(
        {
            "community": ["A", "A", "B"],
            "tempo_bpm": [100, 110, 90],
        }
    )

    summary = compare_group_tempo(df)
    assert set(summary["community"]) == {"A", "B"}
    assert "mean" in summary.columns
