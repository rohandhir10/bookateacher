import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PUBLIC_ROUTES = {
    "/": "src/app/page.tsx",
    "/subjects": "src/app/subjects/page.tsx",
    "/subjects/ielts": "src/app/subjects/ielts/page.tsx",
    "/subjects/toefl": "src/app/subjects/toefl/page.tsx",
    "/subjects/spoken-english": "src/app/subjects/spoken-english/page.tsx",
    "/tutors": "src/app/tutors/page.tsx",
    "/about": "src/app/about/page.tsx",
    "/contact": "src/app/contact/page.tsx",
    "/privacy": "src/app/privacy/page.tsx",
    "/terms": "src/app/terms/page.tsx",
    "/site-map": "src/app/site-map/page.tsx",
}


class SitemapNavigationTests(unittest.TestCase):
    def test_xml_sitemap_contains_public_routes_and_excludes_auth_private_routes(self):
        source = (ROOT / "src/app/sitemap.ts").read_text(encoding="utf-8")
        for route in PUBLIC_ROUTES:
            if route == "/":
                self.assertIn("url: baseUrl", source)
            else:
                self.assertIn(f"${{baseUrl}}{route}", source, f"Missing sitemap route {route}")
        for private in ("/login", "/register", "/dashboard", "/matching-status", "/tutor/dashboard"):
            self.assertNotIn(f"${{baseUrl}}{private}", source)
        self.assertNotIn("register?role=", source)

    def test_human_sitemap_links_every_public_route_and_returns_home(self):
        source = (ROOT / "src/app/site-map/page.tsx").read_text(encoding="utf-8")
        for route in PUBLIC_ROUTES:
            if route == "/":
                self.assertRegex(source, r'\["Home",\s*"/"\]')
            else:
                self.assertIn(f'"{route}"', source, f"Human sitemap missing {route}")
        self.assertIn('href="/" className="site-map-home"', source)
        self.assertIn('aria-label="Breadcrumb"', source)
        self.assertIn('id="main-content" tabIndex={-1}', source)

    def test_public_footers_link_to_human_sitemap(self):
        for relative in (
            "src/app/page.tsx",
            "src/app/subjects/page.tsx",
            "src/app/subjects/ielts/page.tsx",
            "src/app/subjects/toefl/page.tsx",
            "src/app/subjects/spoken-english/page.tsx",
            "src/app/tutors/page.tsx",
            "src/app/about/page.tsx",
            "src/app/contact/page.tsx",
            "src/app/privacy/page.tsx",
            "src/app/terms/page.tsx",
            "src/app/login/page.tsx",
            "src/app/register/page.tsx",
            "src/app/tutors/[id]/page.tsx",
        ):
            source = (ROOT / relative).read_text(encoding="utf-8")
            self.assertIn('href="/site-map"', source, f"No site-map link in {relative}")

    def test_auth_pages_are_noindex_and_robots_excludes_private_app_routes(self):
        for relative in ("src/app/login/page.tsx", "src/app/register/page.tsx"):
            source = (ROOT / relative).read_text(encoding="utf-8")
            self.assertIn("robots: { index: false, follow: true }", source)
        robots = (ROOT / "src/app/robots.ts").read_text(encoding="utf-8")
        for route in ("/dashboard", "/matching-status", "/tutor/"):
            self.assertIn(route, robots)
        self.assertNotIn("/login", robots)
        self.assertNotIn("/register", robots)
        self.assertIn("/api/", robots)
        self.assertIn("/_next/", robots)
        self.assertIn("https://bookateacher.in/sitemap.xml", robots)

    def test_tutor_onboarding_has_wayfinding_and_exit_paths(self):
        source = (ROOT / "src/app/tutor/profile/page.tsx").read_text(encoding="utf-8")
        for expected in (
            'aria-label="Account navigation"',
            'aria-label="Breadcrumb"',
            'href="/"',
            'href="/register?role=tutor"',
            'href="/tutors"',
            'href="/login"',
        ):
            self.assertIn(expected, source)

    def test_tutor_lead_filters_navigate_and_filter_real_results(self):
        source = (ROOT / "src/app/tutor/dashboard/page.tsx").read_text(encoding="utf-8")
        self.assertIn("searchParams: Promise<{ status?: string }>", source)
        self.assertIn('role="group"', source)
        self.assertIn('aria-label="Filter leads by status"', source)
        self.assertIn('aria-current={selected ? "page" : undefined}', source)
        self.assertIn("leads.filter((lead) => lead.status === selectedLeadStatus)", source)
        self.assertIn("filteredLeads.map((lead)", source)
        self.assertIn("Show all leads", source)
        self.assertNotIn("onClick=", source)

    def test_site_map_routes_have_real_page_files(self):
        for route, relative in PUBLIC_ROUTES.items():
            self.assertTrue((ROOT / relative).is_file(), f"No page file for {route}")


if __name__ == "__main__":
    unittest.main()
