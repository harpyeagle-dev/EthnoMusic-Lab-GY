from pathlib import Path

from click.testing import CliRunner

from cog_ethno_lab.cli import main


def test_full_run_with_generated_samples(tmp_path: Path) -> None:
    runner = CliRunner()
    result = runner.invoke(
        main,
        [
            "full-run",
            "--root",
            str(tmp_path),
            "--generate-samples",
            "--community",
            "Kabakaburi",
            "--location",
            "Region1",
            "--event-context",
            "Rehearsal",
        ],
    )

    assert result.exit_code == 0
    assert (tmp_path / "data/processed/features.csv").exists()
    assert (tmp_path / "data/processed/rhythm_summary.json").exists()
    assert (tmp_path / "data/processed/rhythm_clusters.csv").exists()
    assert (tmp_path / "data/processed/transcript_batch_summary.json").exists()
