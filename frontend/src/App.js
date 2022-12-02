import './App.css'

import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {

  const [section, setSection] = useState(0)

  return (
    <div>

      <div className='header'>
        <h1 className='header-title'>Creative Book Northumberland</h1>
        <div className='header-sections'>
          <Button variant={section==0 ? 'contained' : 'text'} onClick={() => {setSection(0)}}>About</Button>
          <Button variant={section==1 ? 'contained' : 'text'} onClick={() => {setSection(1)}}>Portfolio page</Button>
          <Button variant={section==2 ? 'contained' : 'text'} onClick={() => {setSection(2)}}>For buisnesses</Button>
          <Button variant={section==3 ? 'contained' : 'text'} onClick={() => {setSection(3)}}>For creatives</Button>
          <Button variant={section==4 ? 'contained' : 'text'} onClick={() => {setSection(4)}}>Home</Button>
        </div>
      </div>
      
    </div>
  )

}

export default App;
