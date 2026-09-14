"""
Creates the "Testimonial" content type in Contentful -- lets the
client add, edit, and reorder client testimonials directly, without
a developer. Separate from Google Reviews (pulled live via a widget)
-- these are hand-picked/manually entered by the client.

SETUP: same as the other create_*_content_type.py scripts
1. pip install contentful-management python-dotenv
2. .env file with CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN,
   CONTENTFUL_ENVIRONMENT
3. Run: python create_testimonial_content_type.py
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

CONTENT_TYPE_ID = "testimonial"
CONTENT_TYPE_NAME = "Testimonial"

EVENT_TYPE_VALUES = [
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
        {"id": "clientName", "name": "Client Name", "type": "Symbol", "required": True},
        {
            "id": "eventType",
            "name": "Event Type",
            "type": "Symbol",
            "required": True,
            "validations": [{"in": EVENT_TYPE_VALUES}],
        },
        {"id": "quote", "name": "Quote", "type": "Text", "required": True},
        {
            "id": "rating",
            "name": "Rating",
            "type": "Integer",
            "required": False,
            "validations": [{"range": {"min": 1, "max": 5}}],
        },
        {
            "id": "clientPhoto",
            "name": "Client Photo",
            "type": "Link",
            "linkType": "Asset",
            "required": False,
        },
        {"id": "order", "name": "Order", "type": "Integer", "required": False},
        {"id": "featured", "name": "Featured", "type": "Boolean", "required": False},
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
                "displayField": "clientName",
                "fields": fields,
            },
        )
        content_type.publish()
        print("Created and published.")

    print("\nDone! Field summary:")
    for f in fields:
        req = "required" if f["required"] else "optional"
        print(f"  - {f['name']} ({f['id']}): {f['type']} [{req}]")

    print("\nLocked 'Event Type' values:")
    for v in EVENT_TYPE_VALUES:
        print(f"  - {v}")

    print(
        "\nNext: go to Contentful -> Content -> Add entry -> Testimonial, "
        "and add each client testimonial. Toggle 'Featured' on for the "
        "ones that should show on the homepage."
    )


if __name__ == "__main__":
    main()
