from datetime import date

from app.services.dates import (
    format_date_range,
    format_one_date,
    join_as_paragraph,
    parse_legacy_date,
    year_options,
)


def test_month_and_year():
    e = {"startMonth": "Jan", "startYear": "2023", "endMonth": "Jun", "endYear": "2024"}
    assert format_date_range(e) == "Jan 2023 \u2013 Jun 2024"


def test_present_overrides_end_date():
    e = {"startMonth": "Jan", "startYear": "2023", "endMonth": "Jun", "endYear": "2024", "isPresent": True}
    assert format_date_range(e) == "Jan 2023 \u2013 Present"


def test_year_only():
    assert format_date_range({"startYear": "2019", "endYear": "2023"}) == "2019 \u2013 2023"


def test_start_only():
    assert format_date_range({"startMonth": "Mar", "startYear": "2021"}) == "Mar 2021"


def test_end_only():
    assert format_date_range({"endYear": "2025"}) == "2025"


def test_empty_is_empty_string():
    assert format_date_range({}) == ""


def test_present_with_no_start():
    assert format_date_range({"isPresent": True}) == "Present"


def test_month_with_no_year_not_dropped():
    assert format_one_date("Jan", "") == "Jan"


def test_year_options_cover_future_and_past():
    ys = year_options()
    now = date.today().year
    assert ys[0] == str(now + 6)
    assert ys[-1] == "1970"
    assert str(now) in ys


def test_parse_legacy_jan_2023():
    assert parse_legacy_date("Jan 2023") == {"month": "Jan", "year": "2023", "present": False}


def test_parse_legacy_full_month_name():
    assert parse_legacy_date("January 2023") == {"month": "Jan", "year": "2023", "present": False}


def test_parse_legacy_bare_year():
    assert parse_legacy_date("2019") == {"month": "", "year": "2019", "present": False}


def test_parse_legacy_present_variants():
    assert parse_legacy_date("Present")["present"] is True
    assert parse_legacy_date("current")["present"] is True


def test_join_as_paragraph_adds_sentence_punctuation():
    assert join_as_paragraph(["led the team", "cut costs by 20%"]) == "led the team. cut costs by 20%."


def test_join_as_paragraph_respects_existing_punctuation_and_drops_blanks():
    assert join_as_paragraph(["Shipped the feature!", "  ", "Grew revenue?"]) == "Shipped the feature! Grew revenue?"
    assert join_as_paragraph([]) == ""
    assert join_as_paragraph(None) == ""
