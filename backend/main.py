from flask import Flask, request # type: ignore
from flask_cors import CORS # type: ignore
import requests # type: ignore

main = Flask(__name__)
CORS(main)

# Helper function to make a fetch request
def get_data_from_api(url):
    response = requests.get(url)
    data = response.json()
    return data

# GET request to the PubMed API to fetch the first 10 IDs related to the term "cancer" 
# Returns the list of IDs.
@main.route('/get_ids', methods=['GET'])
def get_ids():
    data = get_data_from_api(f'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10&term=cancer&retmode=json')
    return {
        'idlist': data['esearchresult']['idlist']
        }

# This route takes a POST request with a JSON body containing a 'target_id'. 
# It makes a GET request to the PubMed API to fetch the details of the publication with the given ID
@main.route('/get_details', methods=['POST'])
def get_details():
    target_id = request.json.get('target_id')
    data = get_data_from_api(f'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id={target_id}&retmode=json')
    result = data['result'][target_id]
    return {
        'uid': result['uid'],
        'title': result['title'],
        'authors': [author['name'] for author in result['authors']],
        'pubdate': result['pubdate']
    }

if __name__ == '__main__':
    main.run(debug=True)