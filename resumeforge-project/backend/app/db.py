"""
Persistence layer.

SQLite via SQLAlchemy - zero external services to run this backend, but a
real database (not an in-memory dict) so resumes survive a restart. The
resume itself is stored as JSON in a single column: the schema of a resume
is owned by app/models/schemas.py (Pydantic), not by the SQL table, so
changing the resume shape never requires a migration here.
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Column, DateTime, String, Text, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

Base = declarative_base()


class ResumeRow(Base):
    __tablename__ = "resumes"
    id = Column(String(32), primary_key=True, index=True)
    data = Column(Text, nullable=False)  # JSON-serialized Resume
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc),
                         onupdate=lambda: datetime.now(timezone.utc))


def make_session_factory(database_url: str):
    """Builds an isolated engine + sessionmaker + get_session dependency for
    a given database URL. Used directly by the app for its real database,
    and by tests to bind an independent in-memory database per test via
    FastAPI's dependency_overrides - the standard, robust way to isolate
    DB-backed tests, instead of reimporting modules."""
    engine = create_engine(database_url, connect_args={"check_same_thread": False})
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    def get_session():
        s = session_local()
        try:
            yield s
        finally:
            s.close()

    return engine, session_local, get_session


DATABASE_URL = os.environ.get("RESUMEFORGE_DATABASE_URL") or (
    "sqlite:///" + os.environ.get("RESUMEFORGE_DB_PATH", "./resumeforge.db")
)
engine, SessionLocal, get_session = make_session_factory(DATABASE_URL)


def init_db(bind_engine=None):
    Base.metadata.create_all(bind=bind_engine or engine)


def create_resume(db: Session, resume_id: str, data: dict) -> ResumeRow:
    row = ResumeRow(id=resume_id, data=json.dumps(data))
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def get_resume(db: Session, resume_id: str) -> Optional[ResumeRow]:
    return db.query(ResumeRow).filter(ResumeRow.id == resume_id).first()


def update_resume(db: Session, resume_id: str, data: dict) -> Optional[ResumeRow]:
    row = get_resume(db, resume_id)
    if not row:
        return None
    row.data = json.dumps(data)
    db.commit()
    db.refresh(row)
    return row


def delete_resume(db: Session, resume_id: str) -> bool:
    row = get_resume(db, resume_id)
    if not row:
        return False
    db.delete(row)
    db.commit()
    return True


def list_resumes(db: Session, limit: int = 50, offset: int = 0):
    return (db.query(ResumeRow)
            .order_by(ResumeRow.updated_at.desc())
            .offset(offset).limit(limit).all())
