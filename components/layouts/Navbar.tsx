import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DropDownUser from './DropDownUser';

const Navbar = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  
  function handleVisibility(){
    setModalOpen(!modalOpen)
  }

  return (
  <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <ul className="bg sticky px-10 py-3  mx-auto flex items-certer justify-between">
      <li>
        <Link href="/home">Home</Link>
      </li>
      <li>
        <Link href="/player">Players</Link>
      </li>
      <li>
        <Link href="/team">Team</Link>
      </li>
      <li>
        <Link href="/match">Match</Link>
      </li>
      <li>
        <Image
          onClick={handleVisibility}
          className="w-10 h-10 rounded-full cursor-pointer" 
          width={300} 
          height={200} 
          src="/images/f1.jpg" 
          alt="Rounded avatar"/>
          <DropDownUser visible={modalOpen} />
      </li>
    </ul>
  </nav>
  )
}

export default Navbar