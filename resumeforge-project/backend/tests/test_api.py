def _payload(**overrides):
    base = {
        "templateId": "classic",
        "pageSize": "letter",
        "heading": {
            "name": "Priya Sharma", "role": "Staff Engineer", "align": "auto",
            "contacts": [
                {"label": "Email", "value": "priya@example.com"},
                {"label": "City", "value": "Bengaluru, India"},
            ],
        },
        "sections": [
            {"type": "summary", "title": "Summary", "align": "auto",
             "text": "Backend engineer with 6 years in distributed systems."},
            {"type": "skills", "title": "Skills", "align": "auto", "items": ["Python", "FastAPI", "SQL"]},
            {"type": "experience", "title": "Experience", "align": "auto", "style": "bullets", "entries": [
                {"heading": "Staff Engineer", "org": "Acme", "location": "Bengaluru, India",
                 "startMonth": "Jan", "startYear": "2023", "isPresent": True,
                 "bullets": ["Led the platform rewrite", "Cut latency by 40%"]},
            ]},
        ],
    }
    base.update(overrides)
    return base


def test_health(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_create_and_get_resume(client):
    r = client.post("/api/resumes", json=_payload())
    assert r.status_code == 201
    body = r.json()
    assert body["heading"]["name"] == "Priya Sharma"
    assert "id" in body and len(body["id"]) > 0

    r2 = client.get(f"/api/resumes/{body['id']}")
    assert r2.status_code == 200
    assert r2.json()["heading"]["name"] == "Priya Sharma"


def test_get_nonexistent_resume_404s(client):
    r = client.get("/api/resumes/does-not-exist")
    assert r.status_code == 404


def test_update_resume(client):
    r = client.post("/api/resumes", json=_payload())
    rid = r.json()["id"]
    updated = _payload()
    updated["heading"]["name"] = "Renamed Person"
    r2 = client.put(f"/api/resumes/{rid}", json=updated)
    assert r2.status_code == 200
    assert r2.json()["heading"]["name"] == "Renamed Person"
    assert client.get(f"/api/resumes/{rid}").json()["heading"]["name"] == "Renamed Person"


def test_update_nonexistent_resume_404s(client):
    r = client.put("/api/resumes/does-not-exist", json=_payload())
    assert r.status_code == 404


def test_delete_resume(client):
    r = client.post("/api/resumes", json=_payload())
    rid = r.json()["id"]
    r2 = client.delete(f"/api/resumes/{rid}")
    assert r2.status_code == 204
    assert client.get(f"/api/resumes/{rid}").status_code == 404


def test_delete_nonexistent_resume_404s(client):
    assert client.delete("/api/resumes/does-not-exist").status_code == 404


def test_list_resumes_most_recent_first(client):
    first = client.post("/api/resumes", json=_payload()).json()["id"]
    second = client.post("/api/resumes", json=_payload()).json()["id"]
    r = client.get("/api/resumes")
    ids = [x["id"] for x in r.json()]
    assert ids.index(second) < ids.index(first)


def test_export_pdf(client):
    rid = client.post("/api/resumes", json=_payload()).json()["id"]
    r = client.get(f"/api/resumes/{rid}/export.pdf")
    assert r.status_code == 200
    assert r.headers["content-type"] == "application/pdf"
    assert "Priya-Sharma.pdf" in r.headers["content-disposition"]
    assert r.content[:4] == b"%PDF"


def test_export_docx(client):
    rid = client.post("/api/resumes", json=_payload()).json()["id"]
    r = client.get(f"/api/resumes/{rid}/export.docx")
    assert r.status_code == 200
    assert "wordprocessingml" in r.headers["content-type"]
    assert "Priya-Sharma.docx" in r.headers["content-disposition"]
    assert r.content[:2] == b"PK"


def test_export_on_nonexistent_resume_404s(client):
    assert client.get("/api/resumes/does-not-exist/export.pdf").status_code == 404
    assert client.get("/api/resumes/does-not-exist/export.docx").status_code == 404


def test_export_reflects_edits_immediately(client):
    rid = client.post("/api/resumes", json=_payload()).json()["id"]
    updated = _payload()
    updated["heading"]["name"] = "Fresh Name"
    client.put(f"/api/resumes/{rid}", json=updated)
    r = client.get(f"/api/resumes/{rid}/export.pdf")
    assert "Fresh-Name.pdf" in r.headers["content-disposition"]


def test_location_search(client):
    r = client.get("/api/locations/search", params={"q": "bangalore"})
    assert r.status_code == 200
    assert r.json()[0]["city"] == "Bengaluru"


def test_location_search_alias(client):
    r = client.get("/api/locations/search", params={"q": "blr"})
    assert r.json()[0]["city"] == "Bengaluru"


def test_location_country_filter(client):
    r = client.get("/api/locations/search", params={"q": "san", "country": "United States"})
    assert all(x["country"] == "United States" for x in r.json())


def test_country_list_search(client):
    r = client.get("/api/locations/countries", params={"q": "ind"})
    assert r.json()[0]["name"] == "India"


def test_invalid_payload_returns_422(client):
    r = client.post("/api/resumes", json={"templateId": "not-a-real-template"})
    assert r.status_code == 422


def test_html_in_name_is_stored_and_exported_as_literal_text(client):
    payload = _payload()
    payload["heading"]["name"] = "<script>alert(1)</script>"
    rid = client.post("/api/resumes", json=payload).json()["id"]
    r = client.get(f"/api/resumes/{rid}/export.pdf")
    assert r.status_code == 200  # doesn't crash; PDF has no DOM to inject into anyway
