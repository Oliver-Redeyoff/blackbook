import '../css/PortfolioForm.css'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'
import { Fab } from '@mui/material'

function PortfolioForm() {

  const DefaultServices = ['Graphic Design', 'Photography', 'Illustration', 'Copywriting', 'Social media', 'Music', 'Website design', 
                    'Website building', 'Legal advice', 'Financial advice']


  return (
    <div>

      <h2>Basic info</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Name" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Email" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Name of company" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Number" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" fullWidth multiline rows={4} label="Address" />
        </Grid>
      </Grid>

      <h2>Social links</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Website" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Facebook" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Twitter" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Instagram" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" fullWidth label="Linkedin" />
        </Grid>
      </Grid>

      <h2>Services</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Services offered</h3>
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>Primary</Grid>
            <Grid item xs={4}>Secondary</Grid>
            {DefaultServices.map((service) => (<>
              <Grid item xs={4}>{service}</Grid>
              <Grid item xs={4}><Radio /></Grid>
              <Grid item xs={4}><Radio /></Grid>
            </>))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h3>Please specify any other services</h3>
          <TextField id="outlined-basic" fullWidth multiline rows={4} label="" />
        </Grid>
      </Grid>

      <h2>Buisness info</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Tell us about yourself and your business (no more than 300 words)</h3>
          <TextField id="outlined-basic" fullWidth multiline rows={4} label="" />
        </Grid>
        <Grid item xs={12}>
          <h3>Please let us know who you've previously worked with or what types of businesses you've worked with (if relevant)</h3>
          <TextField id="outlined-basic" fullWidth multiline rows={4} label="" />
        </Grid>
      </Grid>

      <h2>Work samples</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className='form-upload'>Upload any work samples</div>
        </Grid>
      </Grid>

      <Button style={{'marginTop': '20px'}} variant='contained' disableElevation>Submit</Button>

    </div>
  )

}

export default PortfolioForm
