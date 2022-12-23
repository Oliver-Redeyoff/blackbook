import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import Loader from './Loader'

import api from '../services/api'

function PortfolioView() {

    var params = useParams()
    const [loading, setLoading] = useState(true)
    const [portfolio, setPortfolio] = useState({})


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
            
            setPortfolio(portfolios.filter((el) => {return el.CompanyName == params.CompanyName})[0])
            setLoading(false)
        })
    }, [])


    return (
        <div className='portfolio appear'>
            <h1>{params.CompanyName}</h1>
            <div><LocationOnIcon /> {portfolio.Email}</div>
            <div><PhoneIcon /> {portfolio.Number}</div>

            { loading==true && <div style={{'textAlign': 'center', 'marginTop': '10%'}}><Loader /></div> }

        </div>
    )

}

export default PortfolioView