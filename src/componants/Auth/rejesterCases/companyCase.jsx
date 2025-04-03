import React from 'react'


import Input from '../../ui/authInput'
import Button from '../../ui/secondaryBtn'

const companyCase = () => {
  return (
    <div>
      <div className="">
      <Input label='Email' type='Email' placeholder='Enter your Email' />
      </div>
      <Button label="Login" type="enabled" size="large" withprop='full' />
    </div>
  )
}

export default companyCase
