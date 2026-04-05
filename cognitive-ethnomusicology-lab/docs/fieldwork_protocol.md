# Fieldwork Protocol

## Before Recording

- Confirm consent terms, storage restrictions, and any community-specific access rules.
- Assign a `recording_id` before capture.
- Log the planned file name in `data/raw/recording_index.csv`.

## During Recording

- Capture a spoken slate with date, place, event type, and performer permission when appropriate.
- Note audience participation, movement, call-and-response, or visible entrainment cues.
- Mark any interruptions, equipment issues, or sensitive segments requiring restricted handling.

## After Recording

- Copy the file into `data/raw/audio/` without renaming it unpredictably.
- Complete contextual metadata in `data/raw/recording_index.csv`.
- Update `docs/annotation_schema.yaml` with cognitive and social observations.
- Run `cog-ethno-lab run-pipeline` after files and metadata are in place.