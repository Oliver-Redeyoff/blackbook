from google.cloud import datastore

# Instantiate client
client = datastore.Client()

def post_portfolio(request):

    # retrieve request body
    request_portfolio = request.get_json()
    request_portfolio['approved'] = False

    ## Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        ## Allows GET requests from any origin with the Content-Type
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    ## Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    # insert new Portfolio
    portfolio = datastore.Entity(key=client.key("Portfolio"))
    portfolio.update(request_portfolio)
    client.put(portfolio)
    
    # retrieve Portfolios
    query = client.query(kind="Portfolio")

    # return list
    return ({'res': list(query.fetch())}, 200, headers)
