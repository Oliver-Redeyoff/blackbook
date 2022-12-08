import { useEffect, useState } from 'react'

import api from '../services/api'

function SearchView() {

  useEffect(() => {
    api.getAllPortfolios({test: 'testing'})
  }, [])


  return (
    <div>
      Put search content here
    </div>
  )

}

export default SearchView;
