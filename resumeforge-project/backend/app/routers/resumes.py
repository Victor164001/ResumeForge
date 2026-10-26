"""
Resume CRUD + export endpoints.
"""
from __future__ import annotations

import json

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from app import db
from app.models.schemas import Resume, ResumeOut, new_id
from app.services.docx_export import render_docx
from app.services.model_builder import build_model
from app.services.pdf_export import render_pdf

router = APIRouter(prefix="/api/resumes", tags=["resumes"])


def _row_to_out(row: db.ResumeRow) -> ResumeOut:
    payload = json.loads(row.data)
    payload["id"] = row.id
    return ResumeOut.model_validate(payload)


@router.post("", response_model=ResumeOut, status_code=201)
def create_resume(resume: Resume, session: Session = Depends(db.get_session)):
    resume_id = new_id()
    row = db.create_resume(session, resume_id, json.loads(resume.model_dump_json(by_alias=True)))
    return _row_to_out(row)


@router.get("/{resume_id}", response_model=ResumeOut)
def get_resume(resume_id: str, session: Session = Depends(db.get_session)):
    row = db.get_resume(session, resume_id)
    if not row:
        raise HTTPException(404, "Resume not found")
    return _row_to_out(row)


@router.put("/{resume_id}", response_model=ResumeOut)
def update_resume(resume_id: str, resume: Resume, session: Session = Depends(db.get_session)):
    row = db.update_resume(session, resume_id, json.loads(resume.model_dump_json(by_alias=True)))
    if not row:
        raise HTTPException(404, "Resume not found")
    return _row_to_out(row)


@router.delete("/{resume_id}", status_code=204)
def delete_resume(resume_id: str, session: Session = Depends(db.get_session)):
    if not db.delete_resume(session, resume_id):
        raise HTTPException(404, "Resume not found")
    return Response(status_code=204)


@router.get("", response_model=list[ResumeOut])
def list_resumes(limit: int = 50, offset: int = 0, session: Session = Depends(db.get_session)):
    return [_row_to_out(r) for r in db.list_resumes(session, limit, offset)]


def _load_resume_or_404(resume_id: str, session: Session) -> Resume:
    row = db.get_resume(session, resume_id)
    if not row:
        raise HTTPException(404, "Resume not found")
    return Resume.model_validate(json.loads(row.data))


@router.get("/{resume_id}/export.pdf")
def export_pdf(resume_id: str, session: Session = Depends(db.get_session)):
    resume = _load_resume_or_404(resume_id, session)
    model = build_model(resume)
    pdf_bytes = render_pdf(model)
    filename = (model["header"]["name"] or "resume").replace(" ", "-") + ".pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/{resume_id}/export.docx")
def export_docx(resume_id: str, session: Session = Depends(db.get_session)):
    resume = _load_resume_or_404(resume_id, session)
    model = build_model(resume)
    docx_bytes = render_docx(model)
    filename = (model["header"]["name"] or "resume").replace(" ", "-") + ".docx"
    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
