#!/usr/bin/env python3
"""Disable Vercel SSO protection and add custom domain for bookateacher.in"""
import subprocess, json, sys, time

# Get a Vercel API token from the CLI
result = subprocess.run(
    ["npx", "vercel", "tokens", "list", "--json"],
    capture_output=True, text=True, cwd="/Users/rohandhir/bookateacher-app"
)
tokens = json.loads(result.stdout)
token = tokens["tokens"][0]["id"]
print(f"Using token: {token[:20]}...")

PROJECT_ID = "prj_vOdwCSanIFZ7fsCFEmUWyTnE6Xaq"
BASE = "https://api.vercel.com"

# 1. Disable SSO protection
print("\n1. Disabling SSO protection...")
r = subprocess.run(
    ["curl", "-s", "-X", "PATCH", f"{BASE}/v2/projects/{PROJECT_ID}",
     "-H", f"Authorization: Bearer {token}",
     "-H", "Content-Type: application/json",
     "-d", json.dumps({
         "ssoProtection": {"deploymentType": "disabled"},
         "gitForkProtection": False,
     })],
    capture_output=True, text=True
)
print(f"   Status: {r.returncode}")
resp = json.loads(r.stdout)
print(f"   Response: {json.dumps(resp, indent=2)[:500]}")

# 2. Add custom domain bookateacher.in
print("\n2. Adding custom domain bookateacher.in...")
r2 = subprocess.run(
    ["curl", "-s", "-X", "POST", f"{BASE}/v9/projects/{PROJECT_ID}/domains",
     "-H", f"Authorization: Bearer {token}",
     "-H", "Content-Type: application/json",
     "-d", json.dumps({"domain": "bookateacher.in", "type": "production"})],
    capture_output=True, text=True
)
print(f"   Status: {r2.returncode}")
try:
    resp2 = json.loads(r2.stdout)
    print(f"   Response: {json.dumps(resp2, indent=2)[:800]}")
except:
    print(f"   Raw: {r2.stdout[:500]}")

# 3. Add www.bookateacher.in 
print("\n3. Adding www.bookateacher.in...")
r3 = subprocess.run(
    ["curl", "-s", "-X", "POST", f"{BASE}/v9/projects/{PROJECT_ID}/domains",
     "-H", f"Authorization: Bearer {token}",
     "-H", "Content-Type: application/json",
     "-d", json.dumps({"domain": "www.bookateacher.in", "type": "production"})],
    capture_output=True, text=True
)
print(f"   Status: {r3.returncode}")
try:
    resp3 = json.loads(r3.stdout)
    print(f"   Response: {json.dumps(resp3, indent=2)[:800]}")
except:
    print(f"   Raw: {r3.stdout[:500]}")

print("\nDone.")
