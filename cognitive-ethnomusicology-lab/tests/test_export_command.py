from pathlib import Path

import pandas as pd
from click.testing import CliRunner

from cog_ethno_lab.cli import main


def test_export_report_package_command(tmp_path: Path) -> None:
    (tmp_path / "data/processed").mkdir(parents=True, exist_ok=True)
    (tmp_path / "data/raw").mkdir(parents=True, exist_ok=True)

    pd.DataFrame({"file_name": ["a.wav"], "tempo_bpm": [100]}).to_csv(tmp_path / "data/processed/features.csv", index=False)
    pd.DataFrame({"recording_id": ["rec-0001"], "file_name": ["a.wav"]}).to_csv(
        tmp_path / "data/raw/recording_index.csv", index=False
    )

    runner = CliRunner()
    result = runner.invoke(
        main,
        [
            "export-report-package",
            "--root",
            str(tmp_path),
            "--output-dir",
            "exports",
            "--title",
            "Lab Export",
            "--creator",
            "DHGY",
            "--rights",
            "Educational Use",
        ],
    )

    assert result.exit_code == 0
    assert "zip_archive" in result.output
    assert "omeka_manifest" in result.output
