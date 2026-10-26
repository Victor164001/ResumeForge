from app.models.schemas import ContactField, Entry, Heading, Resume, Section
from app.services.model_builder import build_model


def _sample_resume(**overrides) -> Resume:
    base = dict(
        templateId="classic",
        heading=Heading(
            name="Alex Rivera", role="Senior Product Manager", align="auto",
            contacts=[
                ContactField(label="Email", value="alex@example.com"),
                ContactField(label="Phone", value=""),  # blank - should be filtered
            ],
        ),
        sections=[
            Section(type="summary", title="Summary", align="auto", text="Product manager with 6 years experience."),
            Section(type="skills", title="Skills", align="auto", items=["SQL", "Figma", ""]),
            Section(type="experience", title="Experience", align="auto", style="bullets", entries=[
                Entry(heading="Senior PM", org="Acme", location="Remote", startMonth="Jan", startYear="2023",
                      isPresent=True, bullets=["Shipped the redesign", "  ", "Grew activation 28%"])
            ]),
        ],
    )
    base.update(overrides)
    return Resume(**base)


def test_default_style_and_basic_fields():
    m = build_model(_sample_resume())
    assert m["header"]["name"] == "Alex Rivera"
    assert m["header"]["contacts"] == ["alex@example.com"]  # blank phone dropped
    assert len(m["sections"]) == 3
    assert m["sections"][1]["items"] == ["SQL", "Figma"]  # blank skill dropped


def test_harvard_centers_header_and_titles_but_not_body():
    m = build_model(_sample_resume(templateId="harvard"))
    assert m["header"]["align"] == "center"
    exp = next(s for s in m["sections"] if s["type"] == "experience")
    assert exp["title_align"] == "center"
    assert exp["body_align"] == "left"
    assert exp["split"] is True


def test_centered_body_disables_split_row():
    resume = _sample_resume()
    resume.sections[2].align = "center"
    m = build_model(resume)
    exp = next(s for s in m["sections"] if s["type"] == "experience")
    assert exp["body_align"] == "center"
    assert exp["split"] is False


def test_justify_on_summary_keeps_title_left():
    resume = _sample_resume()
    resume.sections[0].align = "justify"
    m = build_model(resume)
    summary = next(s for s in m["sections"] if s["type"] == "summary")
    assert summary["body_align"] == "justify"
    assert summary["title_align"] == "left"


def test_empty_sections_are_dropped():
    resume = _sample_resume()
    resume.sections[0].text = "   "
    resume.sections[1].items = []
    m = build_model(resume)
    types = [s["type"] for s in m["sections"]]
    assert "summary" not in types
    assert "skills" not in types


def test_untitled_section_is_dropped():
    resume = _sample_resume()
    resume.sections[2].title = ""
    m = build_model(resume)
    assert "experience" not in [s["type"] for s in m["sections"]]


def test_blank_bullets_filtered_and_dates_computed():
    m = build_model(_sample_resume())
    exp = next(s for s in m["sections"] if s["type"] == "experience")
    entry = exp["entries"][0]
    assert entry["bullets"] == ["Shipped the redesign", "Grew activation 28%"]
    assert entry["dates"] == "Jan 2023 \u2013 Present"


def test_style_defaults_to_bullets_when_missing():
    resume = _sample_resume()
    resume.sections[2].style = None
    m = build_model(resume)
    exp = next(s for s in m["sections"] if s["type"] == "experience")
    assert exp["style"] == "bullets"


def test_paragraph_style_carries_through():
    resume = _sample_resume()
    resume.sections[2].style = "paragraph"
    m = build_model(resume)
    exp = next(s for s in m["sections"] if s["type"] == "experience")
    assert exp["style"] == "paragraph"


def test_empty_resume_does_not_crash():
    m = build_model(Resume(heading=Heading(), sections=[]))
    assert m["sections"] == []
    assert m["header"]["contacts"] == []
