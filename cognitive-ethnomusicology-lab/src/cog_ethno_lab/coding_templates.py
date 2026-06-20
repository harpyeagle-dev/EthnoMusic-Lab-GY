from __future__ import annotations

from pathlib import Path

import pandas as pd


def create_interview_coding_templates(output_dir: str | Path) -> dict[str, str]:
    """Create standard interview coding templates for qualitative analysis."""
    root = Path(output_dir)
    root.mkdir(parents=True, exist_ok=True)

    codebook_path = root / "interview_codebook_template.csv"
    coding_sheet_path = root / "interview_coding_sheet_template.csv"
    memo_path = root / "analytic_memo_template.csv"

    codebook_df = pd.DataFrame(
        [
            {
                "code_id": "C001",
                "code_name": "entrainment",
                "domain": "cognitive",
                "definition": "Evidence of synchronization with rhythm or other participants",
                "inclusion_criteria": "Mentions of moving, clapping, timing together",
                "exclusion_criteria": "General statements with no timing or coordination cue",
                "example_quote": "When the drum starts everyone steps together",
            }
        ]
    )

    coding_sheet_df = pd.DataFrame(
        [
            {
                "interview_id": "INT-001",
                "segment_id": "INT-001-seg-001",
                "timestamp_start_sec": 0.0,
                "timestamp_end_sec": 20.0,
                "speaker_id": "participant-1",
                "excerpt": "",
                "primary_code": "",
                "secondary_code": "",
                "coder_id": "",
                "confidence": 3,
                "notes": "",
            }
        ]
    )

    memo_df = pd.DataFrame(
        [
            {
                "memo_id": "M001",
                "interview_id": "INT-001",
                "theme": "collective memory",
                "observation": "",
                "interpretation": "",
                "next_action": "",
            }
        ]
    )

    codebook_df.to_csv(codebook_path, index=False)
    coding_sheet_df.to_csv(coding_sheet_path, index=False)
    memo_df.to_csv(memo_path, index=False)

    return {
        "codebook": str(codebook_path),
        "coding_sheet": str(coding_sheet_path),
        "analytic_memo": str(memo_path),
    }
