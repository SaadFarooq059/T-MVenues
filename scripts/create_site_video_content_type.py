"""
Creates the "Site Video" content type in Contentful -- one reusable
content type for both video spots on the site:
  1. Home -- Intro (autoplay looping background video)
  2. About -- Hero (play button opens video in a modal)

Both currently point at the same file (/videos/intro.mp4), but are
modeled as separate entries so the client can swap either one
independently later without needing a developer.

SETUP: same as the other create_*_content_type.py scripts
1. pip install contentful-management python-dotenv
2. .env file with CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN,
   CONTENTFUL_ENVIRONMENT
3. Run: python create_site_video_content_type.py
"""

import os
import sys
from dotenv import load_dotenv

load_dotenv()

try:
    import contentful_management
except ImportError:
    print("Missing dependency. Run: pip install contentful-management python-dotenv")
    sys.exit(1)

SPACE_ID = os.environ.get("CONTENTFUL_SPACE_ID")
MANAGEMENT_TOKEN = os.environ.get("CONTENTFUL_MANAGEMENT_TOKEN")
ENVIRONMENT_ID = os.environ.get("CONTENTFUL_ENVIRONMENT", "master")

if not SPACE_ID or not MANAGEMENT_TOKEN:
    print("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in your .env file.")
    sys.exit(1)

CONTENT_TYPE_ID = "siteVideo"
CONTENT_TYPE_NAME = "Site Video"

# Locked list -- matches your two current video placements.
PLACEMENT_VALUES = [
    "Home Intro",
    "About Hero",
]


def main():
    client = contentful_management.Client(MANAGEMENT_TOKEN)
    space = client.spaces().find(SPACE_ID)
    environment = space.environments().find(ENVIRONMENT_ID)

    print(f"Connected to space '{space.name}' (environment: {ENVIRONMENT_ID})")

    existing = None
    for ct in environment.content_types().all():
        if ct.id == CONTENT_TYPE_ID:
            existing = ct
            break

    fields = [
        {
            "id": "placement",
            "name": "Placement",
            "type": "Symbol",
            "required": True,
            "validations": [{"in": PLACEMENT_VALUES}],
        },
        {
            "id": "title",
            "name": "Title",
            "type": "Symbol",
            "required": True,
        },
        {
            "id": "videoUrl",
            "name": "Video URL",
            "type": "Symbol",
            "required": False,
        },
        {
            "id": "videoFile",
            "name": "Video File",
            "type": "Link",
            "linkType": "Asset",
            "required": False,
        },
        {
            "id": "posterImage",
            "name": "Poster Image",
            "type": "Link",
            "linkType": "Asset",
            "required": False,
        },
        {
            "id": "caption",
            "name": "Caption",
            "type": "Text",
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
        req = "required" if f["required"] else "optional"
        print(f"  - {f['name']} ({f['id']}): {f['type']} [{req}]")

    print("\nLocked 'Placement' values:")
    for p in PLACEMENT_VALUES:
        print(f"  - {p}")

    print(
        "\nNext: go to Contentful -> Content -> Add entry -> Site Video, "
        "and create 2 entries -- one for 'Home Intro', one for 'About "
        "Hero'. For videoUrl, use a YouTube/Vimeo link if you move the "
        "video off local hosting, or leave videoUrl empty and use "
        "videoFile if uploading the raw file directly to Contentful "
        "(only recommended for short, small files)."
    )


if __name__ == "__main__":
    main()
