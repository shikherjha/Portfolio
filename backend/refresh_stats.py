import argparse
import logging

from main import refresh_cache


def main():
    parser = argparse.ArgumentParser(description="Refresh cached competitive programming stats.")
    parser.add_argument(
        "--account-view",
        choices=["main", "alt", "combined", "all"],
        default="all",
        help="Stats view to refresh. Use all for cron.",
    )
    args = parser.parse_args()

    views = ["main", "alt", "combined"] if args.account_view == "all" else [args.account_view]
    for view in views:
        logging.info("Refreshing %s", view)
        refresh_cache(view)


if __name__ == "__main__":
    main()
