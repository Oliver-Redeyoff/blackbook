import '../css/PortfolioForm.css'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'

import formValidator from '../services/formValidator'

function PortfolioForm() {

  var formSchema = new formValidator({
    Name: {
      label: 'Name',
      initialValue: '',
      validation: () => {notEmpty()}
    },
    Email: {
      label: 'Email',
      initialValue: '',
      validation: () => {notEmpty()}
    },
    CompanyName: {
      label: 'Company name',
      initialValue: '',
      validation: () => {notEmpty()}
    },
    Number: {
      label: 'Number',
      initialValue: '',
      validation: () => {notEmpty()}
    },
    Address: {
      label: 'Address',
      initialValue: '',
      validation: () => {notEmpty()}
    },
    Website: {
      label: 'Website',
      initialValue: ''
    },
    Facebook: {
      label: 'Facebook',
      initialValue: ''
    },
    Twitter: {
      label: 'Twitter',
      initialValue: ''
    },
    Instagram: {
      label: 'Instagram',
      initialValue: ''
    },
    Linkedin: {
      label: 'Linkedin',
      initialValue: ''
    },
    BusinessDescriptionQuestion: {
      label: 'Buisness description',
      initialValue: '',
      validation: (value) => {return value.length <= 1500}
    },
    PreviousWorkQuestion: {
      label: 'Previous work',
      initialValue: '',
      validation: (value) => {return value.length <= 1500}
    }
  })

  const [portfolioForm, setPortfolioForm] = useState(formSchema.generateInitialForm())
  const [services, setServices] = useState([
    'Graphic Design', 'Photography', 'Illustration', 
    'Copywriting', 'Social media', 'Music', 'Website design', 
    'Website building', 'Legal advice', 'Financial advice'
  ])

  function notEmpty(input) {
    if (input == '' || input == [] || input == null) {
      return false
    }
    return true
  }

  function generateTextInput(formElementKey, useMultiline=false) {
    var formElement = portfolioForm[formElementKey]
    if (!formElement) {
      return
    }

    function updateValue(e) {
      var newValue = e.target.value
      var portfolioFormCopy = {...portfolioForm}
      portfolioFormCopy[formElementKey].value = newValue
      setPortfolioForm(portfolioFormCopy)
    }

    if (formElement.isValid != false) {
      return <TextField
                value={formElement.value}
                error={formElement.isValid==false} 
                id="outlined-basic" 
                fullWidth 
                label={formElement.label} 
                onChange={(e) => {updateValue(e)}}
                multiline={useMultiline}
                rows={4}
                helperText={formElement.isValid==false ? 'Input is invalid' : ''} />
    } else {
      return <TextField error id="outlined-basic" fullWidth label={formElement.label} onChange={(e) => {updateValue(e)}}
              helperText={formElement.label + ' value is not valid'} />
    }
  }

  return (
    <div>

      <h2>Basic info</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {generateTextInput('Name')}
        </Grid>
        <Grid item xs={6}>
          {generateTextInput('Email')}
        </Grid>
        <Grid item xs={6}>
          {generateTextInput('CompanyName')}
        </Grid>
        <Grid item xs={6}>
          {generateTextInput('Number')}
        </Grid>
        <Grid item xs={12}>
          {generateTextInput('Address', true)}
        </Grid>
      </Grid>

      <h2>Social links</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {generateTextInput('Website')}
        </Grid>
        <Grid item xs={6}>
          {generateTextInput('Facebook')}
        </Grid>
        <Grid item xs={6}>
          {generateTextInput('Twitter')}
        </Grid>
        <Grid item xs={6}>
          {generateTextInput('Instagram')}
        </Grid>
        <Grid item xs={6}>
          {generateTextInput('Linkedin')}
        </Grid>
      </Grid>

      <h2>Services</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Services offered</h3>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>Primary</Grid>
            <Grid item xs={3}>Secondary</Grid>
            <Grid item xs={3}></Grid>

            {services.map((service) => (<>
              <Grid item xs={3}>{service}</Grid>
              <Grid item xs={3}><Radio /></Grid>
              <Grid item xs={3}><Radio /></Grid>
              <Grid item xs={3}></Grid>
            </>))}

            <Grid item xs={3}><TextField id="outlined-basic" fullWidth size='small' label="" /></Grid>
            <Grid item xs={3}><Radio /></Grid>
            <Grid item xs={3}><Radio /></Grid>
            <Grid item xs={3}><Button variant='contained'>Add</Button></Grid>
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
          <h3>Tell us about yourself and your business (no more than 1500 characters)</h3>
          {generateTextInput('BusinessDescriptionQuestion', true)}
        </Grid>
        <Grid item xs={12}>
          <h3>Please let us know who you've previously worked with or what types of businesses you've worked with (no more than 1500 characters)</h3>
          {generateTextInput('PreviousWorkQuestion', true)}
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
