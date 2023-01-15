import '../../css/SearchView.css'

import { NavLink } from "react-router-dom"
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import FilterAlt from '@mui/icons-material/FilterAlt'

import Loader from '../misc/Loader'
import PortfolioPreview from '../misc/PortfolioPreview'

import { useEffect, useState } from 'react'

import api from '../../services/api'

function SearchView() {

  const services = [
    'Graphic Design', 'Photography', 'Illustration', 
    'Copywriting', 'Social media', 'Music', 'Website design', 
    'Website building', 'Legal advice', 'Financial advice'
  ]


  const [portfolios, setPortfolios] = useState([])
  const [filteredPortfolios, setFilteredPortfolios] = useState([])
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
    <div className='search-view'>

      <div className='filters'>

        <TextField
          label='Search by name'
          size='small'
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
        />

        <Autocomplete
          multiple
          sx={{ display: 'inline-block', ml: 2, width: 300 }}
          size='small'
          options={services}
          getOptionLabel={option => option}
          renderInput={params => {
            return (
              <TextField
                {...params}
                label="Filter by service"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <FilterAlt />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            );
          }}
        />

      </div>

      { loading==true && <div style={{'textAlign': 'center', 'marginTop': '10%'}}><Loader /></div> }

      {portfolios.map((portfolio, index) => (
        <NavLink key={portfolio.CompanyName} to={'/search/'+portfolio.CompanyName}>
          <div className='appear' style={{'animationDelay': 0.2 + index*0.03 + 's'}}>
            <PortfolioPreview portfolio={portfolio} />
          </div>
        </NavLink>
      ))}

    </div>
  )

}

export default SearchView;
