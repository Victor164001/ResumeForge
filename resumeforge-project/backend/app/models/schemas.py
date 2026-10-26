"""
Pydantic schemas for the resume data model.

These mirror the JS data model in the frontend's RF core (see
core_block.js: defaultState / defaultSection / emptyEntry) field-for-field,
so a resume built in the browser round-trips through this API without any
translation layer, and the same resume can be rendered identically by
either the client-side exporter or this backend's PDF/DOCX services.
"""
from __future__ import annotations

from enum import Enum
from typing import List, Optional
from uuid import uuid4

from pydantic import BaseModel, Field


def new_id() -> str:
    return uuid4().hex[:8]


class TemplateId(str, Enum):
    classic = "classic"
    harvard = "harvard"
    modern = "modern"


class PageSize(str, Enum):
    letter = "letter"
    a4 = "a4"


class Align(str, Enum):
    auto = "auto"
    left = "left"
    center = "center"
    right = "right"
    justify = "justify"


class SectionType(str, Enum):
    summary = "summary"
    skills = "skills"
    experience = "experience"
    projects = "projects"
    education = "education"
    certifications = "certifications"
    custom = "custom"


class EntryStyle(str, Enum):
    bullets = "bullets"
    paragraph = "paragraph"


class ContactField(BaseModel):
    id: str = Field(default_factory=new_id)
    label: str = "Email"
    value: str = ""
    custom: bool = False


class Heading(BaseModel):
    name: str = ""
    role: str = ""
    align: Align = Align.auto
    contacts: List[ContactField] = Field(default_factory=list)

    model_config = {"validate_assignment": True}


class Entry(BaseModel):
    id: str = Field(default_factory=new_id)
    heading: str = ""
    org: str = ""
    location: str = ""
    start_month: str = Field("", alias="startMonth")
    start_year: str = Field("", alias="startYear")
    end_month: str = Field("", alias="endMonth")
    end_year: str = Field("", alias="endYear")
    is_present: bool = Field(False, alias="isPresent")
    bullets: List[str] = Field(default_factory=list)

    model_config = {"populate_by_name": True, "validate_assignment": True}


class Section(BaseModel):
    id: str = Field(default_factory=new_id)
    type: SectionType
    title: str = ""
    align: Align = Align.auto
    # summary
    text: Optional[str] = None
    # skills
    items: Optional[List[str]] = None
    # experience / projects / education / certifications / custom
    style: Optional[EntryStyle] = None
    entries: Optional[List[Entry]] = None

    model_config = {"validate_assignment": True}


class Resume(BaseModel):
    version: int = 3
    template_id: TemplateId = Field(TemplateId.classic, alias="templateId")
    accent: str = "#B23A2F"
    page_size: PageSize = Field(PageSize.letter, alias="pageSize")
    heading: Heading = Field(default_factory=Heading)
    sections: List[Section] = Field(default_factory=list)

    model_config = {"populate_by_name": True, "validate_assignment": True}


class ResumeOut(Resume):
    id: str


class ResumeCreate(Resume):
    pass
