import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app import db
from app.main import app as real_app


@pytest.fixture()
def client():
    """A TestClient bound to an isolated in-memory SQLite database via
    FastAPI's dependency_overrides - the standard way to isolate DB-backed
    tests. Each test gets a brand new, empty database; nothing persists
    between tests and the real resumeforge.db file is never touched.

    StaticPool is required for in-memory SQLite here: without it, each new
    connection FastAPI's threadpool opens would see its own empty database
    instead of sharing the one we just created tables in.
    """
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    def test_get_session():
        s = session_local()
        try:
            yield s
        finally:
            s.close()

    db.init_db(bind_engine=engine)
    real_app.dependency_overrides[db.get_session] = test_get_session

    from fastapi.testclient import TestClient
    with TestClient(real_app) as c:
        yield c

    real_app.dependency_overrides.clear()
    engine.dispose()
