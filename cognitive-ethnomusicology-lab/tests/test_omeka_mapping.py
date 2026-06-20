from pathlib import Path
import json

from cog_ethno_lab.omeka_mapping import generate_omeka_import_csv


def test_generate_omeka_import_csv_from_explicit_folder(tmp_path: Path) -> None:
    export_dir = tmp_path / "exports" / "lab_report_20260405_000001"
    export_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "dcterms:title": "Kabakaburi Lab Export",
        "dcterms:creator": "Digital Heritage GY",
        "dcterms:rights": "Community Permission Required",
        "dcterms:source": "https://digitalheritagegy.com/s/s/digitalheritage/page/home",
        "dcterms:description": "Export package generated from pipeline.",
        "items": [
            {"label": "features_csv", "file": "features.csv"},
            {"label": "rhythm_summary_json", "file": "rhythm_summary.json"},
        ],
    }
    (export_dir / "OMEKA_MANIFEST.json").write_text(json.dumps(manifest), encoding="utf-8")
    (export_dir / "features.csv").write_text("x\n1\n", encoding="utf-8")
    (export_dir / "rhythm_summary.json").write_text("[]\n", encoding="utf-8")

    result = generate_omeka_import_csv(root=tmp_path, export_folder=export_dir)

    output_csv = Path(result["output_csv"])
    assert output_csv.exists()
    assert int(result["rows"]) == 2


def test_generate_omeka_import_csv_uses_latest_export(tmp_path: Path) -> None:
    older = tmp_path / "exports" / "lab_report_20260405_000001"
    newer = tmp_path / "exports" / "lab_report_20260405_000002"
    older.mkdir(parents=True, exist_ok=True)
    newer.mkdir(parents=True, exist_ok=True)

    manifest = {
        "dcterms:title": "Latest Export",
        "dcterms:creator": "Lab",
        "dcterms:rights": "Research Use",
        "dcterms:source": "https://example.org",
        "dcterms:description": "desc",
        "items": [{"label": "features_csv", "file": "features.csv"}],
    }
    (newer / "OMEKA_MANIFEST.json").write_text(json.dumps(manifest), encoding="utf-8")
    (newer / "features.csv").write_text("x\n1\n", encoding="utf-8")

    result = generate_omeka_import_csv(root=tmp_path)
    assert Path(result["output_csv"]).exists()
    assert "lab_report_20260405_000002" in str(result["export_folder"])


def test_generate_omeka_import_csv_with_profile(tmp_path: Path) -> None:
    export_dir = tmp_path / "exports" / "lab_report_20260405_000010"
    export_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "dcterms:title": "Profile Export",
        "dcterms:creator": "Lab",
        "dcterms:rights": "Use",
        "dcterms:source": "https://example.org",
        "dcterms:description": "desc",
        "items": [{"label": "features_csv", "file": "features.csv"}],
    }
    (export_dir / "OMEKA_MANIFEST.json").write_text(json.dumps(manifest), encoding="utf-8")
    (export_dir / "features.csv").write_text("x\n1\n", encoding="utf-8")

    profile_path = tmp_path / "profile.json"
    profile_path.write_text(
        json.dumps(
            {
                "columns": {
                    "title": "my:title",
                    "creator": "my:creator",
                    "file": "my:file",
                }
            }
        ),
        encoding="utf-8",
    )

    result = generate_omeka_import_csv(root=tmp_path, export_folder=export_dir, profile_json=profile_path)

    output_csv = Path(result["output_csv"])
    content = output_csv.read_text(encoding="utf-8")
    assert "my:title" in content
    assert "my:creator" in content
    assert "my:file" in content
