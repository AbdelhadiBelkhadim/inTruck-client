import React from 'react'


import Input from '../../ui/authInput'
import Button from '../../ui/secondaryBtn'

const companyCase = () => {
  return (
    <div className="Form space-y-[32px] md:space-y-[48px]">
      <div className="space-y-[30px] md:space-y-[50px]">
        <Input label='Email' type='Email' placeholder='Enter your Email' />
        <Input label='Password' type='password' placeholder='Enter Password' />
      </div>
      <div className="">
        <Button label="Login" type="enabled" size="large" withprop='full' />
      </div>
    </div>
  )
}

export default companyCase
