import './App.css'

import { useLocation, useNavigate, NavLink, Routes, Route, Navigate } from "react-router-dom"

import HomeView from './components/HomeView'
import PortfolioForm from './components/PorfolioForm'
import SearchView from './components/SearchView'
import AboutView from './components/AboutView'

import { useEffect, useState } from 'react'

function App() {

  const Sections = {
    About: {
      id: 0,
      name: 'About',
      path: '/about',
      viewComponent: <AboutView />
    },
    ForBuisnesses: {
      id: 2,
      name: 'For buisnesses',
      path: '/search',
      viewComponent: <SearchView />
    },
    ForCreatives: {
      id: 3,
      name: 'For creatives',
      path: '/signup',
      viewComponent: <PortfolioForm />
    },
    Home: {
      id: 4,
      name: 'Home',
      path: '/home',
      viewComponent: <HomeView />
    }
  }


  const [section, setSection] = useState('')
  let location = useLocation()
  let navigate = useNavigate()


  useEffect(() => {
    for(var key of Object.keys(Sections)) {
      if (location.pathname == Sections[key].path) {
        setSection(key)
      }
    }
  }, [location])
  

  return (
    <div className='app'>

      {/* header */}
      <div className='header'>
        <h1 className='header-title'>Creative Book Northumberland</h1>
        <div className='header-sections'>
          {Object.keys(Sections).map((key) => (
            <NavLink key={Sections[key].id} to={Sections[key].path}>
              <div className={section==key ? 'selected' : ''} onClick={() => {setSection(key)}}>{Sections[key].name}</div>
            </NavLink>
          ))}
        </div>
      </div>
      
      {/* body of app where views will be displayed */}
      <div className='view-container'>
        <Routes>
          
          {/* Sepcify route for each section */}
          {Object.keys(Sections).map((key) => (
            <Route path={Sections[key].path} element={Sections[key].viewComponent} />
          ))}

          {/* Add catch all route */}
          <Route path='*' element={<Navigate to="/home" />} />

        </Routes>
      </div>
      
    </div>
  )

}

export default App;
