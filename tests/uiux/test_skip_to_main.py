import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


class SkipToMainTests(unittest.TestCase):
    def setUp(self):
        self.layout = (ROOT / "src/app/layout.tsx").read_text(encoding="utf-8")
        self.styles = (ROOT / "src/app/globals.css").read_text(encoding="utf-8")

    def test_skip_link_is_first_focusable_element_and_has_target(self):
        link = '<a className="skip-link" href="#main-content">Skip to main content</a>'
        if link not in self.layout:
            self.fail("Root layout needs the first-focusable skip-to-main link.")
        if self.layout.index(link) > self.layout.index("{children}"):
            self.fail("Skip-to-main link must appear before route content.")

    def test_skip_link_is_visibly_revealed_on_keyboard_focus(self):
        if ".skip-link:focus-visible" not in self.styles:
            self.fail("Skip link needs a visible keyboard-focus style.")

    def test_every_route_page_has_a_focusable_main_target(self):
        problems = []
        for page in sorted((ROOT / "src/app").rglob("page.tsx")):
            source = page.read_text(encoding="utf-8")
            mains = re.findall(r"<main\b([^>]*)>", source)
            if not mains:
                problems.append(f"{page.relative_to(ROOT)} has no main landmark")
                continue
            for attrs in mains:
                if 'id="main-content"' not in attrs or "tabIndex={-1}" not in attrs:
                    problems.append(f"{page.relative_to(ROOT)} main needs id and tabIndex")
        if problems:
            self.fail("; ".join(problems))


if __name__ == "__main__":
    unittest.main()
