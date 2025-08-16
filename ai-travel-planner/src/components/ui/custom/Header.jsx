import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='p-1 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo.svg' width="60" height= "70" />
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header