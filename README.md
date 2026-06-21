# EthnoMusic Lab GY

## Decoding the Baboon Dance: A Curriculum in Digital Humanities and Computational Ethnomusicology

**Author:** Rohan Sagar  
**Date:** June 15, 2025

## Overview

This EthnoMusic Lab GY curriculum explores the intersection of ethnomusicology, digital humanities, and computational analysis through the lens of the Baboon Dance—a traditional cultural practice from Guyana. Students will learn to combine cultural understanding with cutting-edge computational tools to analyze, preserve, and reimagine Indigenous musical traditions.

## Curriculum Goals

- Develop critical understanding of ethnomusicology and Indigenous music traditions
- Learn computational methods for sound analysis and pattern recognition
- Apply machine learning techniques to cultural heritage preservation
- Create digital exhibits and presentations that honor cultural authenticity
- Foster interdisciplinary thinking across humanities, technology, and arts

## Target Audience

- **Grade Level:** Upper Secondary (Forms 4–6) / Year 1 Undergraduate
- **Prerequisites:** Basic music appreciation, introductory computer skills
- **Duration:** Full semester (14-16 weeks)

## Module Structure

### [Module 1: Foundations of Ethnomusicology and the Baboon Dance](modules/module-01/README.md)
Introduction to ethnomusicology, cultural context of the Baboon Dance, and ethical considerations in studying Indigenous music.

### [Module 2: Computational Sound Analysis](modules/module-02/README.md)
Learn audio signal processing, spectral analysis, and digital tools for sound visualization.

### [Module 3: Machine Learning for Audio](modules/module-03/README.md)
Explore embeddings, feature extraction, and pattern recognition in musical data.

### [Module 4: Comparative Ethnomusicology](modules/module-04/README.md)
Compare the Baboon Dance with other Indigenous traditions using computational methods.

### [Module 5: Data Visualization and Interpretation](modules/module-05/README.md)
Create meaningful visualizations that respect cultural context while revealing musical patterns.

### [Module 6: Digital Archiving and Preservation](modules/module-06/README.md)
Learn best practices for digitizing, cataloging, and preserving cultural heritage.

### [Module 7: Remix, Reflection, and Exhibition](modules/module-07/README.md)
Design and present a final digital exhibition combining analysis, creativity, and cultural sensitivity.

## Resources

- **[Worksheets](worksheets/)** - Student activity sheets for each module
- **[Lesson Plans](lesson-plans/)** - Detailed teaching guides with timing and activities
- **[Technical Setup](setup/)** - Software installation and configuration guides
- **[Audio Samples](resources/audio/)** - Curated sound files for analysis
- **[Visual Materials](resources/images/)** - Graphs, diagrams, and cultural documentation

## Learning Outcomes

By the end of this curriculum, students will be able to:

1. Explain the cultural significance and historical context of the Baboon Dance
2. Use Python and audio libraries to analyze sound files
3. Apply machine learning models (OpenL3, PCA) to musical data
4. Interpret computational visualizations in cultural context
5. Create ethical, culturally-informed digital exhibits
6. Engage critically with technology's role in cultural preservation

## Assessment Approaches

- Reflective journals and discussion participation
- Technical reports with code and visualizations
- Comparative analysis presentations
- Collaborative research projects
- Final digital exhibition/portfolio

## Technology Requirements

- **Software:** Python 3.8+, Jupyter Notebooks, Librosa, OpenL3, scikit-learn
- **Hardware:** Computer with audio playback, headphones recommended
- **Optional:** Projector, audio interface for higher-quality playback

## Getting Started

1. Review the [Technical Setup Guide](setup/INSTALLATION.md)
2. Read the [Cultural Context Document](resources/cultural-context.md)
3. Start with [Module 1](modules/module-01/README.md)
4. Access [Worksheet #1](worksheets/worksheet-01.md) for your first activity

## Acknowledgments

This curriculum honors the Indigenous communities whose musical traditions inspire this work. We acknowledge the need for respectful, collaborative approaches to cultural heritage study and commit to ethical practices in digital humanities research.

## License and Usage

This curriculum is designed for educational purposes. When using or adapting materials, please:
- Credit original sources and communities
- Obtain appropriate permissions for cultural materials
- Maintain ethical standards in digital humanities work
- Share improvements with the broader educational community

---

**Contact:** For questions or feedback about this curriculum, please refer to the original documentation or reach out through appropriate academic channels.

## Ethnomusic Curriculum Migration Toolkit

This toolkit helps move source data (for example, exports from digitalheritagegy.com) into structured EthnoMusic Lab curriculum modules and generate localized outputs.

### Migration Outputs

- A normalized dataset: `data/processed/curriculum.normalized.json`
- One markdown lesson file per module in `data/processed/lessons/`
- Optional per-community variants in `data/processed/curriculum.by_community.json`
- Optional per-community lesson files in `data/processed/lessons_by_community/`
- Optional curriculum sequence files in `data/processed/curriculum.sequence.json` and `data/processed/curriculum.sequence.md`
- Optional four-unit plan files in `data/processed/curriculum.four_unit_plan.json` and `data/processed/curriculum.four_unit_plan.md`

### Main Output Links

- [Four-unit curriculum plan](data/processed/curriculum.four_unit_plan.md)
- [Curriculum sequence](data/processed/curriculum.sequence.md)
- [Normalized curriculum JSON](data/processed/curriculum.normalized.json)
- [Source ingestion report](data/processed/source_ingestion_report.json)

### Quick Start

```bash
python3 src/migrate.py \
  --input data/raw/export.csv \
  --output data/processed \
  --locale guyana_coastal
```

Per-community split output:

```bash
python3 src/migrate.py \
  --input data/raw/export.csv \
  --output data/processed \
  --locale guyana_coastal \
  --split-by-community
```

### Config Files

- `config/field_map.json` for source-to-target field mapping
- `config/locale_profiles.json` for localization rules

Current Guyana community set:

- Kabakaburi
- Kamarang/Warawatta
- Waramaong
- Santa Rosa

### Website Migration For Four Communities

Use a source manifest to ingest directly from community website pages.

Example manifest: `config/community_sources.example.json`

Run website migration:

```bash
python3 src/migrate.py \
  --sources config/community_sources.example.json \
  --output data/processed \
  --locale guyana_hinterland \
  --split-by-community
```

You can also combine exported data with website ingestion in one run:

```bash
python3 src/migrate.py \
  --input data/raw/export.csv \
  --sources config/community_sources.example.json \
  --output data/processed \
  --locale guyana_hinterland \
  --split-by-community
```

If a website blocks bot traffic, use `local_html_path` in the source manifest to point to a saved HTML file for that community page.
