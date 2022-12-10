import { useEffect, useState } from 'react'

import api from '../services/api'

function SearchView() {

  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    api.getAllPortfolios()
      .then((res) => {
        console.log(res)
        setPortfolios(res.data.res)
      })
  }, [])


  return (
    <div>
      {portfolios.map((portfolio) => (
        <div>{portfolio.CompanyName}</div>
      ))}
    </div>
  )

}

export default SearchView;
