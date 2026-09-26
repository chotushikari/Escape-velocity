"""No-key contract checks for the OASIS boundary.

Run in the OASIS image or a virtual environment after installing requirements:
python -m unittest discover services/oasis/tests
"""
import sqlite3
import tempfile
import unittest
from pathlib import Path

from app.main import Content, Event, content_variant_id, extract_action_events, normalise_action


class OasisContractTests(unittest.TestCase):
    def test_action_normalisation_is_allowlisted(self) -> None:
        self.assertEqual(normalise_action("ActionType.LIKE_POST"), "LIKE")
        self.assertEqual(normalise_action("DO_NOTHING"), "IGNORE")
        self.assertIsNone(normalise_action("DELETE_ACCOUNT"))

    def test_content_variant_is_stable(self) -> None:
        content = Content(text="A clear creator message", platform="LinkedIn")
        self.assertEqual(content_variant_id(content), content_variant_id(content))

    def test_reads_only_supported_action_telemetry(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            database = Path(directory) / "run.db"
            with sqlite3.connect(database) as connection:
                connection.execute("CREATE TABLE actions (agent_id TEXT, action_type TEXT, timestamp TEXT)")
                connection.execute("INSERT INTO actions VALUES ('p-1', 'LIKE_POST', '2026-01-01T00:00:00+00:00')")
            events = extract_action_events(database, "audience-a", Content(text="Hello", platform="Instagram"))
        self.assertEqual(len(events), 1)
        self.assertEqual(events[0].action, "LIKE")
        self.assertEqual(events[0].personaId, "p-1")
        self.assertTrue(events[0].simulationId.startswith("sim-audience-a-"))
        # Constructing the model verifies all bounded fields and enum values.
        self.assertIsInstance(events[0], Event)

    def test_missing_telemetry_fails_closed(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            database = Path(directory) / "run.db"
            with sqlite3.connect(database) as connection:
                connection.execute("CREATE TABLE notes (id TEXT, body TEXT)")
            with self.assertRaisesRegex(RuntimeError, "refusing to invent"):
                extract_action_events(database, "audience-a", Content(text="Hello", platform="Instagram"))


if __name__ == "__main__":
    unittest.main()
