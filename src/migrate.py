import argparse
import csv
import json
from pathlib import Path
from typing import Any, Dict, List


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_records(input_path: Path) -> List[Dict[str, Any]]:
    if input_path.suffix.lower() == ".json":
        data = load_json(input_path)
        if isinstance(data, list):
            return [d for d in data if isinstance(d, dict)]
        if isinstance(data, dict):
            if "records" in data and isinstance(data["records"], list):
                return [d for d in data["records"] if isinstance(d, dict)]
            return [data]
        return []

    if input_path.suffix.lower() == ".csv":
        with input_path.open("r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            return [dict(row) for row in reader]

    raise ValueError(f"Unsupported input format: {input_path.suffix}")


def to_list(value: Any) -> List[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    if isinstance(value, str):
        # Accept semicolon or comma separated strings from spreadsheets.
        chunks = value.replace("|", ";").split(";")
        if len(chunks) == 1:
            chunks = value.split(",")
        return [c.strip() for c in chunks if c.strip()]
    return [str(value).strip()]


def first_value(record: Dict[str, Any], aliases: List[str]) -> Any:
    for key in aliases:
        if key in record and record[key] not in (None, ""):
            return record[key]
    return None


def normalize_record(record: Dict[str, Any], field_map: Dict[str, List[str]]) -> Dict[str, Any]:
    normalized: Dict[str, Any] = {}

    normalized["title"] = first_value(record, field_map["title"]) or "Untitled Module"
    normalized["tradition"] = first_value(record, field_map["tradition"]) or ""
    normalized["community"] = first_value(record, field_map["community"]) or ""
    normalized["region"] = first_value(record, field_map["region"]) or ""
    normalized["instruments"] = to_list(first_value(record, field_map["instruments"]))
    normalized["rhythms"] = to_list(first_value(record, field_map["rhythms"]))
    normalized["learning_objectives"] = to_list(first_value(record, field_map["learning_objectives"]))
    normalized["activities"] = to_list(first_value(record, field_map["activities"]))
    normalized["assessment"] = first_value(record, field_map["assessment"]) or ""
    normalized["language"] = first_value(record, field_map["language"]) or ""
    normalized["source_url"] = first_value(record, field_map["source_url"]) or ""

    return normalized


def apply_term_replacements(text: str, replacements: Dict[str, str]) -> str:
    updated = text
    for old, new in replacements.items():
        updated = updated.replace(old, new)
        updated = updated.replace(old.capitalize(), new.capitalize())
    return updated


def localize_record(record: Dict[str, Any], locale: Dict[str, Any]) -> Dict[str, Any]:
    localized = dict(record)

    if not localized.get("language") and locale.get("language"):
        localized["language"] = locale["language"]

    replacements = locale.get("term_replacements", {})
    if replacements:
        for field in ["title", "tradition", "community", "assessment"]:
            localized[field] = apply_term_replacements(str(localized.get(field, "")), replacements)
        localized["learning_objectives"] = [
            apply_term_replacements(item, replacements) for item in localized.get("learning_objectives", [])
        ]
        localized["activities"] = [
            apply_term_replacements(item, replacements) for item in localized.get("activities", [])
        ]

    # Add locale context block for downstream rendering.
    localized["locale_context_statement"] = locale.get("context_statement", "")
    localized["target_communities"] = locale.get("target_communities", [])
    localized["locale_regional_examples"] = locale.get("regional_examples", [])

    return localized


def build_per_community_variants(module: Dict[str, Any]) -> List[Dict[str, Any]]:
    communities = module.get("target_communities", [])
    if not communities:
        return [module]

    variants: List[Dict[str, Any]] = []
    for community in communities:
        variant = dict(module)
        variant["community"] = community
        variant["title"] = f"{module['title']} ({community})"
        variants.append(variant)
    return variants


def slugify(value: str) -> str:
    keep = "abcdefghijklmnopqrstuvwxyz0123456789-"
    slug = value.lower().replace(" ", "-").replace("_", "-")
    slug = "".join(ch for ch in slug if ch in keep)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-") or "module"


def render_markdown(module: Dict[str, Any]) -> str:
    lines: List[str] = []
    lines.append(f"# {module['title']}")
    lines.append("")

    if module.get("locale_context_statement"):
        lines.append(f"> {module['locale_context_statement']}")
        lines.append("")

    meta = [
        ("Tradition", module.get("tradition", "")),
        ("Community", module.get("community", "")),
        ("Region", module.get("region", "")),
        ("Language", module.get("language", "")),
    ]
    for label, value in meta:
        if value:
            lines.append(f"- **{label}:** {value}")
    lines.append("")

    if module.get("instruments"):
        lines.append("## Instruments")
        for item in module["instruments"]:
            lines.append(f"- {item}")
        lines.append("")

    if module.get("target_communities"):
        lines.append("## Target Communities")
        for item in module["target_communities"]:
            lines.append(f"- {item}")
        lines.append("")

    if module.get("rhythms"):
        lines.append("## Rhythms")
        for item in module["rhythms"]:
            lines.append(f"- {item}")
        lines.append("")

    if module.get("learning_objectives"):
        lines.append("## Learning Objectives")
        for item in module["learning_objectives"]:
            lines.append(f"- {item}")
        lines.append("")

    if module.get("activities"):
        lines.append("## Activities")
        for item in module["activities"]:
            lines.append(f"- {item}")
        lines.append("")

    if module.get("locale_regional_examples"):
        lines.append("## Localized Examples")
        for item in module["locale_regional_examples"]:
            lines.append(f"- {item}")
        lines.append("")

    if module.get("assessment"):
        lines.append("## Assessment")
        lines.append(module["assessment"])
        lines.append("")

    if module.get("source_url"):
        lines.append(f"Source: {module['source_url']}")

    return "\n".join(lines).strip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Migrate and localize ethnomusic curriculum data.")
    parser.add_argument("--input", required=True, help="Path to input CSV/JSON file")
    parser.add_argument("--output", required=True, help="Output directory")
    parser.add_argument("--locale", required=True, help="Locale key in config/locale_profiles.json")
    parser.add_argument("--field-map", default="config/field_map.json", help="Path to field map JSON")
    parser.add_argument(
        "--locale-profiles", default="config/locale_profiles.json", help="Path to locale profiles JSON"
    )
    parser.add_argument(
        "--split-by-community",
        action="store_true",
        help="Generate one module variant per target community",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    field_map = load_json(Path(args.field_map))
    locale_profiles = load_json(Path(args.locale_profiles))
    if args.locale not in locale_profiles:
        available = ", ".join(sorted(locale_profiles.keys()))
        raise ValueError(f"Unknown locale '{args.locale}'. Available: {available}")

    locale = locale_profiles[args.locale]
    raw_records = load_records(input_path)

    normalized = [normalize_record(record, field_map) for record in raw_records]
    localized = [localize_record(record, locale) for record in normalized]

    normalized_path = output_dir / "curriculum.normalized.json"
    with normalized_path.open("w", encoding="utf-8") as f:
        json.dump(localized, f, ensure_ascii=False, indent=2)

    lessons_dir = output_dir / "lessons"
    lessons_dir.mkdir(parents=True, exist_ok=True)

    for index, module in enumerate(localized, start=1):
        filename = f"{index:03d}-{slugify(module['title'])}.md"
        (lessons_dir / filename).write_text(render_markdown(module), encoding="utf-8")

    per_community_count = 0
    if args.split_by_community:
        split_modules: List[Dict[str, Any]] = []
        for module in localized:
            split_modules.extend(build_per_community_variants(module))

        split_json_path = output_dir / "curriculum.by_community.json"
        with split_json_path.open("w", encoding="utf-8") as f:
            json.dump(split_modules, f, ensure_ascii=False, indent=2)

        split_lessons_dir = output_dir / "lessons_by_community"
        split_lessons_dir.mkdir(parents=True, exist_ok=True)
        for index, module in enumerate(split_modules, start=1):
            filename = f"{index:03d}-{slugify(module['title'])}.md"
            (split_lessons_dir / filename).write_text(render_markdown(module), encoding="utf-8")
        per_community_count = len(split_modules)

    print(f"Imported records: {len(raw_records)}")
    print(f"Localized modules written to: {normalized_path}")
    print(f"Lesson markdown files written to: {lessons_dir}")
    if args.split_by_community:
        print(f"Per-community module variants written: {per_community_count}")
        print(f"Per-community JSON written to: {output_dir / 'curriculum.by_community.json'}")
        print(f"Per-community lessons written to: {output_dir / 'lessons_by_community'}")


if __name__ == "__main__":
    main()
