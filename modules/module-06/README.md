# Module 6: Digital Archiving and Preservation

**Duration:** 2 weeks  
**Level:** Intermediate

## Module Overview

This module explores the critical role of digital technologies in preserving cultural heritage, with specific focus on Indigenous musical traditions. Students will learn best practices for digitizing, cataloging, archiving, and providing ethical access to cultural materials, considering both technical and community-centered approaches.

## Learning Objectives

By the end of this module, students will be able to:

- Understand principles of digital preservation and archiving
- Create proper metadata for cultural audio materials
- Navigate ethical issues in digitizing Indigenous heritage
- Use archival standards and formats for long-term preservation
- Design community-centered access and sharing protocols
- Evaluate digital archive projects for cultural appropriateness

## Key Concepts

### Digital Preservation Principles
- **Longevity:** Choosing formats that will remain accessible
- **Integrity:** Maintaining authenticity of original materials
- **Accessibility:** Balancing open access with cultural protocols
- **Sustainability:** Planning for long-term maintenance
- **Redundancy:** Multiple backup strategies

### Archival Standards
- **Metadata:** Dublin Core, MODS, community-specific schemas
- **File Formats:** WAV, FLAC (lossless) vs. MP3 (lossy)
- **Documentation:** Recording provenance, context, permissions
- **Organization:** Taxonomies, controlled vocabularies, tagging
- **Rights Management:** Licenses, permissions, restrictions

### Ethical Considerations
- **Community Control:** Who decides what is shared and how?
- **Informed Consent:** Clear agreements with knowledge holders
- **Traditional Knowledge (TK) Labels:** Identifying cultural protocols
- **Repatriation:** Returning cultural materials to communities
- **Benefit Sharing:** How does the community benefit from digitization?

## Key Activities

### Week 1: Archiving Fundamentals

**Activity 6.1: Archival Case Studies**
- Examine existing digital heritage projects
- Analyze their approaches to access, metadata, and ethics
- Critique strengths and weaknesses
- Identify best practices

**Activity 6.2: Metadata Creation**
- Learn Dublin Core and cultural heritage metadata standards
- Create comprehensive metadata for Baboon Dance recordings
- Include cultural context, permissions, technical specifications
- Practice using controlled vocabularies

**Activity 6.3: File Format Workshop**
- Compare audio file formats (WAV, FLAC, MP3, AAC)
- Understand compression, quality, and preservation tradeoffs
- Convert and compare file qualities
- Choose appropriate formats for different purposes

### Week 2: Ethics and Community Engagement

**Activity 6.4: Traditional Knowledge Labels**
- Learn about TK Labels and Local Contexts project
- Identify which labels might apply to Baboon Dance materials
- Discuss community protocols and access restrictions
- Design culturally appropriate access policies

**Activity 6.5: Consent and Documentation**
- Review informed consent templates
- Create documentation forms for field recordings
- Role-play consent conversations
- Discuss power dynamics in archival relationships

**Activity 6.6: Archive Design Project**
- Design a digital archive for Baboon Dance materials
- Include: organizational structure, metadata schema, access policies
- Present to class for feedback
- Reflect on ethical challenges

## Assessment

### Digital Archive Design Proposal (100%)

Create a detailed proposal (2500-3000 words) for a digital archive of Baboon Dance materials:

**Part 1: Project Overview (15%)**
- Purpose and goals of the archive
- Target audiences (community, researchers, students, public)
- Scope of materials to include
- Partnership and governance structure

**Part 2: Technical Framework (25%)**
- **Metadata schema:**
  - Fields and standards (Dublin Core, custom fields)
  - Controlled vocabularies
  - Sample metadata records (at least 3)

- **File formats and standards:**
  - Master preservation formats
  - Access derivatives
  - Naming conventions
  - Storage and backup strategies

- **Platform and infrastructure:**
  - Archive platform/software (Omeka, DSpace, custom, etc.)
  - Hosting and maintenance plan
  - Search and discovery features

**Part 3: Ethical Framework (30%)**
- **Community engagement:**
  - How will community members be involved in decision-making?
  - What permissions and consent processes will be used?
  - How will community ownership be recognized?

- **Access and use policies:**
  - Who can access what materials?
  - Are there restricted or culturally sensitive items?
  - What uses are permitted (education, research, commercial)?
  - TK Labels or other cultural protocols

- **Benefit sharing:**
  - How does the archive benefit the community?
  - Revenue sharing, attribution, educational use

**Part 4: Sustainability Plan (15%)**
- Funding sources and budget
- Long-term maintenance strategy
- Succession planning
- Technology obsolescence mitigation

**Part 5: Sample Materials (10%)**
- Mock-up of archive interface (sketch or digital)
- 3 complete metadata records
- Sample access policy document
- Example TK Labels application

**Part 6: Reflection (5%)**
- Challenges encountered in design
- Ethical dilemmas and how you addressed them
- Limitations and future improvements

**Assessment Criteria:**
- Thoroughness and feasibility of technical plan
- Depth of ethical consideration
- Community-centered approach
- Attention to cultural protocols
- Quality of documentation and presentation
- Critical reflection

## Required Materials

### Readings
- "Protocols for Native American Archival Materials"
- Local Contexts TK Labels documentation
- Case studies of successful Indigenous digital archives
- Articles on digital preservation best practices

### Software/Tools
- Metadata editor (e.g., Catmandu, MarcEdit, spreadsheets)
- Audio editing software (Audacity, Adobe Audition)
- Example archive platforms (Omeka, DSpace demos)

### Resources
- [Archival Standards Guide](../../resources/guides/archival-standards.md)
- [Metadata Templates](../../resources/templates/metadata-templates/)
- [Ethics Resources](../../resources/guides/ethics-guide.md)

