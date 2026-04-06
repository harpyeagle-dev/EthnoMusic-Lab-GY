# Cognitive Ethnomusicology Lab

A starter research project for integrating music signal analysis with ethnographic annotation workflows.

The project is structured around a minimal field-to-analysis loop: organize recordings, log cultural context, extract timing/timbre descriptors, then compare rhythmic patterns across communities or events.

## Project Structure

- `src/cog_ethno_lab/`: Core Python package
- `data/raw/`: Source recordings and field materials
- `data/processed/`: Derived datasets and features
- `notebooks/`: Exploratory notebooks
- `docs/`: Protocols, methods, and study notes
- `tests/`: Unit tests
- `scripts/`: Pipeline and utility scripts

## Quick Start

1. Create and activate a virtual environment.
2. Install dependencies:

```bash
pip install -e .[dev]
```

3. Run tests:

```bash
pytest
```

4. Try the CLI:

```bash
cog-ethno-lab schema --output docs/annotation_schema.yaml
```

5. Initialize the study workspace:

```bash
cog-ethno-lab init-study
```

6. Run the lab pipeline:

```bash
cog-ethno-lab run-pipeline
```

## Initial Workflow

1. Place recordings in `data/raw/audio/` or generate sample recordings.
2. Register recordings into `data/raw/recording_index.csv`.
3. Generate transcript and coding templates.
4. Annotate social context in `docs/annotation_schema.yaml`.
5. Extract audio features for rhythm and timbre summaries.
6. Run cross-cultural rhythm comparison and clustering over extracted features.
7. Launch the dashboard to browse recordings, transcripts, and results.

## Key Artifacts

- `data/raw/recording_index.csv`: Join table for recordings and communities
- `data/raw/transcripts/`: Timestamped transcript templates and filled transcripts
- `data/templates/`: Interview codebook, coding sheet, and analytic memo templates
- `docs/annotation_schema.yaml`: Baseline ethnographic coding scaffold
- `data/processed/features.csv`: Extracted audio features
- `data/processed/rhythm_summary.json`: Tempo summaries by community or other grouping variable
- `data/processed/rhythm_clusters.csv`: Cluster labels for rhythm-style comparison
- `data/processed/rhythm_cluster_summary.json`: Cluster-level descriptive summaries
- `notebooks/01_tempo_and_entrainment_overview.ipynb`: Starter notebook for exploratory analysis

## Fieldwork Notes

- Use [docs/fieldwork_protocol.md](docs/fieldwork_protocol.md) to standardize collection and consent procedures.
- Use [docs/consent_checklist.md](docs/consent_checklist.md) during participant-facing sessions.
- Use [docs/data_dictionary.md](docs/data_dictionary.md) to keep coding decisions and column meanings consistent.
- Use [docs/user_questionnaire.md](docs/user_questionnaire.md) for participant post-session survey prompts.
- Capture questionnaire outputs in `data/templates/user_questionnaire_responses.csv`.

## Additional Commands

Transcription analysis:
```bash
cog-ethno-lab transcript-template --recording-id sample-001
cog-ethno-lab analyze-speakers --transcript data/raw/transcripts/sample-001_transcript.csv
cog-ethno-lab analyze-codes --transcript data/raw/transcripts/sample-001_transcript.csv --code-column performance_event
cog-ethno-lab analyze-transcript-batch --transcripts-dir data/raw/transcripts
```

Audio and rhythm analysis:
```bash
cog-ethno-lab generate-sample-recordings --output-dir data/raw/audio
cog-ethno-lab ingest-recordings --audio-dir data/raw/audio --community Kabakaburi --location Region2 --event-context Rehearsal
cog-ethno-lab extract-features --audio-dir data/raw/audio
cog-ethno-lab cluster-rhythms --features data/processed/features.csv --clusters 3
cog-ethno-lab compare-rhythm --features data/processed/features.csv
```

Templates and dashboard:
```bash
cog-ethno-lab create-coding-templates --output-dir data/templates
cog-ethno-lab run-pipeline
cog-ethno-lab dashboard --app dashboard_app.py
cog-ethno-lab export-report-package --root . --output-dir exports --title "Kabakaburi Lab Export" --creator "Digital Heritage GY"
cog-ethno-lab generate-omeka-import-csv --root .
cog-ethno-lab generate-omeka-import-csv --root . --profile-json data/templates/omeka_field_profile.example.json
```

Each export package includes:
- `REPORT_SUMMARY.json`
- `OMEKA_MANIFEST.json` (Omeka-ready metadata scaffold)
- Copied CSV/JSON/YAML artifacts
- A `.zip` archive of the package folder

One-command full workflow:
```bash
cog-ethno-lab full-run --root . --generate-samples --community Kabakaburi --location Region2 --event-context Rehearsal
```
