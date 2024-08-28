// import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom.'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
// import Plans from '../components/Plans'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import useSubscription from '../hooks/useSubscription'
// import payments from '../lib/stripe'
import { Movie } from '../typings'
import requests from '../utils/requests'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  warMovies: Movie[]
  drama: Movie[]
  scienceMovies: Movie[]
  adventureMovies: Movie[]
  horrorMovies: Movie[]
  // products: Product[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  warMovies,
  drama,
  scienceMovies,
  adventureMovies,
  horrorMovies,
}: Props) => {
  const { user, loading } = useAuth()
  // const subscription = useSubscription(user)
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

  if (!user) return null

  // if (loading || subscription === null) return null

  // if (!subscription) return <Plans products={products} />

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>
          {movie?.title || movie?.original_name || 'Home'} - trailerNET
        </title>
        <link rel="icon" href="/NETFLIX_logo.png" />
        <meta
          name="description"
          content="Looking for the latest movie trailers and sneak peeks? Browse trailers for all the latest blockbuster hits, Hollywood gems, and everything in between. With our user-friendly interface, stay up-to-date on the hottest movies hitting the big screen with trailerNet!"
        />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner netflixOriginals={netflixOriginals} />

        <section className="flex flex-col space-y-[120px] md:space-y-[200px]">
          {/* My List */}
          {list.length > 0 && (
            <Row title="My List" id="my_list" movies={list} />
          )}
          <Row title="Trending Now" id="trending_now" movies={trendingNow} />
          <Row title="Top Rated" id="top_rated" movies={topRated} />
          <Row title="Action Thriller" id="action" movies={actionMovies} />
          <Row title="Comedy" id="comedy" movies={comedyMovies} />
          <Row title="Horror" id="horror" movies={horrorMovies} />
          <Row title="Adventure" id="adventure" movies={adventureMovies} />
          <Row title="War Action" id="war" movies={warMovies} />
          <Row title="Drama" id="drama" movies={drama} />
          <Row title="Science" id="science" movies={scienceMovies} />
        </section>
      </main>
      {showModal && <Modal />}
      <p className="mt-[50px] pb-[0px] text-center text-green-500 md:mt-[150px] md:mb-[10px] md:text-[16px]">
        Copyright © 2023 - trailerNET
      </p>
      <p className="mt-[10px] mb-[20px] pb-[30px]  text-center text-[14px] text-white/70 md:mb-[40px]">
        Developed by Ifeanyi Umeh
      </p>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  // const products = await getProducts(payments, {
  //   includePrices: true,
  //   activeOnly: true,
  // })
  //   .then((res) => res)
  //   .catch((error) => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    warMovies,
    drama,
    scienceMovies,
    adventureMovies,
    horrorMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    // fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchWarMovies).then((res) => res.json()),
    fetch(requests.fetchDrama).then((res) => res.json()),
    fetch(requests.fetchScienceMovies).then((res) => res.json()),
    fetch(requests.fetchAdventureMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      warMovies: warMovies.results,
      drama: drama.results,
      scienceMovies: scienceMovies.results,
      adventureMovies: adventureMovies.results,
      horrorMovies: horrorMovies.results,
    },
  }
}
