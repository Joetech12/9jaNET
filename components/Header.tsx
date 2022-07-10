import Image from 'next/image'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import BasicMenu from './BasicMenu'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#0c0c0c]/90'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <h1 className="cursor-pointer text-4xl font-extrabold text-green-600">
            9jaNET
          </h1>
        </Link>

        {/* <BasicMenu /> */}

        <ul className="hidden space-x-4 md:flex">
          <Link href="/">
            <li className="headerLink cursor-pointer font-semibold text-white hover:text-white">
              Home
            </li>
          </Link>
          <li className="headerLink">Nollywood</li>
          <li className="headerLink">Foreign</li>
          <li className="headerLink">Soap opera</li>
          {/* <li className="headerLink">My List</li> */}
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        {/* <SearchIcon className="sm hidden h-6 w-6 sm:inline" /> */}
        {/* <p className="hidden lg:inline">Kids</p> */}
        {/* <BellIcon className="h-6 w-6" /> */}
        <Link href="/account">
            <button className="cursor-pointer rounded bg-green-700 hover:bg-green-800 duration-300 px-2 md:px-5 mr-[0px] py-2 text-white">
              Account
            </button>
          </Link>
            <button onClick={logout} className="cursor-pointer rounded outline outline-1 px-2 md:px-5 py-2 text-white hover:text-white/70 duration-300">
              Sign Out
            </button>
      </div>
    </header>
  )
}

export default Header
