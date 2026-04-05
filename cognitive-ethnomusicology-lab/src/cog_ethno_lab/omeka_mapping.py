from __future__ import annotations

import json
from pathlib import Path

import pandas as pd


def _latest_export_folder(root: Path, output_dir: str | Path = "exports") -> Path:
    exports_root = root / output_dir
    if not exports_root.exists():
        raise ValueError(f"Exports directory does not exist: {exports_root}")

    candidates = [path for path in exports_root.glob("lab_report_*") if path.is_dir()]
    if not candidates:
        raise ValueError(f"No export folders found under {exports_root}")

    return max(candidates, key=lambda path: path.stat().st_mtime)


def _load_field_profile(profile_json: str | Path | None = None) -> dict[str, str]:
    default_profile = {
        "title": "dcterms:title",
        "creator": "dcterms:creator",
        "rights": "dcterms:rights",
        "source": "dcterms:source",
        "description": "dcterms:description",
        "artifact_label": "local:artifact_label",
        "file": "file",
    }
    if not profile_json:
        return default_profile

    profile_path = Path(profile_json)
    if not profile_path.exists():
        raise ValueError(f"Profile JSON does not exist: {profile_path}")

    loaded = json.loads(profile_path.read_text(encoding="utf-8"))
    columns = loaded.get("columns", {})
    if not isinstance(columns, dict):
        raise ValueError("Profile JSON must include an object at key 'columns'")

    profile = default_profile.copy()
    for key, value in columns.items():
        if key in profile and isinstance(value, str) and value.strip():
            profile[key] = value.strip()
    return profile


def generate_omeka_import_csv(
    *,
    root: str | Path = ".",
    export_folder: str | Path | None = None,
    output_csv: str | Path | None = None,
    profile_json: str | Path | None = None,
) -> dict[str, str | int]:
    """Generate a flat CSV table suitable for Omeka item import workflows."""
    base = Path(root)
    selected_export = Path(export_folder) if export_folder else _latest_export_folder(base)
    manifest_path = selected_export / "OMEKA_MANIFEST.json"
    if not manifest_path.exists():
        raise ValueError(f"OMEKA_MANIFEST.json not found in {selected_export}")

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    profile = _load_field_profile(profile_json)
    rows: list[dict[str, str]] = []
    for item in manifest.get("items", []):
        rows.append(
            {
                profile["title"]: f"{manifest.get('dcterms:title', 'Lab Export')} - {item.get('label', '')}",
                profile["creator"]: str(manifest.get("dcterms:creator", "")),
                profile["rights"]: str(manifest.get("dcterms:rights", "")),
                profile["source"]: str(manifest.get("dcterms:source", "")),
                profile["description"]: str(manifest.get("dcterms:description", "")),
                profile["artifact_label"]: str(item.get("label", "")),
                profile["file"]: str((selected_export / item.get("file", "")).resolve()),
            }
        )

    df = pd.DataFrame(rows)
    output_path = Path(output_csv) if output_csv else (selected_export / "OMEKA_IMPORT_ITEMS.csv")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)

    return {
        "export_folder": str(selected_export),
        "manifest": str(manifest_path),
        "output_csv": str(output_path),
        "rows": int(df.shape[0]),
        "profile_json": str(profile_json) if profile_json else "default",
    }