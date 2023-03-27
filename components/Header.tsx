import Image from 'next/image'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import BasicMenu from './BasicMenu'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { FaUserCog } from 'react-icons/fa'
import { GoSignOut } from 'react-icons/go'
import { useRef } from 'react'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout, loading } = useAuth()
  const [nav, setNav] = useState(true)

  const handleNav = () => {
    setNav(!nav)
  }

  const NavMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        NavMenuRef.current &&
        !NavMenuRef.current.contains(event.target as Node)
      ) {
        setNav(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

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
            trailerNET
          </h1>
        </Link>

        {/* <BasicMenu /> */}

        <ul className="hidden space-x-4 lg:flex">
          <Link href="/">
            <li className="headerLink">Home</li>
          </Link>
          <Link href="/#action">
            <li className="headerLink">Action</li>
          </Link>
          <Link href="/#comedy">
            <li className="headerLink">Comedy</li>
          </Link>
          <Link href="/#adventure">
            <li className="headerLink">Adventure</li>
          </Link>
          <Link href="/#war">
            <li className="headerLink">War</li>
          </Link>
          <Link href="/#science">
            <li className="headerLink">Science</li>
          </Link>
          <Link href="/#drama">
            <li className="headerLink">Drama</li>
          </Link>
          <Link href="/#horror">
            <li className="headerLink">Horror</li>
          </Link>
          {/* <li className="headerLink">My List</li> */}
        </ul>
      </div>

      <div className="hidden items-center space-x-4 text-sm font-light lg:flex">
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

      <div
        onClick={handleNav}
        className="block cursor-pointer duration-500 ease-in-out lg:hidden"
      >
        {!nav ? (
          <AiOutlineClose size={25} className={`${!nav && 'opacity-0'}`} />
        ) : (
          <AiOutlineMenu size={25} />
        )}
      </div>

      <div
        ref={NavMenuRef}
        className={
          !nav
            ? 'fixed right-0 top-0 z-50 flex h-full w-[50%] flex-col items-start bg-[#0a0a0a]/90 px-4 duration-300 md:w-[30%] lg:hidden'
            : 'fixed right-[-100%] duration-300'
        }
      >
        <div
          onClick={handleNav}
          className="duration-400 z-50 mt-[21px] mb-5 ml-2 cursor-pointer ease-in-out md:mt-[30px]"
        >
          <AiOutlineClose size={25} className="hover:text-gray-400" />
        </div>
        <ul className=" w-full">
          <Link href="/">
            <li className="my-6 cursor-pointer px-4 hover:text-gray-400">
              Home
            </li>
          </Link>
          <Link href="/#action">
            <li className="my-6 cursor-pointer px-4 hover:text-gray-400">
              Action
            </li>
          </Link>
          <Link href="/#comedy">
            <li className="my-6 cursor-pointer px-4 hover:text-gray-400">
              Comedy
            </li>
          </Link>
          <Link href="/#adventure">
            <li className="my-6 cursor-pointer px-4 hover:text-gray-400">
              Adventure
            </li>
          </Link>
          <Link href="/#war">
            <li className="my-6 cursor-pointer px-4 hover:text-gray-400">
              War
            </li>
          </Link>
          <Link href="/#science">
            <li className="my-6 cursor-pointer px-4 hover:text-gray-400">
              Science
            </li>
          </Link>
          <Link href="/#drama">
            <li className="my-6 cursor-pointer px-4 hover:text-gray-400">
              Drama
            </li>
          </Link>
          <Link href="/#horror">
            <li className="my-6 cursor-pointer border-b-[1px] border-gray-600 px-4 pb-[20px] hover:text-gray-400 ">
              Horror
            </li>
          </Link>
          <Link href="/account">
            <li className="my-6 flex  cursor-pointer items-center border-gray-600 px-4 hover:text-gray-400">
              Account <FaUserCog className="ml-[10px] h-4 w-4" />
            </li>
          </Link>
          <li
            onClick={logout}
            className="my-6 flex cursor-pointer items-center border-gray-600 px-4  hover:text-gray-400 "
          >
            Sign Out <GoSignOut className="ml-[10px] h-4 w-4" />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
