import '../css/PortfolioForm.css'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'

import formValidator from '../services/formValidator'

function PortfolioForm() {

  const ServiceLevels = {
    Primary: 'Primary',
    Secondary: 'Secondary'
  }
  var formSchema = new formValidator({
    Name: {
      label: 'Name',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
    },
    Email: {
      label: 'Email',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
    },
    CompanyName: {
      label: 'Company name',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
    },
    Number: {
      label: 'Number',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
    },
    Address: {
      label: 'Address',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
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
    Services: {
      label: 'Services',
      initialValue: {},
      validation: notEmpty,
      errorMessage: 'Cannot be empy'
    },
    BusinessDescriptionQuestion: {
      label: 'Buisness description',
      initialValue: '',
      validation: (value) => {return value.length <= 1500},
      errorMessage: 'Cannot be more than 1500 characters'
    },
    PreviousWorkQuestion: {
      label: 'Previous work',
      initialValue: '',
      validation: (value) => {return value.length <= 1500},
      errorMessage: 'Cannot be more than 1500 characters'
    }
  })

  const [portfolioForm, setPortfolioForm] = useState(formSchema.generateInitialForm())
  const [services, setServices] = useState([
    'Graphic Design', 'Photography', 'Illustration', 
    'Copywriting', 'Social media', 'Music', 'Website design', 
    'Website building', 'Legal advice', 'Financial advice'
  ])
  const [newService, setNewService] = useState('')

  function notEmpty(input) {
    if (input == '' || input == [] || input == null || Object.keys(input).length == 0) {
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

    return <TextField
              value={formElement.value}
              error={formElement.isValid==false} 
              id="outlined-basic" 
              fullWidth 
              label={formElement.label} 
              onChange={(e) => {updateValue(e)}}
              multiline={useMultiline}
              rows={4}
              helperText={formElement.isValid==false ? formElement.errorMessage : ''} />
  }

  function updateService(service, level) {
    var portfolioFormCopy = {...portfolioForm}
    portfolioFormCopy.Services.value[service] = level
    console.log(portfolioFormCopy)
    setPortfolioForm(portfolioFormCopy)
  }

  function addNewService() {
    if (newService == '') {
      return
    }
    setServices([...services, newService])
    setNewService('')
  }

  function submit() {
    var [formValid, portfolioFormCopy] = formSchema.validate(portfolioForm)
    setPortfolioForm(portfolioFormCopy)
    console.log(portfolioFormCopy)
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

        <Grid item xs={4}></Grid>
        <Grid item xs={4}>Primary</Grid>
        <Grid item xs={4}>Secondary</Grid>

        {services.map((service) => (<>
          <Grid item xs={4}>{service}</Grid>
          <Grid item xs={4}><Radio checked={portfolioForm.Services.value[service] == ServiceLevels.Primary} onClick={() => {updateService(service, ServiceLevels.Primary)}} /></Grid>
          <Grid item xs={4}><Radio checked={portfolioForm.Services.value[service] == ServiceLevels.Secondary} onClick={() => {updateService(service, ServiceLevels.Secondary)}}/></Grid>
        </>))}
        
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <span><b>Add a service:</b></span>
          <TextField value={newService} id="outlined-basic" style={{'margin': '0px 20px 0px 20px'}} size='small' onChange={(e) => {setNewService(e.target.value)}} />
          <Button variant='contained' onClick={addNewService}>Add</Button>
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

      <Button style={{'marginTop': '60px'}} variant='contained' onClick={submit} disableElevation>Submit</Button>

    </div>
  )

}

export default PortfolioForm
