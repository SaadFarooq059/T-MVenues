"""
Creates the "Journey Image" content type in Contentful -- used for the
Home page "Our Journey" dual marquee slider (flat, one entry per photo,
separate from the "Gallery Event" type used on the full Gallery page).

SETUP: same as create_gallery_event_content_type.py
1. pip install contentful-management python-dotenv
2. .env file with CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN,
   CONTENTFUL_ENVIRONMENT
3. Run: python create_journey_image_content_type.py
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

CONTENT_TYPE_ID = "journeyImage"
CONTENT_TYPE_NAME = "Journey Image"
CATEGORY_VALUES = ["Weddings", "Corporate", "Styled Shoots"]
SPAN_VALUES = ["tall", "wide", "normal"]


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
            "id": "title",
            "name": "Title",
            "type": "Symbol",
            "required": True,
        },
        {
            "id": "alt",
            "name": "Alt Text",
            "type": "Symbol",
            "required": True,
        },
        {
            "id": "image",
            "name": "Image",
            "type": "Link",
            "linkType": "Asset",
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
        req = "required" if f["required"] else "optional"
        print(f"  - {f['name']} ({f['id']}): {f['type']} [{req}]")

    print(
        "\nNext: run bulk_upload_journey_images.py to upload your 9 "
        "curated photos with their titles/categories pre-filled."
    )


if __name__ == "__main__":
    main()
