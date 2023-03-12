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
            <li className="headerLink">
              Home
            </li>
          </Link>
          <Link href="/#action">
            <li className="headerLink">Action</li>
          </Link>
          <Link href="/#comedies">
            <li className="headerLink">Comedies</li>
          </Link>
          <Link href="/#romance">
            <li className="headerLink">Romance</li>
          </Link>
          <Link href="/#horror">
            <li className="headerLink">Horror</li>
          </Link>
          {/* <li className="headerLink">My List</li> */}
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        {/* <SearchIcon className="sm hidden h-6 w-6 sm:inline" /> */}
        {/* <p className="hidden lg:inline">Kids</p> */}
        {/* <BellIcon className="h-6 w-6" /> */}
        <Link href="/account">
          <button className="mr-[0px] cursor-pointer rounded bg-green-700 px-2 py-2 text-white duration-300 hover:bg-green-800 md:px-5">
            Account
          </button>
        </Link>
        <button
          onClick={logout}
          className="cursor-pointer rounded px-2 py-2 text-white outline outline-1 duration-300 hover:text-white/70 md:px-5"
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}

export default Header
