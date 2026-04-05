import pandas as pd

from cog_ethno_lab.transcript_support import (
    analyze_code_frequency,
    analyze_speaker_turns,
    autofix_transcript_data,
    validate_transcript_data,
)


def test_analyze_speaker_turns_counts_turns_per_speaker() -> None:
    df = pd.DataFrame(
        {
            "speaker_id": ["speaker-1", "speaker-1", "speaker-2"],
            "start_time_sec": [0.0, 30.0, 60.0],
            "end_time_sec": [15.0, 45.0, 75.0],
            "utterance": ["hello", "world", "test"],
        }
    )

    summary = analyze_speaker_turns(df)

    assert summary["total_speakers"] == 2
    assert summary["total_turns"] == 3
    assert len(summary["speakers"]) == 2


def test_analyze_code_frequency_returns_top_codes() -> None:
    df = pd.DataFrame(
        {
            "performance_event": ["ritual", "ritual", "rehearsal", "lesson"],
            "utterance": ["a", "b", "c", "d"],
        }
    )

    summary = analyze_code_frequency(df, code_column="performance_event")

    assert summary["analyzed_column"] == "performance_event"
    assert "ritual" in summary["codes"]
    assert summary["codes"]["ritual"] == 2
    assert summary["codes"]["rehearsal"] == 1


def test_validate_transcript_data_detects_common_issues() -> None:
    df = pd.DataFrame(
        {
            "speaker_id": ["speaker-1", "", "speaker-3"],
            "start_time_sec": [0.0, -3.0, 8.0],
            "end_time_sec": [5.0, 2.0, 7.5],
        }
    )

    report = validate_transcript_data(df)

    assert report["is_valid"] is False
    assert report["issue_count"] >= 3
    assert "missing_speaker" in report["summary"]


def test_autofix_transcript_data_repairs_order_and_missing_speaker() -> None:
    df = pd.DataFrame(
        {
            "speaker_id": ["", "speaker-2"],
            "start_time_sec": [4.0, 3.0],
            "end_time_sec": [3.0, 3.0],
        }
    )

    fixed = autofix_transcript_data(df)

    assert all(fixed["speaker_id"].astype(str).str.len() > 0)
    assert (fixed["end_time_sec"] > fixed["start_time_sec"]).all()
    assert fixed["start_time_sec"].is_monotonic_increasing
