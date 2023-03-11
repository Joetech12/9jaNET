import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

interface Inputs {
  email: string
  password: string
}

function Register() {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

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

  return (
    <div className="relative flex h-screen w-screen flex-col  bg-black/40 md:items-center md:justify-center md:bg-black/20">
      <Head>
        <title>9jaNET</title>
        <link rel="icon" href="/NETFLIX_logo" />
      </Head>
      <Image
        src="/background_img.jpg"
        layout="fill"
        className="-z-10  !inline opacity-60"
        objectFit="cover"
      />
      <div className="absolute top-4 h-20 w-full text-center md:top-4">
        <h1 className="text-4xl font-extrabold text-green-500 md:text-5xl">
          9jaNET
        </h1>
        <p className="pt-[10px] text-[14px] md:pt-[20px]">
          Home of latest trailers
        </p>
      </div>

      <form
        className="relative mt-[200px] space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Register</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${
                errors.email && 'border-b-2 border-orange-500'
              }`}
              {...register('email', { required: true })}
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
          className="w-full rounded bg-green-700 py-3 font-semibold"
          onClick={() => setLogin(false)}
          type="submit"
        >
          Sign Up
        </button>
        <div className="flex justify-between text-[gray]">
          <p>Already registered to 9jaNET? </p>
          <Link href='/login'>
              <p
                className="cursor-pointer text-white hover:underline"
              >
                Sign In
              </p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
