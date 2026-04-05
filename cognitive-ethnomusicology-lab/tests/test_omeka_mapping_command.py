from pathlib import Path
import json

from click.testing import CliRunner

from cog_ethno_lab.cli import main


def test_generate_omeka_import_csv_command(tmp_path: Path) -> None:
    export_dir = tmp_path / "exports" / "lab_report_20260405_000003"
    export_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "dcterms:title": "Command Export",
        "dcterms:creator": "Lab",
        "dcterms:rights": "Use",
        "dcterms:source": "https://example.org",
        "dcterms:description": "desc",
        "items": [{"label": "features_csv", "file": "features.csv"}],
    }
    (export_dir / "OMEKA_MANIFEST.json").write_text(json.dumps(manifest), encoding="utf-8")
    (export_dir / "features.csv").write_text("x\n1\n", encoding="utf-8")

    profile = tmp_path / "profile.json"
    profile.write_text(json.dumps({"columns": {"title": "dcterms:title", "file": "file"}}), encoding="utf-8")

    runner = CliRunner()
    result = runner.invoke(
        main,
        [
            "generate-omeka-import-csv",
            "--root",
            str(tmp_path),
            "--profile-json",
            str(profile),
        ],
    )

    assert result.exit_code == 0
    assert "output_csv" in result.output
