from pathlib import Path
import json

import pandas as pd

from cog_ethno_lab.report_export import export_report_package


def test_export_report_package_creates_zip_and_summary(tmp_path: Path) -> None:
    (tmp_path / "data/processed").mkdir(parents=True, exist_ok=True)
    (tmp_path / "data/raw").mkdir(parents=True, exist_ok=True)
    (tmp_path / "docs").mkdir(parents=True, exist_ok=True)

    pd.DataFrame({"file_name": ["a.wav"], "tempo_bpm": [100]}).to_csv(tmp_path / "data/processed/features.csv", index=False)
    pd.DataFrame({"recording_id": ["rec-0001"], "file_name": ["a.wav"]}).to_csv(
        tmp_path / "data/raw/recording_index.csv", index=False
    )
    (tmp_path / "docs/annotation_schema.yaml").write_text("recording_id: rec-0001\n", encoding="utf-8")

    result = export_report_package(
        root=tmp_path,
        output_dir="exports",
        title="Kabakaburi Session Package",
        creator="Digital Heritage GY",
        rights="Community Permission Required",
        source_url="https://digitalheritagegy.com/s/s/digitalheritage/page/home",
    )

    assert Path(result["export_folder"]).exists()
    assert Path(result["zip_archive"]).exists()
    assert Path(result["summary"]).exists()
    assert Path(result["omeka_manifest"]).exists()
    assert int(result["copied_files"]) >= 3

    manifest = json.loads(Path(result["omeka_manifest"]).read_text(encoding="utf-8"))
    assert manifest["dcterms:title"] == "Kabakaburi Session Package"
    assert manifest["dcterms:creator"] == "Digital Heritage GY"
