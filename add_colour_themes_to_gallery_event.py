"""
Adds a "Colour Themes" field to the EXISTING "galleryEvent" content
type -- does NOT create a new content type, and does NOT touch any
existing fields (title, category, coverImage, photos, eventDate,
description all stay exactly as they are).

This version talks to Contentful's REST API directly with `requests`
instead of the contentful_management Python library, because that
library's update()/save() path is broken for this exact operation
(it internally tries to call .to_json() on plain dicts and crashes
regardless of whether you assign dicts or objects to .fields).
Direct REST calls sidestep the issue entirely.

SETUP:
1. pip install requests python-dotenv
2. .env (or .env.local) with CONTENTFUL_SPACE_ID,
   CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_ENVIRONMENT
3. Run: python add_colour_themes_to_gallery_event.py
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

if Path(".env").exists():
    load_dotenv(".env")
elif Path(".env.local").exists():
    load_dotenv(".env.local")
else:
    load_dotenv()

try:
    import requests
except ImportError:
    print("Missing dependency. Run: pip install requests python-dotenv")
    sys.exit(1)

SPACE_ID = os.environ.get("CONTENTFUL_SPACE_ID")
MANAGEMENT_TOKEN = os.environ.get("CONTENTFUL_MANAGEMENT_TOKEN")
ENVIRONMENT_ID = os.environ.get("CONTENTFUL_ENVIRONMENT", "master")

if not SPACE_ID or not MANAGEMENT_TOKEN:
    print("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in your .env file.")
    sys.exit(1)

CONTENT_TYPE_ID = "galleryEvent"
BASE_URL = f"https://api.contentful.com/spaces/{SPACE_ID}/environments/{ENVIRONMENT_ID}/content_types/{CONTENT_TYPE_ID}"
HEADERS = {
    "Authorization": f"Bearer {MANAGEMENT_TOKEN}",
    "Content-Type": "application/vnd.contentful.management.v1+json",
}

COLOUR_VALUES = [
    "Blues",
    "Greens",
    "Pink/Blush",
    "Ivory",
    "Neutrals",
    "Rustic",
]

NEW_FIELD = {
    "id": "colourThemes",
    "name": "Colour Themes",
    "type": "Array",
    "required": False,
    "localized": False,
    "disabled": False,
    "omitted": False,
    "items": {
        "type": "Symbol",
        "validations": [{"in": COLOUR_VALUES}],
    },
}


def main():
    resp = requests.get(BASE_URL, headers=HEADERS)
    if resp.status_code != 200:
        print(f"ERROR fetching content type: {resp.status_code} {resp.text}")
        sys.exit(1)

    content_type = resp.json()
    space_name_resp = requests.get(
        f"https://api.contentful.com/spaces/{SPACE_ID}", headers=HEADERS
    )
    space_name = space_name_resp.json().get("name", SPACE_ID) if space_name_resp.status_code == 200 else SPACE_ID
    print(f"Connected to space '{space_name}' (environment: {ENVIRONMENT_ID})")

    current_version = content_type["sys"]["version"]
    fields = content_type.get("fields", [])
    field_ids = [f["id"] for f in fields]

    if "colourThemes" in field_ids:
        print("Field 'colourThemes' already exists. Updating its allowed values...")
        for f in fields:
            if f["id"] == "colourThemes":
                f["items"] = NEW_FIELD["items"]
    else:
        print("Adding new 'colourThemes' field to galleryEvent...")
        fields.append(NEW_FIELD)

    update_headers = dict(HEADERS)
    update_headers["X-Contentful-Version"] = str(current_version)

    update_payload = {
        "name": content_type["name"],
        "description": content_type.get("description", ""),
        "displayField": content_type.get("displayField"),
        "fields": fields,
    }

    put_resp = requests.put(BASE_URL, headers=update_headers, json=update_payload)
    if put_resp.status_code not in (200, 201):
        print(f"ERROR updating content type: {put_resp.status_code} {put_resp.text}")
        sys.exit(1)

    updated_version = put_resp.json()["sys"]["version"]
    print("Content type updated successfully.")

    publish_headers = dict(HEADERS)
    publish_headers["X-Contentful-Version"] = str(updated_version)
    del publish_headers["Content-Type"]

    publish_resp = requests.put(f"{BASE_URL}/published", headers=publish_headers)
    if publish_resp.status_code not in (200, 201):
        print(f"ERROR publishing content type: {publish_resp.status_code} {publish_resp.text}")
        sys.exit(1)

    print("Published successfully.\n")
    print("galleryEvent now has a 'Colour Themes' field:")
    print("  - Colour Themes (colourThemes): Array of Symbol [optional]")
    print("  Checkbox values:")
    for c in COLOUR_VALUES:
        print(f"    - {c}")

    print(
        "\nNext steps:\n"
        "1. Open each existing Gallery Event entry (e.g. 'Emily Josha "
        "Wedding') and tick the colour(s) that fit that wedding's theme.\n"
        "2. Publish each updated entry.\n"
        "3. Hand Cursor the prompt to switch the 'Browse by Colour' "
        "section to use these event cards + colourThemes instead of "
        "the flat galleryColourImage photos.\n"
        "4. Once confirmed working, delete the now-unused "
        "'galleryColourImage' content type and its entries."
    )


if __name__ == "__main__":
    main()
