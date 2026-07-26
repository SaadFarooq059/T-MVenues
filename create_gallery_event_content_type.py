"""
Creates the "Gallery Event" content type in Contentful, with all fields
and validations set up correctly (avoids the manual-click mistakes we
ran into in the Contentful UI, like validation rules leaking onto the
wrong field).

SETUP:
1. pip install contentful-management python-dotenv
2. Create a .env file in the same folder as this script (or reuse your
   project's .env.local) with:
       CONTENTFUL_SPACE_ID=your_space_id
       CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
       CONTENTFUL_ENVIRONMENT=master
3. Run: python create_gallery_event_content_type.py

The Management Token is different from your Delivery/Preview tokens.
Get it from: Contentful -> Settings -> API keys -> Content management tokens
-> Generate personal token

SAFETY: This script only creates/updates a content type definition.
It does not touch any existing entries or your "Gallery Image" type.
Re-running it is safe -- it will update the existing "Gallery Event"
type if it already exists, rather than erroring out.
"""

import os
import sys
from dotenv import load_dotenv

load_dotenv()  # reads .env in the current folder

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

CONTENT_TYPE_ID = "galleryEvent"
CONTENT_TYPE_NAME = "Gallery Event"
CATEGORY_VALUES = ["Weddings", "Corporate", "Styled Shoots"]


def main():
    client = contentful_management.Client(MANAGEMENT_TOKEN)
    space = client.spaces().find(SPACE_ID)
    environment = space.environments().find(ENVIRONMENT_ID)

    print(f"Connected to space '{space.name}' (environment: {ENVIRONMENT_ID})")

    # Check if it already exists
    existing = None
    for ct in environment.content_types().all():
        if ct.id == CONTENT_TYPE_ID:
            existing = ct
            break

    fields = [
        {
            "id": "title",
            "name": "Event Name",
            "type": "Symbol",
            "required": True,
        },
        {
            "id": "category",
            "name": "Category",
            "type": "Symbol",
            "required": True,
            "validations": [{"in": CATEGORY_VALUES}],
        },
        {
            "id": "coverImage",
            "name": "Cover Image",
            "type": "Link",
            "linkType": "Asset",
            "required": True,
        },
        {
            "id": "photos",
            "name": "Photos",
            "type": "Array",
            "required": True,
            "items": {"type": "Link", "linkType": "Asset"},
        },
        {
            "id": "eventDate",
            "name": "Event Date",
            "type": "Date",
            "required": False,
        },
        {
            "id": "description",
            "name": "Description",
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

    print(
        "\nNext: go to Contentful -> Content -> Add entry -> Gallery Event, "
        "and create your first test entry with 2-3 photos."
    )


if __name__ == "__main__":
    main()
