import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { DocumentData } from 'firebase/firestore'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  movies: Movie[] | DocumentData[]
  id: string
}

function Row({ title, movies, id }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  //   console.log(movies)

  return (
    <div id={id} className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="my-[10px] w-56 cursor-pointer text-xl font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-3xl">
        {title}
      </h2>
      <div className="group relative border-b border-white/20 pb-[30px] md:-ml-2 md:pb-[40px]">
        <ChevronLeftIcon
          className={`absolute top-[33%] left-2 z-40 h-10  w-10 cursor-pointer text-green-300 opacity-0 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          className="flex items-center space-x-[10px] overflow-x-scroll scrollbar-hide md:space-x-[20px]  md:p-2"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-[33%] right-2  z-40 h-10  w-10 cursor-pointer text-green-300 opacity-0 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
