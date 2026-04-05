from __future__ import annotations

from pathlib import Path

import yaml


def default_schema() -> dict:
    """Return a baseline ethnographic annotation schema."""
    return {
        "recording_id": "",
        "community": "",
        "location": "",
        "event_context": "",
        "participants": [
            {
                "name": "",
                "role": "performer|audience|facilitator",
                "age_group": "",
                "gender_identity": "",
            }
        ],
        "musical_dimensions": {
            "meter": "",
            "tempo_feel": "",
            "instrumentation": [],
            "vocal_style": "",
        },
        "cognitive_markers": {
            "entrainment_notes": "",
            "memory_cues": "",
            "attention_events": "",
            "emotion_regulation": "",
        },
        "ethics": {
            "consent_recorded": False,
            "sharing_restrictions": "",
            "anonymization_notes": "",
        },
    }


def write_schema(output_path: str | Path) -> Path:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        yaml.safe_dump(default_schema(), f, sort_keys=False)
    return path
