import argparse
import csv
import json
import re
import urllib.error
import urllib.request
from html import unescape
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_records_from_file(input_path: Path) -> List[Dict[str, Any]]:
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


def load_source_rows(sources_path: Path) -> List[Dict[str, Any]]:
    if sources_path.suffix.lower() == ".json":
        data = load_json(sources_path)
        if isinstance(data, list):
            return [d for d in data if isinstance(d, dict)]
        if isinstance(data, dict) and isinstance(data.get("sources"), list):
            return [d for d in data["sources"] if isinstance(d, dict)]
        raise ValueError("Source manifest JSON must be a list or an object with a 'sources' list.")

    if sources_path.suffix.lower() == ".csv":
        with sources_path.open("r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            return [dict(row) for row in reader]

    raise ValueError(f"Unsupported sources format: {sources_path.suffix}")


def strip_html_tags(value: str) -> str:
    text = re.sub(r"<script[^>]*>.*?</script>", " ", value, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r"<style[^>]*>.*?</style>", " ", text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def extract_tag_content(html: str, tag: str) -> str:
    match = re.search(rf"<{tag}[^>]*>(.*?)</{tag}>", html, flags=re.IGNORECASE | re.DOTALL)
    if not match:
        return ""
    return strip_html_tags(match.group(1))


def extract_html_text_list(html: str, pattern: str) -> List[str]:
    items: List[str] = []
    for match in re.findall(pattern, html, flags=re.IGNORECASE | re.DOTALL):
        text = strip_html_tags(match)
        if text:
            items.append(text)
    return items


def detect_instruments(text: str) -> List[str]:
    instruments_catalog = [
        "drum",
        "drums",
        "shaker",
        "maracas",
        "flute",
        "guitar",
        "rattle",
        "bell",
        "voice",
        "chant",
    ]
    lowered = text.lower()
    found = [item for item in instruments_catalog if item in lowered]
    # Keep distinct values in insertion order.
    distinct: List[str] = []
    for item in found:
        if item not in distinct:
            distinct.append(item)
    return distinct


def detect_rhythms(lines: List[str]) -> List[str]:
    rhythms: List[str] = []
    meter_pattern = re.compile(r"\b[23468]/[48]\b")
    for line in lines:
        for meter in meter_pattern.findall(line):
            if meter not in rhythms:
                rhythms.append(meter)
        lowered = line.lower()
        if "rhythm" in lowered and line not in rhythms:
            rhythms.append(line)
        if "pulse" in lowered and line not in rhythms:
            rhythms.append(line)
    return rhythms[:5]


def select_lines(lines: List[str], keywords: List[str], limit: int) -> List[str]:
    chosen: List[str] = []
    for line in lines:
        lowered = line.lower()
        if any(keyword in lowered for keyword in keywords) and line not in chosen:
            chosen.append(line)
        if len(chosen) >= limit:
            break
    return chosen


def sentence_case(value: str) -> str:
    value = value.strip()
    if not value:
        return value
    return value[0].upper() + value[1:]


def infer_action_phrase(text: str, prefix: str) -> str:
    cleaned = text.strip().rstrip(".")
    if not cleaned:
        return cleaned
    lowered = cleaned.lower()
    verbs = (
        "analyze",
        "explore",
        "study",
        "document",
        "identify",
        "listen",
        "observe",
        "perform",
        "practice",
        "review",
        "reflect",
        "compare",
        "create",
        "connect",
    )
    if lowered.startswith(verbs):
        return sentence_case(cleaned)
    return f"{prefix} {lowered}"


def fetch_html(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
            )
        },
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        body = response.read()
    return body.decode("utf-8", errors="replace")


def load_html_for_source(source: Dict[str, Any]) -> Tuple[Optional[str], Optional[str]]:
    local_html_path = str(source.get("local_html_path", "")).strip()
    if local_html_path:
        local_path = Path(local_html_path)
        if local_path.exists() and local_path.is_file():
            return local_path.read_text(encoding="utf-8", errors="replace"), None
        return None, f"local_html_path not found: {local_html_path}"

    source_url = str(source.get("url", "")).strip()
    if not source_url:
        return None, "Missing both url and local_html_path"

    try:
        return fetch_html(source_url), None
    except urllib.error.HTTPError as exc:
        return None, f"HTTP error {exc.code}"
    except urllib.error.URLError as exc:
        return None, f"URL error: {exc.reason}"
    except Exception as exc:  # pragma: no cover - defensive catch for network edge cases.
        return None, f"Unexpected error: {exc}"


def build_record_from_html(source: Dict[str, Any], html: str) -> Dict[str, Any]:
    page_title = extract_tag_content(html, "title")
    meta_description_match = re.search(
        r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']',
        html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    meta_description = strip_html_tags(meta_description_match.group(1)) if meta_description_match else ""
    headings = extract_html_text_list(html, r"<h[1-3][^>]*>(.*?)</h[1-3]>")
    list_items = extract_html_text_list(html, r"<li[^>]*>(.*?)</li>")
    paragraphs = extract_html_text_list(html, r"<p[^>]*>(.*?)</p>")
    combined_lines = list_items + paragraphs

    objective_keywords = ["learn", "understand", "identify", "analyze", "perform", "practice"]
    activity_keywords = ["activity", "exercise", "workshop", "dance", "song", "drum", "listen"]

    learning_objectives = select_lines(combined_lines, objective_keywords, limit=4)
    activities = select_lines(combined_lines, activity_keywords, limit=5)

    if not learning_objectives:
        learning_objectives = [
            "Identify key musical traits documented in this community source",
            "Connect musical practice to local cultural context",
        ]
    learning_objectives = [infer_action_phrase(item, "Document") for item in learning_objectives[:4]]
    if not activities:
        activities = [
            "Close reading of community source materials",
            "Group rhythm and listening reflection activity",
        ]
    activities = [infer_action_phrase(item, "Explore") for item in activities[:5]]

    primary_heading = headings[0] if headings else page_title
    community = str(source.get("community", "")).strip()
    title = str(source.get("title", "")).strip() or primary_heading or f"{community} Ethnomusic Module"
    if meta_description and not source.get("title"):
        # Keep the page title as the module title, but let the meta description
        # inform downstream objective language through the extracted lines.
        combined_lines = [meta_description] + combined_lines

    all_text = " ".join(combined_lines)
    instruments = detect_instruments(all_text)
    rhythms = detect_rhythms(combined_lines)

    return {
        "title": title,
        "tradition": str(source.get("tradition", "")).strip(),
        "community": community,
        "region": str(source.get("region", "")).strip(),
        "instruments": instruments,
        "rhythms": rhythms,
        "learning_objectives": learning_objectives,
        "activities": activities,
        "assessment": (
            "Learners synthesize source evidence into a culturally grounded performance or analysis task."
        ),
        "language": str(source.get("language", "")).strip(),
        "source_url": str(source.get("url", "")).strip(),
    }


def build_fallback_record(source: Dict[str, Any], reason: str) -> Dict[str, Any]:
    community = str(source.get("community", "")).strip() or "Community"
    title = str(source.get("title", "")).strip() or f"{community} Ethnomusic Module"
    return {
        "title": title,
        "tradition": str(source.get("tradition", "")).strip(),
        "community": community,
        "region": str(source.get("region", "")).strip(),
        "instruments": [],
        "rhythms": [],
        "learning_objectives": ["Document and validate source content for this community module"],
        "activities": ["Manual source review and metadata capture"],
        "assessment": f"Pending source ingestion: {reason}",
        "language": str(source.get("language", "")).strip(),
        "source_url": str(source.get("url", "")).strip(),
    }


def load_records_from_sources(sources_path: Path) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    source_rows = load_source_rows(sources_path)
    records: List[Dict[str, Any]] = []
    report: List[Dict[str, Any]] = []

    for source in source_rows:
        html, error = load_html_for_source(source)
        if html is not None:
            record = build_record_from_html(source, html)
            status = "success"
            message = ""
        else:
            record = build_fallback_record(source, error or "Unknown ingestion error")
            status = "fallback"
            message = error or "Unknown ingestion error"

        records.append(record)
        report.append(
            {
                "community": str(source.get("community", "")).strip(),
                "url": str(source.get("url", "")).strip(),
                "status": status,
                "message": message,
            }
        )

    return records, report


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


def build_curriculum_sequence(split_modules: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    community_order = ["Kabakaburi", "Kamarang/Warawatta", "Waramaong", "Santa Rosa"]
    sequence: List[Dict[str, Any]] = []

    for position, community in enumerate(community_order, start=1):
        community_modules = [module for module in split_modules if module.get("community") == community]
        sequence.append(
            {
                "stage": position,
                "community": community,
                "modules": [
                    {
                        "title": module.get("title", ""),
                        "source_url": module.get("source_url", ""),
                        "tradition": module.get("tradition", ""),
                        "learning_objectives": module.get("learning_objectives", []),
                        "activities": module.get("activities", []),
                    }
                    for module in community_modules
                ],
            }
        )

    return sequence


def build_four_unit_plan(split_modules: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    unit_order = [
        ("Kabakaburi", "https://digitalheritagegy.com/s/s/kabakaburi/page/home"),
        ("Kamarang/Warawatta", "https://digitalheritagegy.com/s/s/kamarang/page/home"),
        ("Waramaong", "https://digitalheritagegy.com/s/s/waramadong/page/home"),
        ("Santa Rosa", "https://digitalheritagegy.com/s/s/santa-rosa/page/welcome"),
    ]
    plan: List[Dict[str, Any]] = []

    for position, (community, source_url) in enumerate(unit_order, start=1):
        primary_module = next(
            (
                module
                for module in split_modules
                if module.get("community") == community and module.get("source_url") == source_url
            ),
            None,
        )
        if primary_module is None:
            continue

        plan.append(
            {
                "unit": position,
                "community": community,
                "title": primary_module.get("title", ""),
                "source_url": primary_module.get("source_url", ""),
                "tradition": primary_module.get("tradition", ""),
                "focus": primary_module.get("learning_objectives", [])[:2],
                "activities": primary_module.get("activities", [])[:3],
                "supporting_modules": [
                    module.get("title", "")
                    for module in split_modules
                    if module.get("community") == community and module is not primary_module
                ],
            }
        )

    return plan


def render_four_unit_plan_markdown(plan: List[Dict[str, Any]]) -> str:
    lines: List[str] = []
    lines.append("# Ethnomusic Lab GY Four-Unit Curriculum Plan")
    lines.append("")
    lines.append("This version compresses the migrated community content into one dedicated unit per community stage.")
    lines.append("")

    for unit in plan:
        lines.append(f"## Unit {unit['unit']}: {unit['community']}")
        lines.append(f"**Primary module:** {unit['title']}")
        if unit.get("tradition"):
            lines.append(f"- Tradition: {unit['tradition']}")
        if unit.get("focus"):
            lines.append("- Focus:")
            for item in unit["focus"]:
                lines.append(f"  - {item}")
        if unit.get("activities"):
            lines.append("- Core activities:")
            for item in unit["activities"]:
                lines.append(f"  - {item}")
        if unit.get("supporting_modules"):
            lines.append("- Supporting modules:")
            for item in unit["supporting_modules"]:
                lines.append(f"  - {item}")
        if unit.get("source_url"):
            lines.append(f"- Source: {unit['source_url']}")
        lines.append("")

    return "\n".join(lines).strip() + "\n"


def render_curriculum_sequence_markdown(sequence: List[Dict[str, Any]]) -> str:
    lines: List[str] = []
    lines.append("# Ethnomusic Lab GY Curriculum Sequence")
    lines.append("")
    lines.append("This sequence orders the four community strands into a progression for teaching and facilitation.")
    lines.append("")

    for stage in sequence:
        lines.append(f"## Stage {stage['stage']}: {stage['community']}")
        lines.append("")
        for module in stage.get("modules", []):
            lines.append(f"### {module['title']}")
            if module.get("tradition"):
                lines.append(f"- Tradition: {module['tradition']}")
            if module.get("learning_objectives"):
                lines.append("- Key learning objectives:")
                for objective in module["learning_objectives"][:3]:
                    lines.append(f"  - {objective}")
            if module.get("activities"):
                lines.append("- Core activities:")
                for activity in module["activities"][:3]:
                    lines.append(f"  - {activity}")
            if module.get("source_url"):
                lines.append(f"- Source: {module['source_url']}")
            lines.append("")

    return "\n".join(lines).strip() + "\n"


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
    parser.add_argument("--input", help="Path to input CSV/JSON file")
    parser.add_argument(
        "--sources",
        help="Path to source manifest (CSV/JSON) of community websites with url or local_html_path",
    )
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

    if not args.input and not args.sources:
        raise ValueError("Provide at least one of --input or --sources")

    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    field_map = load_json(Path(args.field_map))
    locale_profiles = load_json(Path(args.locale_profiles))
    if args.locale not in locale_profiles:
        available = ", ".join(sorted(locale_profiles.keys()))
        raise ValueError(f"Unknown locale '{args.locale}'. Available: {available}")

    locale = locale_profiles[args.locale]
    raw_records: List[Dict[str, Any]] = []
    source_report: List[Dict[str, Any]] = []

    if args.input:
        raw_records.extend(load_records_from_file(Path(args.input)))

    if args.sources:
        source_records, source_report = load_records_from_sources(Path(args.sources))
        raw_records.extend(source_records)

    if not raw_records:
        raise ValueError("No records loaded from input sources")

    normalized = [normalize_record(record, field_map) for record in raw_records]
    localized = [localize_record(record, locale) for record in normalized]

    normalized_path = output_dir / "curriculum.normalized.json"
    with normalized_path.open("w", encoding="utf-8") as f:
        json.dump(localized, f, ensure_ascii=False, indent=2)

    if source_report:
        source_report_path = output_dir / "source_ingestion_report.json"
        with source_report_path.open("w", encoding="utf-8") as f:
            json.dump(source_report, f, ensure_ascii=False, indent=2)

    lessons_dir = output_dir / "lessons"
    lessons_dir.mkdir(parents=True, exist_ok=True)

    for index, module in enumerate(localized, start=1):
        filename = f"{index:03d}-{slugify(module['title'])}.md"
        (lessons_dir / filename).write_text(render_markdown(module), encoding="utf-8")

    per_community_count = 0
    curriculum_sequence: List[Dict[str, Any]] = []
    four_unit_plan: List[Dict[str, Any]] = []
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

        curriculum_sequence = build_curriculum_sequence(split_modules)
        sequence_json_path = output_dir / "curriculum.sequence.json"
        with sequence_json_path.open("w", encoding="utf-8") as f:
            json.dump(curriculum_sequence, f, ensure_ascii=False, indent=2)

        sequence_md_path = output_dir / "curriculum.sequence.md"
        sequence_md_path.write_text(render_curriculum_sequence_markdown(curriculum_sequence), encoding="utf-8")

        four_unit_plan = build_four_unit_plan(split_modules)
        four_unit_json_path = output_dir / "curriculum.four_unit_plan.json"
        with four_unit_json_path.open("w", encoding="utf-8") as f:
            json.dump(four_unit_plan, f, ensure_ascii=False, indent=2)

        four_unit_md_path = output_dir / "curriculum.four_unit_plan.md"
        four_unit_md_path.write_text(render_four_unit_plan_markdown(four_unit_plan), encoding="utf-8")

    print(f"Imported records: {len(raw_records)}")
    print(f"Localized modules written to: {normalized_path}")
    print(f"Lesson markdown files written to: {lessons_dir}")
    if source_report:
        print(f"Source ingestion report written to: {output_dir / 'source_ingestion_report.json'}")
    if args.split_by_community:
        print(f"Per-community module variants written: {per_community_count}")
        print(f"Per-community JSON written to: {output_dir / 'curriculum.by_community.json'}")
        print(f"Per-community lessons written to: {output_dir / 'lessons_by_community'}")
        print(f"Curriculum sequence JSON written to: {output_dir / 'curriculum.sequence.json'}")
        print(f"Curriculum sequence markdown written to: {output_dir / 'curriculum.sequence.md'}")
        print(f"Four-unit plan JSON written to: {output_dir / 'curriculum.four_unit_plan.json'}")
        print(f"Four-unit plan markdown written to: {output_dir / 'curriculum.four_unit_plan.md'}")


if __name__ == "__main__":
    main()
