import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
  <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <ul className="bg sticky px-10 py-3  mx-auto flex items-certer justify-between">
      <li>
        <Link href="/">Home</Link>
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
        <Link href="/result">Result</Link>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar