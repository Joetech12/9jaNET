import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { signupErrorState } from '../atoms/modalAtom.'
import { useForm, SubmitHandler } from 'react-hook-form'
import Spinner from '../components/Spinner'
import useAuth from '../hooks/useAuth'

interface Inputs {
  email: string
  password: string
}

function Register() {
  const [login, setLogin] = useState(false)
  const [signupError, setSignupError] = useRecoilState(signupErrorState)
  const [showSpinner, setShowSpinner] = useState(false)
  const { signIn, signUp, loading } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }

  const buttonHandler = () => {
    setShowSpinner(true)

    setLogin(false)
  }

  return (
    <div className="relative flex h-screen w-screen flex-col   bg-black/10 md:items-center md:justify-center">
      <Head>
        <title>trailerNET</title>
        <link rel="icon" href="/NETFLIX_logo" />
        <meta
          name="description"
          content="Looking for the latest movie trailers and sneak peeks? Browse trailers for all the latest blockbuster hits, Hollywood gems, and everything in between. With our user-friendly interface, stay up-to-date on the hottest movies hitting the big screen with trailerNet!"
        />
      </Head>
      <Image
        src="/background_img.jpg"
        layout="fill"
        className="-z-10  !inline opacity-40"
        objectFit="cover"
      />
      <div className="mt-[50px] w-full text-center md:mt-[0]">
        <h1 className="text-4xl font-extrabold text-green-500 md:text-5xl">
          trailerNET
        </h1>
        <p className="mb-[20px] pt-[10px] text-[20px] md:pt-[10px]">
          The Home of latest trailers
        </p>
      </div>

      <form
        className="relative mt-[0px] space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-4xl font-semibold">Register</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${
                errors.email && 'border-b-2 border-orange-500'
              }`}
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Password"
              className={`input ${
                errors.password && 'border-b-2 border-orange-500'
              }`}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="flex w-full items-center justify-center rounded bg-green-700 py-3 font-semibold"
          onClick={buttonHandler}
          type="submit"
        >
          Sign Up{' '}
          <span className="ml-[10px]">
            {showSpinner && loading && <Spinner />}
          </span>
        </button>
        {signupError && (
          <p className="text-center text-[15px] text-orange-500">
            Email already in use
          </p>
        )}
        <div className="flex justify-between text-[gray]">
          <p>Already registered to trailerNET? </p>
          <Link href="/login">
            <p className="cursor-pointer text-white hover:underline">Sign In</p>
          </Link>
        </div>
      </form>

      <div className="flex flex-col">
        <p className="mt-[30px] mb-[0px] pb-[0px]  text-center text-[14px] text-white/70 md:mb-[0px]">
          Developed by Ifeanyi Umeh © 2023
        </p>
      </div>
    </div>
  )
}

export default Register
