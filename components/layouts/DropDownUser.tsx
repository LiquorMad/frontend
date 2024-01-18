import { LogOut, UserCircle2 } from 'lucide-react';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import React from 'react'

type DropDownUserProps ={
    visible: boolean,
}
async function logOut(){
  const { 'ps4StandingsAuth.token': token } = parseCookies()
  const baseURL = 'http://127.0.0.1:3333/api/logout'
    const endpoint = (`${baseURL}/${token}`);
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(endpoint, options)
    if(response.status === 200){
        destroyCookie(undefined, 'ps4StandingsAuth.token')
        Router.push('login');
    }
}

function DropDownUser({visible}:DropDownUserProps) {
    if (!visible) return null;
  return (
    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div className="py-1" role="none">
      <a href="#" className="text-gray-700 px-4 py-2 text-sm flex gap-3" role="menuitem" > <UserCircle2 />Profile</a>
        <button type="submit" 
          onClick={logOut}
          className="text-gray-700 flex w-full px-4 py-2 
            text-left text-sm gap-3" 
          role="menuitem"  
          id="menu-item-3">
            <LogOut />Sign out
        </button>
    </div>
  </div>
  )
}

export default DropDownUser