from pathlib import Path

from cog_ethno_lab.coding_templates import create_interview_coding_templates


def test_create_interview_coding_templates_outputs_files(tmp_path: Path) -> None:
    artifacts = create_interview_coding_templates(tmp_path)

    assert Path(artifacts["codebook"]).exists()
    assert Path(artifacts["coding_sheet"]).exists()
    assert Path(artifacts["analytic_memo"]).exists()
