"""
Creates the "Page Hero" content type in Contentful -- one reusable
content type for every hero section across the site. The client
manages all hero images/text from one place in Contentful, and the
frontend uses a single <PageHero page="..." /> component reused on
every page that needs one.

About and Contact are intentionally NOT in the page list below,
since those two pages don't use a hero section.

SETUP: same as the other create_*_content_type.py scripts
1. pip install contentful-management python-dotenv
2. .env file with CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN,
   CONTENTFUL_ENVIRONMENT
3. Run: python create_page_hero_content_type.py
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

CONTENT_TYPE_ID = "pageHero"
CONTENT_TYPE_NAME = "Page Hero"

# Locked list -- matches your site's actual routes. About and Contact
# are deliberately excluded since they don't have hero sections.
PAGE_VALUES = [
    "Home",
    "Gallery",
    "Services",
    "Services - Weddings",
    "Services - Corporate Events",
    "Services - Commercial Shoots",
    "Services - Collaborations",
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
            "id": "page",
            "name": "Page",
            "type": "Symbol",
            "required": True,
            "validations": [{"in": PAGE_VALUES}],
        },
        {
            "id": "heading",
            "name": "Heading",
            "type": "Symbol",
            "required": True,
        },
        {
            "id": "subheading",
            "name": "Subheading",
            "type": "Text",
            "required": False,
        },
        {
            "id": "heroImage",
            "name": "Hero Image",
            "type": "Link",
            "linkType": "Asset",
            "required": True,
        },
        {
            "id": "mobileHeroImage",
            "name": "Mobile Hero Image",
            "type": "Link",
            "linkType": "Asset",
            "required": False,
        },
        {
            "id": "ctaText",
            "name": "CTA Text",
            "type": "Symbol",
            "required": False,
        },
        {
            "id": "ctaLink",
            "name": "CTA Link",
            "type": "Symbol",
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
                "displayField": "page",
                "fields": fields,
            },
        )
        content_type.publish()
        print("Created and published.")

    print("\nDone! Field summary:")
    for f in fields:
        req = "required" if f["required"] else "optional"
        print(f"  - {f['name']} ({f['id']}): {f['type']} [{req}]")

    print("\nLocked 'Page' values (client picks from this exact list):")
    for p in PAGE_VALUES:
        print(f"  - {p}")

    print(
        "\nNext: go to Contentful -> Content -> Add entry -> Page Hero, "
        "and create one entry per page listed above. About and Contact "
        "don't need entries since they have no hero section."
    )


if __name__ == "__main__":
    main()
