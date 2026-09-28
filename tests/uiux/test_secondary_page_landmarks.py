import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AUTH_ROUTES = (
    ("src/app/login/page.tsx", "src/app/login/layout.tsx"),
    ("src/app/register/page.tsx", "src/app/register/layout.tsx"),
)


class SecondaryPageLandmarkTests(unittest.TestCase):
    def test_auth_routes_have_one_footer_and_named_navigation(self):
        for page_path, layout_path in AUTH_ROUTES:
            page = (ROOT / page_path).read_text(encoding="utf-8")
            layout = (ROOT / layout_path).read_text(encoding="utf-8")
            with self.subTest(page=page_path):
                if page.count("<footer") + layout.count("<footer") != 1:
                    self.fail(f"{page_path} and its layout must render exactly one footer.")
                if '<nav aria-label="Account navigation"' not in page:
                    self.fail(f"{page_path} needs a named account-navigation landmark.")
                if '<nav aria-label="Legal and support"' not in page + layout:
                    self.fail(f"{page_path} footer links need a named navigation landmark.")

    def test_contact_page_has_a_consistent_landmark_shell(self):
        source = (ROOT / "src/app/contact/page.tsx").read_text(encoding="utf-8")
        for landmark in ("<header", "<main", "<footer"):
            if landmark not in source:
                self.fail(f"Contact page is missing the {landmark[1:]} landmark.")
        for nav_name in ("Primary navigation", "Legal and support"):
            if f'<nav aria-label="{nav_name}"' not in source:
                self.fail(f"Contact page is missing named navigation: {nav_name}.")


if __name__ == "__main__":
    unittest.main()
