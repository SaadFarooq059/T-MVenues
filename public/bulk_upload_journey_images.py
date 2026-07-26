"""
Bulk-uploads the 9 "Our Journey" home page photos into Contentful as
"Journey Image" entries, with title/alt/category/order pre-filled to
match the shot list you provided.

HOW TO USE:
1. Put your 9 image files in a folder called "Journey" next to this
   script (same folder as this .py file).
2. Your files can be named ANYTHING -- this script does NOT require
   exact filenames like "gallery-1.png". It sorts whatever image
   files it finds in the folder alphabetically, and matches them
   IN ORDER to the 9 pre-filled entries below (1st file -> "Ceremony
   Aisle", 2nd file -> "Place Setting", etc.).

   IMPORTANT: because matching is by position (not filename), make
   sure your files sort alphabetically in the order you want them to
   appear. Easiest way: rename them 1-xxx.jpg, 2-xxx.jpg, 3-xxx.jpg...
   so they sort correctly regardless of original filename. The script
   prints exactly which file it's matching to which entry before
   uploading, so you can double check (and Ctrl+C to cancel) if the
   order looks wrong.

3. Run: python bulk_upload_journey_images.py

Entries are created as DRAFTS so you (or your client) can review in
Contentful before publishing them to the live homepage.

SETUP: same .env as the other scripts (CONTENTFUL_SPACE_ID,
CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_ENVIRONMENT).
pip install contentful-management python-dotenv
"""

import os
import sys
import time
import mimetypes
from pathlib import Path
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

PHOTOS_FOLDER = Path("./Journey")
CONTENT_TYPE_ID = "journeyImage"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

# Pre-filled metadata from your shot list, in the intended display
# order. The Nth item here gets matched to the Nth image file found
# in the Journey folder (sorted alphabetically) -- see notes above.
JOURNEY_ITEMS = [
    {
        "title": "Ceremony Aisle",
        "alt": "Ceremony aisle lined with florals leading to a floral arch",
        "category": "Weddings",
        "span": "normal",
        "order": 1,
    },
    {
        "title": "Place Setting",
        "alt": "Elegant place setting with gold cutlery and a floral posy",
        "category": "Weddings",
        "span": "normal",
        "order": 2,
    },
    {
        "title": "Dance Floor Installation",
        "alt": "Ceiling silk drapery with hanging floral installation over a dance floor",
        "category": "Weddings",
        "span": "tall",
        "order": 3,
    },
    {
        "title": "Awards Dinner",
        "alt": "Awards dinner with uplit draping and tall centrepieces",
        "category": "Corporate",
        "span": "wide",
        "order": 4,
    },
    {
        "title": "Styled Vignette",
        "alt": "Vignette with draped fabric, vintage furniture and florals",
        "category": "Styled Shoots",
        "span": "normal",
        "order": 5,
    },
    {
        "title": "Marquee Wedding at Dusk",
        "alt": "Outdoor marquee wedding with draped ceiling and string lights at dusk",
        "category": "Weddings",
        "span": "wide",
        "order": 6,
    },
    {
        "title": "Candlelit Centrepiece",
        "alt": "Lush floral centrepiece with candlelight and gold accents",
        "category": "Weddings",
        "span": "normal",
        "order": 7,
    },
    {
        "title": "Product Launch Space",
        "alt": "Product launch space with dramatic fabric draping",
        "category": "Corporate",
        "span": "normal",
        "order": 8,
    },
    {
        "title": "Bridal Table Detail",
        "alt": "Bridal table detail with draped backdrop, glassware and soft florals",
        "category": "Styled Shoots",
        "span": "tall",
        "order": 9,
    },
]


