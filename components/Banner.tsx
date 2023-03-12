import { InformationCircleIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { modalState, movieState } from '../atoms/modalAtom.'
import { useRecoilState } from 'recoil'
import Image from 'next/image'
import { Element, Genre } from '../typings'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [trailer, setTrailer] = useState('')

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  const truncateString = (str: any, num: any) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
    }

    fetchMovie()
  }, [movie])

  //   console.log(movie)

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <div className="absolute h-[500px] w-full bg-gradient-to-r from-black to-black/10 md:h-[95vh]"></div>
        {/* <div className="absolute h-[800px] w-full bg-gradient-to-b from-black to-black/10"></div> */}
        <img
          className="h-[500px] w-full object-cover md:h-[95vh]"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
      </div>

      <h1 className="pt-[50px] text-3xl font-bold md:text-5xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="text-md text-gray-400 md:text-lg">
        Released: {movie?.release_date}
      </p>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-lg">
        {truncateString(movie?.overview, 150)}
      </p>
      <div className="flex space-x-3 pt-[20px]">
        <button
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
          className="bannerButton bg-white text-black md:text-[18px]"
        >
          <FaPlay className="h-4 w-4 text-black md:h-6 md:w-6" />
          Play Trailer
        </button>

        <a href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank">
          <button className="bannerButton bg-[gray]/70 md:text-[18px]">
            <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More
            Info
          </button>
        </a>
      </div>
    </div>
  )
}

export default Banner
