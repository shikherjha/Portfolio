import os


def main():
    service_role = (os.getenv("SERVICE_ROLE") or os.getenv("service_role") or "api").lower()

    if service_role == "cron":
        from refresh_stats import main as refresh_main

        refresh_main()
        return

    import uvicorn
    from main import app

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)


if __name__ == "__main__":
    main()