def upload_asset(space, environment, file_path, title):
    content_type, _ = mimetypes.guess_type(str(file_path))
    if not content_type:
        content_type = "image/png"

    with open(file_path, "rb") as f:
        upload = space.uploads().create(f)

    asset = environment.assets().create(
        None,
        {
            "fields": {
                "title": {"en-US": title},
                "file": {
                    "en-US": {
                        "contentType": content_type,
                        "fileName": file_path.name,
                        "uploadFrom": {
                            "sys": {
                                "type": "Link",
                                "linkType": "Upload",
                                "id": upload.sys["id"],
                            }
                        },
                    }
                },
            }
        },
    )
    asset.process()

    # Contentful processes the uploaded file asynchronously. Poll until
    # the file's final "url" field actually shows up before publishing --
    # larger images can take a few seconds, and publishing too early
    # causes a 422 "Name: required" error on the file.url field.
    max_wait_seconds = 30
    poll_interval = 1
    waited = 0
    while waited < max_wait_seconds:
        asset.reload()
        file_field = asset.fields().get("file", {})
        if isinstance(file_field, dict) and file_field.get("url"):
            break
        time.sleep(poll_interval)
        waited += poll_interval
    else:
        raise TimeoutError(
            f"Contentful did not finish processing '{file_path.name}' "
            f"within {max_wait_seconds} seconds. Try running the script "
            f"again -- already-created entries won't be duplicated if you "
            f"remove their files from the Journey folder first."
        )

    asset.publish()
    return asset


def main():
    if not PHOTOS_FOLDER.exists():
        print(f"Folder not found: {PHOTOS_FOLDER.resolve()}")
        print(f"Create a folder called 'Journey' next to this script and add your photos.")
        sys.exit(1)

    image_files = sorted([
        p for p in PHOTOS_FOLDER.iterdir()
        if p.suffix.lower() in IMAGE_EXTENSIONS
    ])

    if not image_files:
        print(f"No image files found in {PHOTOS_FOLDER.resolve()}")
        sys.exit(1)

    if len(image_files) != len(JOURNEY_ITEMS):
        print(
            f"WARNING: found {len(image_files)} image file(s) in the Journey "
            f"folder, but there are {len(JOURNEY_ITEMS)} pre-filled entries. "
            f"Extra files will be ignored; missing ones will be skipped."
        )

    pairs = list(zip(JOURNEY_ITEMS, image_files))

    print("\nHere's the order this script will use -- check this looks right:")
    print("-" * 60)
    for item, file_path in pairs:
        print(f"  {item['order']}. {file_path.name}  ->  \"{item['title']}\" ({item['category']})")
    print("-" * 60)
    confirm = input("\nDoes this order look correct? Type 'yes' to continue: ").strip().lower()
    if confirm != "yes":
        print("Cancelled. Rename/reorder your files (e.g. 1-xxx.jpg, 2-xxx.jpg...) and re-run.")
        sys.exit(0)

    client = contentful_management.Client(MANAGEMENT_TOKEN)
    space = client.spaces().find(SPACE_ID)
    environment = space.environments().find(ENVIRONMENT_ID)

    print(f"\nConnected to space '{space.name}' (environment: {ENVIRONMENT_ID})\n")

    created_count = 0
    skipped_count = 0

    for item, file_path in pairs:
        print(f"Processing '{item['title']}' ({item['category']})...")
        print(f"    uploading {file_path.name}...")
        asset = upload_asset(space, environment, file_path, item["title"])

        entry = environment.entries().create(
            None,
            {
                "content_type_id": CONTENT_TYPE_ID,
                "fields": {
                    "title": {"en-US": item["title"]},
                    "alt": {"en-US": item["alt"]},
                    "category": {"en-US": item["category"]},
                    "span": {"en-US": item["span"]},
                    "order": {"en-US": item["order"]},
                    "image": {
                        "en-US": {
                            "sys": {
                                "type": "Link",
                                "linkType": "Asset",
                                "id": asset.sys["id"],
                            }
                        }
                    },
                },
            },
        )
        # Left unpublished intentionally -- review before going live.
        print(f"    created draft entry (not published)\n")
        created_count += 1

    print("=" * 50)
    print(f"Done. Created {created_count} draft entr(y/ies), skipped {skipped_count}.")
    print("Go to Contentful -> Content -> filter by Draft to review and publish.")


if __name__ == "__main__":
    main()
