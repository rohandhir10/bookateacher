import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SUBJECT_PAGES = (
    "src/app/subjects/ielts/page.tsx",
    "src/app/subjects/toefl/page.tsx",
    "src/app/subjects/spoken-english/page.tsx",
)
UNSUPPORTED_PROMISES = ("within 24 hours", "typical match time", "24h")
UNVERIFIED_CLAIMS = {
    "src/app/subjects/ielts/page.tsx": (
        "certified IELTS tutors on the platform",
        "highest tutor IELTS score",
        "Vikram Singh",
        "IDP-certified, Band 8.5 scorers",
    ),
    "src/app/subjects/toefl/page.tsx": (
        "certified TOEFL tutor on the platform",
        "highest tutor TOEFL score",
        "Ananya Sharma",
        "TOEFL iBT 112 scorer",
    ),
    "src/app/subjects/spoken-english/page.tsx": (
        "spoken English tutors on the platform",
    ),
}


class TutorAvailabilityCopyTests(unittest.TestCase):
    def test_subject_pages_do_not_publish_unverified_profile_or_score_claims(self):
        for relative_path, claims in UNVERIFIED_CLAIMS.items():
            source = (ROOT / relative_path).read_text(encoding="utf-8")
            for claim in (*claims, *UNSUPPORTED_PROMISES):
                with self.subTest(path=relative_path, claim=claim):
                    if claim in source:
                        self.fail(f"{relative_path} still contains unverified claim: {claim}")

    def test_subject_pages_link_to_the_live_directory_for_current_availability(self):
        for relative_path in SUBJECT_PAGES:
            with self.subTest(path=relative_path):
                source = (ROOT / relative_path).read_text(encoding="utf-8")
                if 'href="/tutors"' not in source:
                    self.fail(f"{relative_path} does not link to the live tutor directory")
                if "View tutor directory" not in source:
                    self.fail(f"{relative_path} does not label the current-availability link")

    def test_subject_index_has_no_static_tutor_count_or_match_time_metrics(self):
        source = (ROOT / "src/app/subjects/page.tsx").read_text(encoding="utf-8")
        if "stats: { tutors:" in source or 'matchTime: "24h"' in source:
            self.fail("the subject index still contains static tutor-count or match-time metrics")
        if 'href="/tutors"' not in source:
            self.fail("the subject index does not link to the live tutor directory")


    def test_empty_directory_offers_learners_a_contact_next_step(self):
        source = (ROOT / "src/app/tutors/page.tsx").read_text(encoding="utf-8")
        if "No tutor profiles are listed yet" not in source:
            self.fail("the directory no longer has its honest empty state")
        if 'href="/contact"' not in source or "Contact us about availability" not in source:
            self.fail("learners have no contact option when the directory is empty")


if __name__ == "__main__":
    unittest.main(verbosity=2)
