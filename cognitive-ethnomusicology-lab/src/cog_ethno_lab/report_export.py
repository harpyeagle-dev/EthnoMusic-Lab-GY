from __future__ import annotations

import json
import shutil
from datetime import datetime, timezone
from pathlib import Path


def _build_omeka_manifest(
    *,
    title: str,
    creator: str,
    rights: str,
    source_url: str,
    created_utc: str,
    artifacts: dict[str, str],
) -> dict[str, object]:
    return {
        "resource_template": "Cognitive Ethnomusicology Package",
        "dcterms:title": title,
        "dcterms:creator": creator,
        "dcterms:rights": rights,
        "dcterms:source": source_url,
        "dcterms:created": created_utc,
        "dcterms:description": "Export package generated from the cognitive ethnomusicology pipeline.",
        "items": [
            {
                "label": key,
                "file": Path(value).name,
            }
            for key, value in artifacts.items()
        ],
    }


def _copy_if_exists(source: Path, destination: Path) -> bool:
    if not source.exists():
        return False
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)
    return True


def export_report_package(
    root: str | Path = ".",
    output_dir: str | Path = "exports",
    *,
    title: str = "Cognitive Ethnomusicology Export",
    creator: str = "Lab Team",
    rights: str = "Research Use",
    source_url: str = "https://digitalheritagegy.com/s/s/digitalheritage/page/home",
) -> dict[str, str | int]:
    """Create a timestamped package of key lab artifacts for sharing/archiving."""
    base = Path(root)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    export_root = base / output_dir / f"lab_report_{timestamp}"
    export_root.mkdir(parents=True, exist_ok=True)

    candidates = {
        "features_csv": base / "data/processed/features.csv",
        "rhythm_summary_json": base / "data/processed/rhythm_summary.json",
        "rhythm_clusters_csv": base / "data/processed/rhythm_clusters.csv",
        "rhythm_cluster_summary_json": base / "data/processed/rhythm_cluster_summary.json",
        "transcript_batch_summary_json": base / "data/processed/transcript_batch_summary.json",
        "recording_index_csv": base / "data/raw/recording_index.csv",
        "annotation_schema_yaml": base / "docs/annotation_schema.yaml",
        "codebook_csv": base / "data/templates/interview_codebook_template.csv",
        "coding_sheet_csv": base / "data/templates/interview_coding_sheet_template.csv",
        "analytic_memo_csv": base / "data/templates/analytic_memo_template.csv",
    }

    copied = 0
    copied_map: dict[str, str] = {}
    for label, source_path in candidates.items():
        target = export_root / source_path.name
        if _copy_if_exists(source_path, target):
            copied += 1
            copied_map[label] = str(target)

    summary_path = export_root / "REPORT_SUMMARY.json"
    with summary_path.open("w", encoding="utf-8") as handle:
        json.dump(
            {
                "created_utc": timestamp,
                "root": str(base),
                "copied_files": copied,
                "artifacts": copied_map,
            },
            handle,
            indent=2,
        )

    manifest = _build_omeka_manifest(
        title=title,
        creator=creator,
        rights=rights,
        source_url=source_url,
        created_utc=timestamp,
        artifacts=copied_map,
    )
    manifest_path = export_root / "OMEKA_MANIFEST.json"
    with manifest_path.open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2)

    archive_base = base / output_dir / f"lab_report_{timestamp}"
    zip_path = shutil.make_archive(str(archive_base), "zip", root_dir=export_root)

    return {
        "export_folder": str(export_root),
        "zip_archive": str(zip_path),
        "copied_files": copied,
        "summary": str(summary_path),
        "omeka_manifest": str(manifest_path),
    }