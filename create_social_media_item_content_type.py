"""
Creates the "Social Media Item" content type in Contentful -- used for the
Home page "Follow Along" interactive bento gallery (photos + videos).

SETUP:
1. pip install contentful-management python-dotenv
2. Add CONTENTFUL_MANAGEMENT_TOKEN to public/.env (or project-root .env)
   Create one at: Contentful -> Settings -> CMA tokens -> Personal access tokens
   (This is NOT the same as CONTENTFUL_ACCESS_TOKEN / Delivery API key.)
3. Also need CONTENTFUL_SPACE_ID and optional CONTENTFUL_ENVIRONMENT
4. Run from anywhere:
     python public/create_social_media_item_content_type.py
     python create_social_media_item_content_type.py
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

# When this file lives at repo root, parent is ROOT; when in public/, go up one.
HERE = Path(__file__).resolve().parent
ROOT = HERE if (HERE / "public").is_dir() else HERE.parent
PUBLIC = ROOT / "public"

for env_path in (
    ROOT / ".env.local",
    ROOT / ".env",
    PUBLIC / ".env",
):
    if env_path.exists():
        load_dotenv(env_path, override=False)

try:
    import contentful_management
except ImportError:
    print("Missing dependency. Run: pip install contentful-management python-dotenv")
    sys.exit(1)

SPACE_ID = os.environ.get("CONTENTFUL_SPACE_ID")
MANAGEMENT_TOKEN = os.environ.get("CONTENTFUL_MANAGEMENT_TOKEN")
ENVIRONMENT_ID = os.environ.get("CONTENTFUL_ENVIRONMENT", "master")

if not SPACE_ID or not MANAGEMENT_TOKEN:
    print("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN.")
    print("Add them to public/.env — MANAGEMENT_TOKEN is a CMA Personal Access Token,")
    print("not the Delivery API Content Delivery / Preview token from .env.local.")
    sys.exit(1)

CONTENT_TYPE_ID = "socialMediaItem"
CONTENT_TYPE_NAME = "Social Media Item"
SPAN_VALUES = ["tall", "wide", "feature"]


def main():
    client = contentful_management.Client(MANAGEMENT_TOKEN)
    try:
        space = client.spaces().find(SPACE_ID)
    except contentful_management.errors.UnauthorizedError:
        print("401 Unauthorized — CONTENTFUL_MANAGEMENT_TOKEN is invalid or revoked.")
        print()
        print("Fix:")
        print("  1. Open https://app.contentful.com -> Settings -> CMA tokens")
        print("  2. Create a Personal access token")
        print("  3. Put it in public/.env as:")
        print("       CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-...")
        print("  4. Re-run this script")
        print()
        print("Note: CONTENTFUL_ACCESS_TOKEN in .env.local is the Delivery key —")
        print("it cannot create content types. You need a Management (CMA) token.")
        sys.exit(1)

    environment = space.environments().find(ENVIRONMENT_ID)

    print(f"Connected to space '{space.name}' (environment: {ENVIRONMENT_ID})")

    existing = None
    for ct in environment.content_types().all():
        if ct.id == CONTENT_TYPE_ID:
            existing = ct
            break

    fields = [
        {
            "id": "title",
            "name": "Title",
            "type": "Symbol",
            "required": True,
        },
        {
            "id": "description",
            "name": "Description",
            "type": "Text",
            "required": False,
        },
        {
            "id": "media",
            "name": "Media",
            "type": "Link",
            "linkType": "Asset",
            "required": True,
            "validations": [
                {
                    "linkMimetypeGroup": ["image", "video"],
                }
            ],
        },
        {
            "id": "span",
            "name": "Span",
            "type": "Symbol",
            "required": False,
            "validations": [{"in": SPAN_VALUES}],
        },
        {
            "id": "order",
            "name": "Order",
            "type": "Integer",
            "required": False,
        },
    ]

    if existing:
        print(f"Content type '{CONTENT_TYPE_ID}' already exists. Updating fields...")
        existing.fields = fields
        existing.name = CONTENT_TYPE_NAME
        existing.save()
        existing.publish()
        print("Updated and published.")
    else:
        print(f"Creating content type '{CONTENT_TYPE_ID}'...")
        content_type = environment.content_types().create(
            CONTENT_TYPE_ID,
            {
                "name": CONTENT_TYPE_NAME,
                "displayField": "title",
                "fields": fields,
            },
        )
        content_type.publish()
        print("Created and published.")

    print("\nDone! Field summary:")
    for f in fields:
        req = "required" if f.get("required") else "optional"
        print(f"  - {f['name']} ({f['id']}): {f['type']} [{req}]")

    print(
        "\nNext: Contentful -> Content -> Add entry -> Social Media Item.\n"
        "Upload an image or video asset, set Title + Order (1, 2, 3…).\n"
        "Span options: tall | wide | feature (optional — cycles if empty).\n"
        "Publish both the entry AND the media asset."
    )


if __name__ == "__main__":
    main()
