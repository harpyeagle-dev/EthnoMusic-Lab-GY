# Data Dictionary

## Recording Index

- `recording_id`: Stable identifier used across audio, transcript, and annotation files.
- `file_name`: Audio file name stored in `data/raw/audio/`.
- `community`: Community, scene, or cultural grouping used for comparison.
- `location`: Recording place or region.
- `event_context`: Performance context such as rehearsal, ritual, lesson, or festival.
- `performer_notes`: Free-text notes on performers, roles, or conditions.

## Transcript Template

- `segment_id`: Unique row identifier for transcript segments.
- `start_time_sec`: Segment start time in seconds.
- `end_time_sec`: Segment end time in seconds.
- `speaker_id`: Speaker, singer, leader, or respondent identifier.
- `language`: Language or code used in the segment.
- `utterance`: Verbatim or near-verbatim transcript.
- `translation`: Translation into the lab's working language.
- `performance_event`: What happens musically or socially during the segment.
- `rhythmic_cue`: Observed pulse, accent, break, handclap, step, or cue.
- `gesture_note`: Embodied movement or interaction note.
- `analytic_memo`: Interpretive note for later coding.

## Processed Features

- `tempo_bpm`: Estimated tempo in beats per minute.
- `onset_strength_mean`: Mean onset envelope strength across the track.
- `onset_strength_std`: Variability of onset envelope strength.
- `spectral_centroid_mean`: Mean spectral centroid as a rough timbral brightness measure.
- `duration_sec`: Track duration in seconds.
- `rhythm_cluster`: Unsupervised rhythm-style grouping assigned by clustering.