from __future__ import annotations

from pathlib import Path
from typing import Any

import pandas as pd


def transcript_template_dataframe(recording_id: str) -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "recording_id": recording_id,
                "segment_id": f"{recording_id}-seg-001",
                "start_time_sec": 0.0,
                "end_time_sec": 15.0,
                "speaker_id": "speaker-1",
                "language": "",
                "utterance": "",
                "translation": "",
                "performance_event": "",
                "rhythmic_cue": "",
                "gesture_note": "",
                "analytic_memo": "",
            }
        ]
    )


def write_transcript_template(recording_id: str, output_dir: str | Path) -> Path:
    output_path = Path(output_dir) / f"{recording_id}_transcript.csv"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    transcript_template_dataframe(recording_id).to_csv(output_path, index=False)
    return output_path


def analyze_speaker_turns(transcript_df: pd.DataFrame) -> dict[str, Any]:
    """Summarize speaker turn frequencies, duration of speaking roles."""
    if "speaker_id" not in transcript_df.columns:
        raise ValueError("Transcript must have a 'speaker_id' column")

    speaker_summary = (
        transcript_df.groupby("speaker_id")
        .agg(
            turn_count=("speaker_id", "count"),
            start_time_sec=("start_time_sec", "min"),
            end_time_sec=("end_time_sec", "max"),
        )
        .reset_index()
    )
    speaker_summary["duration_sec"] = speaker_summary["end_time_sec"] - speaker_summary["start_time_sec"]

    return {
        "total_speakers": int(len(speaker_summary)),
        "total_turns": int(transcript_df.shape[0]),
        "speakers": speaker_summary.to_dict(orient="records"),
    }


def analyze_code_frequency(transcript_df: pd.DataFrame, code_column: str = "performance_event") -> dict[str, Any]:
    """Summarize frequency of codes or categories in a transcript column."""
    if code_column not in transcript_df.columns:
        raise ValueError(f"Transcript must have a '{code_column}' column")

    codes = transcript_df[code_column].fillna("").value_counts().head(20)

    return {
        "analyzed_column": code_column,
        "unique_codes": int(codes.shape[0]),
        "codes": {str(code): int(count) for code, count in codes.items() if code},
    }


def analyze_transcript_file(transcript_path: str | Path, code_column: str = "performance_event") -> dict[str, Any]:
    path = Path(transcript_path)
    df = pd.read_csv(path)
    return {
        "transcript": str(path),
        "speaker_summary": analyze_speaker_turns(df),
        "code_summary": analyze_code_frequency(df, code_column=code_column),
    }


def analyze_transcript_directory(
    transcripts_dir: str | Path,
    code_column: str = "performance_event",
) -> dict[str, Any]:
    root = Path(transcripts_dir)
    if not root.exists():
        raise ValueError(f"Transcript directory does not exist: {root}")

    transcript_files = sorted(root.glob("*.csv"))
    analyses: list[dict[str, Any]] = []
    for transcript_path in transcript_files:
        analyses.append(analyze_transcript_file(transcript_path, code_column=code_column))

    total_turns = sum(item["speaker_summary"]["total_turns"] for item in analyses)
    total_speakers = sum(item["speaker_summary"]["total_speakers"] for item in analyses)

    return {
        "transcripts_dir": str(root),
        "transcript_count": len(analyses),
        "total_turns": int(total_turns),
        "total_speakers": int(total_speakers),
        "analyses": analyses,
    }


def validate_transcript_data(transcript_df: pd.DataFrame) -> dict[str, Any]:
    """Validate transcript rows for common annotation integrity issues."""
    issues: list[dict[str, Any]] = []

    required_columns = ["start_time_sec", "end_time_sec", "speaker_id"]
    missing_columns = [col for col in required_columns if col not in transcript_df.columns]
    if missing_columns:
        return {
            "is_valid": False,
            "issue_count": len(missing_columns),
            "issues": [
                {
                    "row": None,
                    "type": "missing_column",
                    "message": f"Missing required column: {col}",
                }
                for col in missing_columns
            ],
            "summary": {"missing_column": len(missing_columns)},
        }

    working = transcript_df.reset_index(drop=True)
    starts = pd.to_numeric(working["start_time_sec"], errors="coerce")
    ends = pd.to_numeric(working["end_time_sec"], errors="coerce")
    speakers = working["speaker_id"].fillna("").astype(str)

    for idx, (start, end, speaker) in enumerate(zip(starts, ends, speakers, strict=True)):
        if pd.isna(start) or pd.isna(end):
            issues.append({"row": int(idx), "type": "invalid_timestamp", "message": "Start or end time is missing/invalid"})
            continue
        if start < 0 or end < 0:
            issues.append({"row": int(idx), "type": "negative_time", "message": "Negative timestamp detected"})
        if end <= start:
            issues.append({"row": int(idx), "type": "non_positive_duration", "message": "End time must be greater than start time"})
        if speaker.strip() == "":
            issues.append({"row": int(idx), "type": "missing_speaker", "message": "Speaker ID is empty"})

    valid_rows = [
        (idx, float(starts[idx]), float(ends[idx]))
        for idx in range(len(working))
        if not pd.isna(starts[idx]) and not pd.isna(ends[idx])
    ]
    sorted_rows = sorted(valid_rows, key=lambda item: item[1])
    for current, nxt in zip(sorted_rows, sorted_rows[1:], strict=False):
        _, _, current_end = current
        next_idx, next_start, _ = nxt
        if next_start < current_end:
            issues.append(
                {
                    "row": int(next_idx),
                    "type": "overlap",
                    "message": "Segment overlaps previous segment",
                }
            )

    summary: dict[str, int] = {}
    for issue in issues:
        summary[issue["type"]] = summary.get(issue["type"], 0) + 1

    return {
        "is_valid": len(issues) == 0,
        "issue_count": len(issues),
        "issues": issues,
        "summary": summary,
    }


def autofix_transcript_data(transcript_df: pd.DataFrame) -> pd.DataFrame:
    """Apply safe automatic fixes for common transcript timing/speaker issues."""
    fixed = transcript_df.copy().reset_index(drop=True)

    if "speaker_id" in fixed.columns:
        fixed["speaker_id"] = fixed["speaker_id"].fillna("").astype(str).replace("", "unknown-speaker")

    if {"start_time_sec", "end_time_sec"}.issubset(fixed.columns):
        fixed["start_time_sec"] = pd.to_numeric(fixed["start_time_sec"], errors="coerce").fillna(0.0)
        fixed["end_time_sec"] = pd.to_numeric(fixed["end_time_sec"], errors="coerce").fillna(fixed["start_time_sec"] + 0.5)

        fixed["start_time_sec"] = fixed["start_time_sec"].clip(lower=0.0)
        fixed["end_time_sec"] = fixed["end_time_sec"].clip(lower=0.0)

        swap_mask = fixed["end_time_sec"] <= fixed["start_time_sec"]
        fixed.loc[swap_mask, "end_time_sec"] = fixed.loc[swap_mask, "start_time_sec"] + 0.5

        fixed = fixed.sort_values("start_time_sec").reset_index(drop=True)
        for idx in range(1, len(fixed)):
            prev_end = float(fixed.loc[idx - 1, "end_time_sec"])
            start = float(fixed.loc[idx, "start_time_sec"])
            end = float(fixed.loc[idx, "end_time_sec"])
            if start < prev_end:
                fixed.loc[idx, "start_time_sec"] = prev_end
                if end <= prev_end:
                    fixed.loc[idx, "end_time_sec"] = prev_end + 0.5

    return fixed