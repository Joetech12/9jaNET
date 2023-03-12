import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom.'
import { Movie } from '../typings'
import { FaHeart, FaPlay, FaRegHeart } from 'react-icons/fa'
import { BiPlayCircle } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'

interface Props {
  movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)

  const movieRating = movie?.vote_average.toFixed(1)

//   console.log(movie)

  return (
    <>
      {movie?.title && (
        <div className="flex flex-col">
          <div
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
            className={`relative flex h-[150px] md:h-[180px] w-[260px] md:w-[300px] cursor-pointer flex-col transition duration-200 ease-out  md:hover:scale-105`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              className="h-[150px] md:h-[180px] w-[260px] md:w-[300px] rounded-sm object-cover md:rounded"
            />
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center text-white opacity-0 hover:bg-black/80 hover:opacity-100">
              {/* <p className="white-space-normal flex h-full items-center justify-center px-[20px] text-center text-xs font-semibold md:text-sm">
            {movie?.title}
          </p> */}
              <div className="">
                <BiPlayCircle className="h-[40px] w-[40px] text-white" />
              </div>
              <p>
                {/* {like ? (
                <FaHeart className='absolute top-4 left-4 text-gray-300' />
              ) : (
                <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
              )} */}
              </p>
            </div>
          </div>
          <div className="flex items-center mt-[10px] w-full justify-between">
              <p className="...  w-[200px] md:w-[250px] truncate px-[10px] text-[14px] md:text-[16px]">
                {movie?.title}
              </p>
              <div className="flex items-center space-x-[5px]">
                  <p className="font-thin text-sm">{movieRating}</p>
                  <AiFillStar className="h-[15px] w-[15px] text-green-500" />
              </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Thumbnail
