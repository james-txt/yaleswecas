from flask import Flask, request # type: ignore
from flask_cors import CORS # type: ignore
import requests # type: ignore

main = Flask(__name__)
CORS(main)

def get_data_from_api(url):
    response = requests.get(url)
    data = response.json()
    return data

@main.route('/get_ids', methods=['GET'])
def get_ids():
    data = get_data_from_api(f'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10&term=cancer&retmode=json')
    return {'idlist': data['esearchresult']['idlist']}

if __name__ == '__main__':
    main.run(debug=True)