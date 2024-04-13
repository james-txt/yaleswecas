import sys
sys.path.append('..')
from main import main
import pytest # type: ignore

@pytest.fixture
def client():
    main.config['TESTING'] = True
    with main.test_client() as client:
        yield client

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Hello, World!' in response.data
