import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../components/Header'
import Membership from '../components/Membership'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments, { goToBillingPortal } from '../lib/stripe'
import { HiOutlineMail } from 'react-icons/hi'
import { FiExternalLink } from 'react-icons/fi'

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
        <title>Account Settings - trailerNET</title>
        <link rel="icon" href="/NETFLIX_logo.png" />
        <meta
          name="description"
          content="Looking for the latest movie trailers and sneak peeks? Browse trailers for all the latest blockbuster hits, Hollywood gems, and everything in between. With our user-friendly interface, stay up-to-date on the hottest movies hitting the big screen with trailerNet!"
        />
      </Head>

      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-[120px] pb-12 transition-all md:px-10 md:pt-[200px]">
        <div className="flex items-center space-x-[10px]">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              {/* Member since {subscription?.created} */}Free Premium
            </p>
          </div>
        </div>

        <Membership />

        {/* <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
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
        </div> */}

        <div className="flex flex-col justify-between border-t border-b border-white/10 px-4 py-4 md:px-0">
          <div className="mb-[20px] flex justify-between">
            <div className=" membershipLink  flex items-center space-x-[5px]">
              <p className=" ">Developer Info</p>
            </div>
            {/* <p className="membershipLink">Change password</p> */}
            <div className="flex items-center space-x-[5px] text-[gray]">
              <a
                href="mailto:info@ifeanyiumeh.com?subject=Enquiry"
                className=""
              >
                info@ifeanyiumeh.com
              </a>
            </div>
          </div>
          <div className="mb-[20px] flex justify-between">
            <p className="membershipLink">Developer Website</p>
            {/* <p className="membershipLink">Change password</p> */}
            <a
              href="https://www.ifeanyiumeh.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-[5px] text-[gray]"
            >
              <p className="">ifeanyiumeh.com</p>
              <span className="">
                <FiExternalLink />
              </span>
            </a>
          </div>
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
