from __future__ import annotations

from cog_ethno_lab.pipeline import initialize_study, run_study_pipeline


def main() -> None:
    """Initialize the study and run the available processing steps."""
    initialize_study(".")
    artifacts = run_study_pipeline(root=".")
    print(artifacts)


if __name__ == "__main__":
    main()
