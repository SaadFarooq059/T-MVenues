"""
Creates the "Gallery Colour Image" content type in Contentful -- a
curated set of gallery photos tagged by colour, for a new inspiration
section within the existing Gallery page (per client's confirmed
answer: part of the existing gallery, colours only for now, curated
set for inspiration rather than every photo, multiple tags allowed
per photo, client will manage tagging themselves going forward).

The "colours" field is an Array of Symbol with validation ON THE
ITEMS -- this makes Contentful render it as a checkbox/multi-select
list in the entry editor, so tagging a photo is just ticking boxes.
No free text, no risk of typos creating a new untracked colour.

SETUP: same as the other create_*_content_type.py scripts
1. pip install contentful-management python-dotenv
2. .env file with CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN,
   CONTENTFUL_ENVIRONMENT
3. Run: python create_gallery_colour_image_content_type.py
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

CONTENT_TYPE_ID = "galleryColourImage"
CONTENT_TYPE_NAME = "Gallery Colour Image"

# Locked list -- client's confirmed colour categories. Style tags
# (centrepiece/chair/aisle/signage/backdrops/tablescapes) intentionally
# left out for now per their message -- add later as a second Array
# field (e.g. "styleTags") once corporate/styled-shoot volume grows.
COLOUR_VALUES = [
    "Blues",
    "Greens",
    "Pink/Blush",
    "Ivory",
    "Neutrals",
    "Rustic",
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
            "id": "colours",
            "name": "Colours",
            "type": "Array",
            "required": True,
            "items": {
                "type": "Symbol",
                "validations": [{"in": COLOUR_VALUES}],
            },
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

    print("\nLocked 'Colours' checkbox values (multi-select, tick any that apply):")
    for c in COLOUR_VALUES:
        print(f"  - {c}")

    print(
        "\nNext: go to Contentful -> Content -> Add entry -> "
        "Gallery Colour Image, and add a curated set of photos. Tick "
        "as many colour boxes as apply to each photo. This is separate "
        "from the main event-based Gallery Event entries -- it's a "
        "smaller, hand-picked inspiration set."
    )
    print(
        "\nNote: there is an older, unused 'galleryImage' content type "
        "still sitting in this space from an earlier attempt (title, "
        "image, alt, category, span). It's not used by any code. "
        "Recommend deleting it in Contentful to avoid confusing the "
        "client with two similar-looking gallery types."
    )


if __name__ == "__main__":
    main()
