import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


class BandScoreAccessibilityTests(unittest.TestCase):
    def setUp(self):
        self.component = (ROOT / "src/components/BandScoreTool.tsx").read_text(encoding="utf-8")
        self.styles = (ROOT / "src/app/globals.css").read_text(encoding="utf-8")

    def test_tool_does_not_request_an_unsaved_email(self):
        if 'type="email"' in self.component:
            self.fail("The score tool must not request an email address it does not store or send.")

    def test_timeline_action_has_visible_keyboard_focus(self):
        if 'className="band-score-reveal-button"' not in self.component:
            self.fail("The timeline action is missing its focusable control class.")
        if ".band-score-reveal-button:focus-visible" not in self.styles:
            self.fail("The timeline action is missing a visible keyboard-focus style.")

    def test_success_feedback_is_announced_as_a_status(self):
        if 'role="status"' not in self.component or 'aria-live="polite"' not in self.component:
            self.fail("Success feedback must be announced as a polite status.")

    def test_success_copy_does_not_promise_a_tutor_match(self):
        copy = self.component.lower()
        if "within 24 hours" in copy or "you're on the list" in copy:
            self.fail("The tool must not claim to store an email or arrange a tutor match.")


if __name__ == "__main__":
    unittest.main()
