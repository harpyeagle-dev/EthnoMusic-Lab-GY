from cog_ethno_lab.transcript_support import transcript_template_dataframe


def test_transcript_template_has_expected_columns() -> None:
    df = transcript_template_dataframe("sample-001")

    assert df.loc[0, "recording_id"] == "sample-001"
    assert "utterance" in df.columns
    assert "rhythmic_cue" in df.columns