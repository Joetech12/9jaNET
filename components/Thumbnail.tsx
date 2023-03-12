import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom.'
import { Movie } from '../typings'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

interface Props {
  movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)

  console.log(movie)

  return (
    <div className="flex flex-col">
      <div
        className={`relative flex h-28 min-w-[180px] cursor-pointer flex-col transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
        onClick={() => {
          setCurrentMovie(movie)
          setShowModal(true)
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className="rounded-sm object-cover md:rounded"
          layout="fill"
        />
        <div className="absolute top-0 left-0 h-full w-full text-white opacity-0 hover:bg-black/80 hover:opacity-100">
          <p className="white-space-normal flex h-full items-center justify-center px-[20px] text-center text-xs font-semibold md:text-sm">
            {movie?.title}
          </p>
          <p>
            {/* {like ? (
                <FaHeart className='absolute top-4 left-4 text-gray-300' />
              ) : (
                <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
              )} */}
          </p>
        </div>
      </div>
      <p className="  mt-[10px]  px-[10px] text-[14px] truncate ...">
        {movie?.title}
      </p>
    </div>
  )
}

export default Thumbnail