## Sample Metadata Record

```yaml
---
# Dublin Core + Custom Fields
title: "Baboon Dance Performance - Village Ceremony"
creator: "Traditional performers, Guyana"
date_created: "2023-08-15"
date_digitized: "2024-01-10"
description: >
  Traditional Baboon Dance performance recorded during
  a community ceremony in coastal Guyana. Features drum
  ensemble, vocal call-and-response, and dance movements.
  Duration approximately 8 minutes.

# Cultural Context
tradition: "Baboon Dance"
cultural_origin: "Guyanese Afro-Indigenous tradition"
ceremony_type: "Community celebration"
geographic_location: "Coastal Guyana (specific location withheld)"
language: "Guyanese Creole, traditional phrases"
performers: "Community ensemble (names withheld per agreement)"

# Technical Metadata
format: "WAV"
sample_rate: "48000 Hz"
bit_depth: "24-bit"
duration: "00:08:23"
file_size: "231 MB"
recording_equipment: "Zoom H6 with XY stereo mics"
recordist: "Rohan Sagar"

# Rights and Permissions
rights_holder: "Community collective (name withheld)"
license: "TK Label: Attribution + Non-Commercial + Community Voice"
restrictions: >
  Educational and research use permitted with attribution.
  Commercial use requires community permission.
  Sacred elements (min 4:15-5:30) not to be excerpted.
permissions_documentation: "Signed consent form on file"

# Access
access_level: "Restricted - educational institutions and researchers"
embargo_end: null
tk_labels: 
  - "TK Attribution"
  - "TK Non-Commercial"
  - "TK Community Voice"

# Preservation
master_file: "BD_2023_08_15_MASTER.wav"
access_copy: "BD_2023_08_15_ACCESS.mp3"
checksum_md5: "a3f5c8b2e9d1f4a6c7b8e3d2f5a9c1b4"
backup_locations:
  - "Local server - 2024-01-10"
  - "Cloud archive - 2024-01-11"
  - "Community copy provided - 2024-01-15"

# Related Materials
related_items:
  - "Photographic documentation of ceremony"
  - "Interview with lead drummer (separate file)"
  - "Ethnographic field notes"
collection: "Baboon Dance Tradition Documentation Project"

# Notes
archivist_notes: >
  Recording made with full community consent following
  three months of relationship building. Community reviewed
  materials and approved sharing with educational restrictions.
  Specific location withheld to protect community privacy.
---
```

## Case Study: Mukurtu CMS

**What is Mukurtu?**
- Free, open-source content management system
- Designed specifically for Indigenous communities
- Builds in cultural protocols for access
- Developed by and for Indigenous knowledge holders

**Key Features:**
- **Cultural protocols:** Define who can see what based on community rules
- **Traditional knowledge labels:** Built-in TK Labels support
- **Community governance:** Multiple permission levels and groups
- **Flexible metadata:** Customizable to community needs
- **Responsive design:** Works on mobile devices

**Use in This Module:**
- Explore Mukurtu demo sites
- Understand how technology can embody cultural values
- Consider if this approach fits Baboon Dance archiving
- Learn from Indigenous-led digital preservation

## Ethical Framework: CARE Principles

The CARE Principles for Indigenous Data Governance:

**C - Collective Benefit**
- Data ecosystems should benefit Indigenous communities
- Data should support Indigenous innovation and self-determination
- Data should be designed to enable participation in governance

**A - Authority to Control**
- Indigenous peoples' rights and interests in data must be recognized
- Indigenous governance of data aligns with Indigenous values
- Indigenous peoples have the right to develop cultural protocols

**R - Responsibility**
- Those working with Indigenous data have responsibilities to share
- Transparency and accountability in how data is used
- Support capacity building within Indigenous communities

**E - Ethics**
- Rights and wellbeing of Indigenous peoples should be primary concern
- Ethics should be assessed from Indigenous values and perspectives
- Indigenous ethical frameworks should guide data practices

## Additional Resources

### Organizations and Projects
- Local Contexts: Traditional Knowledge Labels
- Mukurtu: Digital heritage management system
- Digital Indigenous Audio Preservation (DIAP)
- PARADISEC: Pacific and Regional Archive for Digital Sources in Endangered Cultures

### Standards Documentation
- Dublin Core Metadata Initiative
- MODS (Metadata Object Description Schema)
- Society of American Archivists best practices

## Instructor Notes

### Facilitation Approach
- Emphasize that technical solutions must serve cultural values
- Invite Indigenous archivists or cultural heritage professionals to speak
- Acknowledge historical harms of colonial archiving practices
- Encourage critical evaluation of "open access" assumptions
- Support students in grappling with complex ethical questions

### Discussion Prompts
- "Who owns cultural knowledge?"
- "What are the risks of digitizing sacred or sensitive materials?"
- "How can archives be tools of empowerment rather than extraction?"
- "What happens when archival standards conflict with cultural protocols?"

### Common Challenges
- Students may default to "open everything" mentality
- Technical requirements can overshadow ethical considerations
- Difficulty imagining community-centered processes
- Oversimplification of complex cultural protocols

### Assessment Guidance
- Value ethical reasoning over perfect technical solutions
- Look for evidence of genuine engagement with community perspectives
- Reward creative approaches to difficult problems
- Encourage students to identify what they don't know and can't decide alone

## Connection to Next Module

Module 7 brings together all previous modules in a culminating project. Students will create digital exhibitions that combine their analytical work, visualizations, and archival thinking into public-facing presentations that honor the Baboon Dance tradition while demonstrating their interdisciplinary skills.

---

[← Back: Module 5](../module-05/README.md) | [Next: Module 7 →](../module-07/README.md)
