import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SWITCHERS = {
    "src/components/LoginForm.tsx": "Account mode",
    "src/components/RegisterForm.tsx": "Account type",
}


class AuthModeSwitchAccessibilityTests(unittest.TestCase):
    def test_mode_switches_use_named_button_groups_not_incomplete_tabs(self):
        for relative_path, group_name in SWITCHERS.items():
            source = (ROOT / relative_path).read_text(encoding="utf-8")
            with self.subTest(component=relative_path):
                if 'role="tablist"' in source or 'role="tab"' in source or "aria-selected=" in source:
                    self.fail(f"{relative_path} still uses tabs without tabpanels and arrow-key behavior.")
                if 'role="group"' not in source or f'aria-label="{group_name}"' not in source:
                    self.fail(f"{relative_path} needs a named button group.")
                if source.count("aria-pressed=") < 2:
                    self.fail(f"{relative_path} buttons need explicit pressed state.")


if __name__ == "__main__":
    unittest.main()
