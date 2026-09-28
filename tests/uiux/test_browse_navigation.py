import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LINK_PATTERN = re.compile(
    r"<(?:Link|a)\b(?P<attrs>[^>]*)>(?P<body>.*?)</(?:Link|a)>",
    re.DOTALL,
)
HREF_PATTERN = re.compile(r"\bhref\s*=\s*[\"']([^\"']+)[\"']")


def destinations_for_visible_text(relative_path: str, expected_text: str) -> list[str]:
    source = (ROOT / relative_path).read_text(encoding="utf-8")
    destinations = []
    for match in LINK_PATTERN.finditer(source):
        body = re.sub(r"<[^>]*>", " ", match.group("body"))
        visible_text = " ".join(body.split()).strip()
        if visible_text == expected_text:
            href = HREF_PATTERN.search(match.group("attrs"))
            if href:
                destinations.append(href.group(1))
    return destinations


class BrowseNavigationTests(unittest.TestCase):
    def test_homepage_find_tutor_actions_open_public_directory(self):
        destinations = destinations_for_visible_text("src/app/page.tsx", "Browse tutors")
        self.assertEqual(destinations, ["/tutors", "/tutors", "/tutors"])

    def test_subject_pages_browse_actions_open_public_directory(self):
        pages = (
            "src/app/subjects/page.tsx",
            "src/app/subjects/ielts/page.tsx",
            "src/app/subjects/toefl/page.tsx",
            "src/app/subjects/spoken-english/page.tsx",
        )
        for page in pages:
            with self.subTest(page=page):
                destinations = destinations_for_visible_text(page, "Browse tutors")
                self.assertEqual(destinations, ["/tutors"])

    def test_score_tool_browse_action_opens_public_directory(self):
        destinations = destinations_for_visible_text(
            "src/components/BandScoreTool.tsx", "Browse current tutor profiles"
        )
        self.assertEqual(destinations, ["/tutors"])

    def test_registration_success_browse_action_opens_public_directory(self):
        destinations = destinations_for_visible_text(
            "src/components/RegisterForm.tsx", "Browse tutors"
        )
        self.assertEqual(destinations, ["/tutors"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
