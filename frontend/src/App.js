import './App.css'

import { useState } from 'react';

function App() {

  const [section, setSection] = useState(0)

  return (
    <div>

      <div className='header'>
        <h1 className='header-title'>Creative Book Northumberland</h1>
        <div className='header-sections'>
          <div className={section==0 ? 'selected' : ''} onClick={() => {setSection(0)}}>About</div>
          <div className={section==1 ? 'selected' : ''} onClick={() => {setSection(1)}}>Portfolio page</div>
          <div className={section==2 ? 'selected' : ''} onClick={() => {setSection(2)}}>For buisnesses</div>
          <div className={section==3 ? 'selected' : ''} onClick={() => {setSection(3)}}>For creatives</div>
          <div className={section==4 ? 'selected' : ''} onClick={() => {setSection(4)}}>Home</div>
        </div>
      </div>
      
    </div>
  )

}

export default App;
