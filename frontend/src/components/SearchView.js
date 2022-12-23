import '../css/SearchView.css'

import { NavLink } from "react-router-dom"
import Loader from './Loader'

import { useEffect, useState } from 'react'

import api from '../services/api'

function SearchView() {

  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAllPortfolios()
      .then((res) => {
        var portfolios = res.data.res
        for (var portfolioIndex in portfolios) {
          var portfolio = portfolios[portfolioIndex]
          portfolio.PrimaryServices = []
          portfolio.SecondaryServices = []

          var services = Object.keys(portfolio.Services)
          for (var service_index in services) {
            var service = services[service_index]
            if (portfolio.Services[service] == 'Primary') {
              portfolio.PrimaryServices.push(service)
            } else {
              portfolio.SecondaryServices.push(service)
            }
          }

        }

        setPortfolios(portfolios)
        setLoading(false)
      })
  }, [])


  return (
    <div>

      <h1 className='appear'>All creatives:</h1>

      { loading==true && <div style={{'textAlign': 'center', 'marginTop': '10%'}}><Loader /></div> }

      {portfolios.map((portfolio, index) => (
        <NavLink key={portfolio.CompanyName} to={'/search/'+portfolio.CompanyName}>
          <div className='portfolio-preview appear' style={{'animationDelay': 0.2 + index*0.03 + 's'}}>
            <div className='name'>{portfolio.CompanyName}</div>
            <div className='primary-services'>
              <label>Primary services: </label>
              {portfolio.PrimaryServices.map((service) => (<span>{service}</span>))}
            </div>
            <div className='secondary-services'>
              <label>Secondary services: </label>
              {portfolio.SecondaryServices.map((service) => (<span>{service}</span>))}
            </div>
          </div>
        </NavLink>
      ))}

    </div>
  )

}

export default SearchView;
