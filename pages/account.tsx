import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Membership from '../components/Membership'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments, { goToBillingPortal } from '../lib/stripe'

interface Props {
  products: Product[]
}

function Account({ products }: Props) {
  console.log(products)
  const { user, logout, loading } = useAuth()
  const subscription = useSubscription(user)
  const [isBillingLoading, setBillingLoading] = useState(false)

  if (loading) return null

  console.log(subscription)
  return (
    <div className="">
      <Head>
        <title>Account Settings - 9jaNET</title>
        <link rel="icon" href="/NETFLIX_logo.png" />
      </Head>

      <header className={`bg-[#0c0c0c]/90`}>
        <div className="flex items-center">
          <Link href="/">
            <h1 className="mr-[30px] cursor-pointer text-4xl font-extrabold text-green-600">
              9jaNET
            </h1>
          </Link>
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

        <div>
          {/* <Link href="/account">
            <button className="mr-[10px] cursor-pointer rounded bg-green-700 px-2 py-2 text-white duration-300  hover:bg-green-800 md:px-5">
              Account
            </button>
          </Link> */}
          <button
            onClick={logout}
            className="cursor-pointer rounded px-2 py-2 text-white outline outline-1 duration-300 hover:text-white/70 md:px-5"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 pt-[120px] pb-12 transition-all md:px-10 md:pt-[200px]">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p
            className="cursor-pointer text-green-400 hover:underline md:text-right"
            onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-green-400 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export default Account

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
}
