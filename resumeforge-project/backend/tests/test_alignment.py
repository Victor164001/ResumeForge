from app.services.alignment import resolve_align, use_split_row


def test_classic_auto_is_left_everywhere():
    assert resolve_align("auto", "header", "classic") == "left"
    assert resolve_align("auto", "title", "classic") == "left"
    assert resolve_align("auto", "body", "classic") == "left"


def test_harvard_auto_centers_header_and_title_but_not_body():
    assert resolve_align("auto", "header", "harvard") == "center"
    assert resolve_align("auto", "title", "harvard") == "center"
    assert resolve_align("auto", "body", "harvard") == "left"


def test_explicit_align_overrides_template_default():
    assert resolve_align("right", "header", "harvard") == "right"
    assert resolve_align("left", "title", "harvard") == "left"
    assert resolve_align("center", "body", "classic") == "center"


def test_justify_only_applies_to_body():
    assert resolve_align("justify", "body", "classic") == "justify"
    assert resolve_align("justify", "title", "classic") == "left"
    assert resolve_align("justify", "header", "classic") == "left"


def test_missing_or_empty_align_behaves_as_auto():
    assert resolve_align(None, "header", "harvard") == "center"
    assert resolve_align("", "body", "classic") == "left"


def test_unknown_template_falls_back_to_classic_defaults():
    assert resolve_align("auto", "header", "nope") == "left"


def test_split_row_only_for_left_or_justify():
    assert use_split_row("left") is True
    assert use_split_row("justify") is True
    assert use_split_row("center") is False
    assert use_split_row("right") is False
