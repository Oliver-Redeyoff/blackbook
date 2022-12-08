import axios from 'axios'

const baseUrl = 'https://europe-west2-blackbook-370420.cloudfunctions.net/'

function get(endpoint) {
    return axios.get(baseUrl + endpoint)
}

function post(endpoint, data) {
    return axios.post(baseUrl + endpoint, data)
}

export default {
    getAllPortfolios: () => {get('GetPortfolios')},
    postPortfolio: (portfolio) => {post('PostPortfolio', portfolio)}
}