import pytest # type: ignore
from flask import Flask, json # type: ignore
import sys
sys.path.append('..')
from main import main as flask_app

# Test client for sending requests to the app
@pytest.fixture
def client():
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client

# GET request to the '/get_ids' route
# Assert that the 'idlist' key is present in the data
def test_get_ids(client):
    response = client.get('/get_ids')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'idlist' in data
    print(data)

# POST request to the '/get_details' route, with the test ID in the JSON body
# Assert that the 'uid', 'title', 'authors', and 'pubdate' keys are present in the data
def test_get_details(client):
    test_id = '38615309'
    response = client.post('/get_details', json={'target_id': test_id})
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'uid' in data
    assert 'title' in data
    assert 'authors' in data
    assert 'pubdate' in data
    print(data)