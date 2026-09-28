import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOCIAL_IMAGE = "https://bookateacher.in/og-social.png"
PAGES = {
    "src/app/page.tsx": ("/", "English preparation & tutor directory"),
    "src/app/privacy/page.tsx": ("/privacy", "Privacy Policy"),
    "src/app/terms/page.tsx": ("/terms", "Terms of Service"),
    "src/app/about/page.tsx": ("/about", "About"),
    "src/app/contact/page.tsx": ("/contact", "Contact"),
    "src/app/login/page.tsx": ("/login", "Sign in"),
    "src/app/register/page.tsx": ("/register", "Sign up"),
    "src/app/subjects/page.tsx": ("/subjects", "Subjects — IELTS, TOEFL & Spoken English Preparation"),
    "src/app/subjects/ielts/page.tsx": ("/subjects/ielts", "IELTS Preparation — Tutor Directory"),
    "src/app/subjects/toefl/page.tsx": ("/subjects/toefl", "TOEFL Preparation — Tutor Directory"),
    "src/app/subjects/spoken-english/page.tsx": ("/subjects/spoken-english", "Spoken English Preparation — Tutor Directory"),
    "src/app/tutors/page.tsx": ("/tutors", "Tutor Directory — IELTS, TOEFL & Spoken English"),
}


class SocialMetadataTests(unittest.TestCase):
    def test_affected_pages_have_self_canonicals_and_complete_social_metadata(self):
        failures = []
        for relative, (route, expected_title) in PAGES.items():
            source = (ROOT / relative).read_text(encoding="utf-8")
            title = re.search(r'^\s*title:\s*"([^"]+)"', source, re.MULTILINE)
            if not title or title.group(1) != expected_title:
                failures.append(f"{relative} title should be {expected_title!r} without a repeated brand")
            canonical = "https://bookateacher.in" if route == "/" else f"https://bookateacher.in{route}"
            if canonical not in source:
                failures.append(f"{relative} needs the self-canonical {canonical}")
            if f'url: "{canonical}"' not in source:
                failures.append(f"{relative} needs a matching Open Graph URL")
            if source.count(SOCIAL_IMAGE) < 2:
                failures.append(f"{relative} needs Open Graph and Twitter images")
        if failures:
            self.fail("; ".join(failures))

    def test_root_and_subject_metadata_use_the_neutral_raster_share_image(self):
        root = (ROOT / "src/app/layout.tsx").read_text(encoding="utf-8")
        if root.count(SOCIAL_IMAGE) < 2:
            self.fail("Root metadata needs default Open Graph and Twitter images.")
        for claim in ("6.5 to 7.5", "six weeks", "certified ielts, toefl, and spoken english tutors across india"):
            if claim in root.lower():
                self.fail(f"Root metadata still contains an unverified claim: {claim}")
        home_source = (ROOT / "src/app/page.tsx").read_text(encoding="utf-8").lower()
        home_metadata_match = re.search(r"export const metadata: metadata = \{(.*?)\n\};", home_source, re.DOTALL)
        home_metadata = home_metadata_match.group(1) if home_metadata_match else home_source
        for claim in ("6.5 to 7.5", "six weeks", "certified ielts, toefl, and spoken english tutors across india"):
            if claim in home_metadata:
                self.fail(f"Homepage metadata still contains an unverified claim: {claim}")
        subject_pages = (
            "src/app/subjects/page.tsx",
            "src/app/subjects/ielts/page.tsx",
            "src/app/subjects/toefl/page.tsx",
            "src/app/subjects/spoken-english/page.tsx",
        )
        for relative in subject_pages:
            source = (ROOT / relative).read_text(encoding="utf-8")
            if SOCIAL_IMAGE not in source or "og-default.svg" in source:
                self.fail(f"{relative} still uses the unsupported-claims share image.")

    def test_page_title_literals_do_not_repeat_the_site_brand(self):
        failures = []
        for page in (ROOT / "src/app").rglob("page.tsx"):
            source = page.read_text(encoding="utf-8")
            if re.search(r'title:\s*"[^"]*bookateacher\.in', source):
                failures.append(str(page.relative_to(ROOT)))
        if failures:
            self.fail("Page-level title literals repeat the brand: " + ", ".join(failures))

    def test_share_image_has_no_score_or_availability_promises(self):
        svg = ROOT / "public/og-social.svg"
        png = ROOT / "public/og-social.png"
        if not svg.exists() or not png.exists():
            self.fail("Neutral SVG and raster share images must both exist.")
        text = svg.read_text(encoding="utf-8").lower()
        for claim in ("6.5 to 7.5", "six weeks", "certified tutors across india", "book a session"):
            if claim in text:
                self.fail(f"Share image still contains unverified claim: {claim}")


if __name__ == "__main__":
    unittest.main()
