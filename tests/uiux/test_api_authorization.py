import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


class ApiAuthorizationArchitectureTests(unittest.TestCase):
    def test_authorization_policy_module_exists(self):
        source = (ROOT / "src/lib/authorization.ts").read_text(encoding="utf-8")
        for name in (
            "canReadLead",
            "canUpdateLead",
            "canCreateSession",
            "canUpdateSession",
            "canCompleteSession",
            "canRequestTestimonial",
            "canPublishTestimonial",
            "sanitizeLeadUpdates",
            "sanitizeSessionUpdates",
        ):
            self.assertIn(f"function {name}", source)

    def test_mutating_lead_api_uses_authorization_guards(self):
        source = (ROOT / "src/app/api/leads/route.ts").read_text(encoding="utf-8")
        for name in (
            "canCreateSession",
            "canUpdateLead",
            "canUpdateSession",
            "canCompleteSession",
            "canRequestTestimonial",
            "canPublishTestimonial",
        ):
            self.assertIn(name, source)

    def test_database_mutations_use_field_allowlists(self):
        source = (ROOT / "src/lib/db.ts").read_text(encoding="utf-8")
        self.assertIn("const allowedFields = new Set", source)
        self.assertIn("getLeadsForTutor", source)
        self.assertIn("student_id", source)

    def test_matching_status_uses_server_data_access_and_shared_policy(self):
        source = (ROOT / "src/app/matching-status/page.tsx").read_text(encoding="utf-8")
        self.assertIn('from "@/lib/db"', source)
        self.assertIn("getLeadById", source)
        self.assertIn("canReadLead", source)
        self.assertNotIn("apiGetLead", source)


if __name__ == "__main__":
    unittest.main()
