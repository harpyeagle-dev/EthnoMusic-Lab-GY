# Ethnomusic Curriculum Migration Toolkit

This toolkit helps you move source data (for example, exports from digitalheritagegy.com) into a structured Ethnomusic Lab curriculum, then generate localized curriculum packs.

## Why this approach

The source site currently presents a CAPTCHA/anti-bot wall, so automated crawling is not reliable from this environment. This workflow uses **exported data files** (CSV/JSON) as input.

## What this generates

- A normalized dataset: `data/processed/curriculum.normalized.json`
- One markdown lesson file per module in `data/processed/lessons/`
- Optional per-community variants in `data/processed/curriculum.by_community.json`
- Optional per-community lesson files in `data/processed/lessons_by_community/`

## Quick Start

1. Put your export file in `data/raw/` as CSV or JSON.
2. (Optional) Adjust mappings in `config/field_map.json`.
3. (Optional) Adjust localization profiles in `config/locale_profiles.json`.
4. Run:

```bash
python3 src/migrate.py \
  --input data/raw/export.csv \
  --output data/processed \
  --locale guyana_coastal
```

To generate one tailored version per target community:

```bash
python3 src/migrate.py \
  --input data/raw/export.csv \
  --output data/processed \
  --locale guyana_coastal \
  --split-by-community
```

## Input format

The script accepts flexible columns/keys and maps them to canonical fields using `config/field_map.json`.

Canonical target fields:

- `title`
- `tradition`
- `community`
- `region`
- `instruments` (list)
- `rhythms` (list)
- `learning_objectives` (list)
- `activities` (list)
- `assessment`
- `language`
- `source_url`

## Localization model

A locale profile can set:

- Preferred language label
- Context statement for the curriculum
- Target communities for delivery alignment
- Suggested regional examples
- Term replacements

This keeps your curriculum culturally specific without rewriting all source content manually.

Current Guyana profiles are pre-configured for these communities:

- Kabakaburi
- Kamarang/Warawatta
- Waramaong
- Santa Rosa

## Example JSON input

```json
[
  {
    "title": "Call-and-response drumming",
    "tradition": "Afro-Guyanese drumming",
    "community": "Georgetown youth ensemble",
    "instruments": ["djembe", "kettle drum"],
    "learning_objectives": ["Keep a 4-beat pulse", "Lead a call-and-response pattern"],
    "activities": ["Warm-up pulse cycles", "Group call-and-response exercise"],
    "assessment": "Learners maintain tempo and accurate responses for 2 minutes"
  }
]
```

## Notes

- Keep raw exports unchanged in `data/raw/` for auditability.
- Re-run the tool whenever mappings or locale rules change.
- If you need LMS output (Moodle/Canvas), extend the markdown renderer in `src/migrate.py`.
