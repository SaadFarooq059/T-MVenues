"""
Creates the "Service Slider Image" content type in Contentful -- used
for the in-focus image slider on each of the 4 Services sub-pages
(Weddings, Corporate Events, Commercial Shoots, Collaborations).

One flat content type, one entry per photo, tied to the correct
sub-page via the "service" field -- same pattern as "Journey Image".

SETUP: same as the other create_*_content_type.py scripts
1. pip install contentful-management python-dotenv
2. .env file with CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN,
   CONTENTFUL_ENVIRONMENT
3. Run: python create_service_slider_image_content_type.py
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

CONTENT_TYPE_ID = "serviceSliderImage"
CONTENT_TYPE_NAME = "Service Slider Image"

# Locked list -- matches your 4 Services sub-pages exactly.
SERVICE_VALUES = [
    "Weddings",
    "Corporate Events",
    "Commercial Shoots",
    "Collaborations",
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
            "id": "service",
            "name": "Service",
            "type": "Symbol",
            "required": True,
            "validations": [{"in": SERVICE_VALUES}],
        },
        {
            "id": "image",
            "name": "Image",
            "type": "Link",
            "linkType": "Asset",
            "required": True,
        },
        {
            "id": "alt",
            "name": "Alt Text",
            "type": "Symbol",
            "required": True,
        },
        {
            "id": "caption",
            "name": "Caption",
            "type": "Symbol",
            "required": False,
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
                "displayField": "alt",
                "fields": fields,
            },
        )
        content_type.publish()
        print("Created and published.")

    print("\nDone! Field summary:")
    for f in fields:
        req = "required" if f["required"] else "optional"
        print(f"  - {f['name']} ({f['id']}): {f['type']} [{req}]")

    print("\nLocked 'Service' values:")
    for s in SERVICE_VALUES:
        print(f"  - {s}")

    print(
        "\nNext: go to Contentful -> Content -> Add entry -> Service "
        "Slider Image, and create a few entries per service (pick the "
        "matching Service value for each photo). Set 'Order' to "
        "control sequence within that service's slider."
    )


if __name__ == "__main__":
    main()
