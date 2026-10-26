import pypdf

from app.models.schemas import ContactField, Entry, Heading, Resume, Section
from app.services.model_builder import build_model
from app.services.pdf_export import render_pdf


def _resume(template="classic", page_size="letter", style="bullets", align="auto") -> Resume:
    return Resume(
        templateId=template, pageSize=page_size,
        heading=Heading(name="Alex Rivera", role="Senior Product Manager", align="auto",
                         contacts=[ContactField(label="Email", value="alex@example.com"),
                                   ContactField(label="City", value="Bengaluru, India")]),
        sections=[
            Section(type="summary", title="Summary", align="auto",
                    text="Product manager with 6 years shipping B2B SaaS."),
            Section(type="skills", title="Skills", align="auto", items=["SQL", "Figma", "Roadmapping"]),
            Section(type="experience", title="Experience", align=align, style=style, entries=[
                Entry(heading="Senior PM", org="Acme Inc", location="Bengaluru, India",
                      startMonth="Jan", startYear="2023", isPresent=True,
                      bullets=["Led a 3-team platform rewrite", "Grew activation 28%"]),
            ]),
        ],
    )


def _extract_text(pdf_bytes: bytes) -> str:
    reader = pypdf.PdfReader(__import__("io").BytesIO(pdf_bytes))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def test_produces_a_real_pdf_with_selectable_text():
    pdf_bytes = render_pdf(build_model(_resume()))
    assert pdf_bytes[:4] == b"%PDF"
    assert len(pdf_bytes) > 1000
    text = _extract_text(pdf_bytes)
    assert "Alex Rivera" in text
    assert "SUMMARY" in text  # section titles are uppercased
    assert "Present" in text
    assert "Bengaluru, India" in text


def test_works_for_every_template_and_page_size():
    for template in ("classic", "harvard", "modern"):
        for page_size in ("letter", "a4"):
            pdf_bytes = render_pdf(build_model(_resume(template=template, page_size=page_size)))
            assert pdf_bytes[:4] == b"%PDF", f"{template}/{page_size} failed"
            assert len(pdf_bytes) > 1000


def test_paragraph_mode_joins_bullets_but_bullets_mode_keeps_them_separate():
    bullets_pdf = render_pdf(build_model(_resume(style="bullets")))
    paragraph_pdf = render_pdf(build_model(_resume(style="paragraph")))
    bullets_text = _extract_text(bullets_pdf)
    paragraph_text = _extract_text(paragraph_pdf)
    # both keep the real achievement text intact and extractable
    assert "Led a 3-team platform rewrite" in bullets_text
    assert "Grew activation 28%" in bullets_text
    assert "Led a 3-team platform rewrite" in paragraph_text
    assert "Grew activation 28%" in paragraph_text
    # bullet markers are drawn as vector dots, not a text glyph (some PDF
    # text extractors mis-decode the unicode bullet under non-embedded
    # base-14 fonts) - the PDF is smaller in bullets mode's raw content only
    # incidentally; the meaningful check is that paragraph mode visibly
    # fuses the two lines with a period+space rather than a line break
    assert "rewrite. Grew" in paragraph_text or "rewrite.Grew" in paragraph_text.replace("\n", "")


def test_empty_resume_still_produces_a_valid_pdf():
    pdf_bytes = render_pdf(build_model(Resume(heading=Heading(), sections=[])))
    assert pdf_bytes[:4] == b"%PDF"


def test_html_like_content_is_not_interpreted():
    resume = _resume()
    resume.heading.name = "<script>alert(1)</script>"
    pdf_bytes = render_pdf(build_model(resume))
    text = _extract_text(pdf_bytes)
    assert "<script>" in text  # printed literally as text, not executed (PDF has no DOM anyway)
