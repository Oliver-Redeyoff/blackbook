import '../css/PortfolioView.css'

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import Grid from '@mui/material/Grid'
import AlternateEmail from '@mui/icons-material/AlternateEmail'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Facebook from '@mui/icons-material/Facebook'
import Instagram from '@mui/icons-material/Instagram'
import Twitter from '@mui/icons-material/Twitter'
import Linkedin from '@mui/icons-material/LinkedIn'
import Link from '@mui/icons-material/Link'

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

            { loading==true && <div style={{'textAlign': 'center', 'marginTop': '10%'}}><Loader /></div> }

            { loading==false && <>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className='icon-info icon-text'><PhoneIcon /> <span>{portfolio.Number}</span></div>
                        <div className='icon-info icon-text'><AlternateEmail /> <span>{portfolio.Email}</span></div>
                        <div className='icon-info icon-text'><LocationOnIcon /> <span>{portfolio.Address}</span></div>
                        <div className='icon-info icon-text'><Link /> <span>{portfolio.Website}</span></div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='icon-info icon-text'><Facebook /> <span>{portfolio.Facebook}</span></div>
                        <div className='icon-info icon-text'><Instagram /> <span>{portfolio.Instagram}</span></div>
                        <div className='icon-info icon-text'><Twitter /> <span>{portfolio.Twitter}</span></div>
                        <div className='icon-info icon-text'><Linkedin /> <span>{portfolio.Linkedin}</span></div>
                    </Grid>
                </Grid>

                <div className='primary-services'>
                    <label>Primary services: </label>
                    {portfolio.PrimaryServices.map((service) => (<span>{service}</span>))}
                </div>
                <div className='secondary-services'>
                    <label>Secondary services: </label>
                    {portfolio.SecondaryServices.map((service) => (<span>{service}</span>))}
                </div>

                <h2>Company description</h2>
                <p>{portfolio.BusinessDescriptionQuestion}</p>

                <h2>Previous work</h2>
                <p>{portfolio.PreviousWorkQuestion}</p>

            </> }
        </div>
    )

}

export default PortfolioView