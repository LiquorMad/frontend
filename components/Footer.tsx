import React from 'react'


function Footer() {
  const copyright = String.fromCodePoint(0x00A9);
  return (
    <footer className=' bg-white fixed left-0 border-gray-200 dark:border-gray-600  w-full bottom-0 flex flex-col text-black-100 mt-5 border-t  '>
      <div className='px-10 py-3'>Leonildo Borges Moniz {copyright} 2023</div>
    </footer>
  )
}

export default Footer