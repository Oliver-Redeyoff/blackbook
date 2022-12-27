import '../css/SearchView.css'

import { NavLink } from "react-router-dom"
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

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

            <Box sx={{ mb: 2 }}>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                <Chip label='Primary services' variant='outlined' color='primary' size='small' />
                {portfolio.PrimaryServices.map((service) => (<Chip label={service} color='primary' size='small' />))}
              </Stack>
            </Box>

            <Box>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                <Chip label='Secondary services' variant='outlined' color='secondary' size='small' />
                {portfolio.SecondaryServices.map((service) => (<Chip label={service} color='secondary' size='small' />))}
              </Stack>
            </Box>

          </div>
        </NavLink>
      ))}

    </div>
  )

}

export default SearchView;
