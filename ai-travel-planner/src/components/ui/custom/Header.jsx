import React, { useEffect } from 'react'
import { Button } from '../button'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    console.log(user)
  },[])


  return (
    <div className='p-1 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo.svg' width="60" height= "70" />
        <div>
          {user ?
            <div className='flex items-center gap-3'>
              <Button variant="outline" className="rounded-full">My Trips</Button>
              <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
            </div>
            :
            <Button>Sign In</Button>
          } 
        </div>
    </div>
  )
}

export default Header