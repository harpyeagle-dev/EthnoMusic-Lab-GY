from cog_ethno_lab.annotation_schema import default_schema


def test_default_schema_contains_core_sections() -> None:
    schema = default_schema()
    assert "participants" in schema
    assert "cognitive_markers" in schema
    assert "ethics" in schema
