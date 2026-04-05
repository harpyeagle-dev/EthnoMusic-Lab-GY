from pathlib import Path

import pandas as pd

from cog_ethno_lab.transcript_support import analyze_transcript_directory


def test_analyze_transcript_directory_returns_aggregate(tmp_path: Path) -> None:
    t1 = tmp_path / "a.csv"
    t2 = tmp_path / "b.csv"

    pd.DataFrame(
        {
            "speaker_id": ["s1", "s2"],
            "start_time_sec": [0.0, 10.0],
            "end_time_sec": [10.0, 20.0],
            "performance_event": ["ritual", "lesson"],
        }
    ).to_csv(t1, index=False)

    pd.DataFrame(
        {
            "speaker_id": ["s1"],
            "start_time_sec": [0.0],
            "end_time_sec": [5.0],
            "performance_event": ["ritual"],
        }
    ).to_csv(t2, index=False)

    summary = analyze_transcript_directory(tmp_path)

    assert summary["transcript_count"] == 2
    assert summary["total_turns"] == 3
    assert len(summary["analyses"]) == 2
