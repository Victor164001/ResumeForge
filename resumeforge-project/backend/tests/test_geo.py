from app.services import geo


def test_dataset_loaded():
    assert len(geo.get_countries()) > 40
    assert len(geo.get_index()) > 500


def test_exact_prefix_ranks_first():
    assert geo.search_locations("mumb", "__all__", 5)[0].city == "Mumbai"


def test_alias_bangalore_resolves_to_bengaluru():
    r = [x.city for x in geo.search_locations("bangalore", "__all__", 5)]
    assert "Bengaluru" in r
    assert r[0] == "Bengaluru"


def test_alias_short_form_blr():
    r = [x.city for x in geo.search_locations("blr", "__all__", 5)]
    assert r[0] == "Bengaluru"


def test_former_names_resolve():
    assert geo.search_locations("bombay", "__all__", 1)[0].city == "Mumbai"
    assert geo.search_locations("gurgaon", "__all__", 1)[0].city == "Gurugram"
    assert geo.search_locations("vizag", "__all__", 1)[0].city == "Visakhapatnam"
    assert geo.search_locations("trichy", "__all__", 1)[0].city == "Tiruchirappalli"
    assert geo.search_locations("cochin", "__all__", 1)[0].city == "Kochi"
    assert geo.search_locations("nyc", "__all__", 1)[0].city == "New York"
    assert geo.search_locations("sfo", "__all__", 1)[0].city == "San Francisco"


def test_country_filter_restricts_results():
    r = geo.search_locations("san", "United States", 20)
    assert len(r) > 0
    assert all(x.country == "United States" for x in r)


def test_filter_plus_empty_query_lists_that_countrys_cities():
    r = geo.search_locations("", "India", 500)
    assert len(r) > 50
    assert all(x.country == "India" for x in r)


def test_no_match_returns_empty_never_throws():
    assert geo.search_locations("zzzqqxx", "__all__", 5) == []


def test_label_formatting():
    assert geo.search_locations("mumb", "__all__", 1)[0].label == "Mumbai, India"
    remote = next(x for x in geo.get_index() if x.country == "Remote" and x.city == "Remote")
    assert remote.label == "Remote"


def test_country_name_search_works():
    r = geo.search_locations("netherl", "__all__", 5)
    assert any(x.country == "Netherlands" for x in r)


def test_search_countries_prefix_ranks_first():
    assert geo.search_countries("ind")[0].name == "India"
    assert geo.search_countries("unit")[0].name in ("United States", "United Kingdom", "United Arab Emirates")
    assert len(geo.search_countries("")) == len(geo.get_countries())


def test_no_duplicate_city_country_pairs():
    seen = set()
    dupes = []
    for r in geo.get_index():
        if r.label in seen:
            dupes.append(r.label)
        seen.add(r.label)
    assert dupes == []
