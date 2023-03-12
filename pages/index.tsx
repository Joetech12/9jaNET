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
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  // products: Product[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { user, loading } = useAuth()
  // const subscription = useSubscription(user)
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

  // if (loading || subscription === null) return null

  // if (!subscription) return <Plans products={products} />

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>{movie?.title || movie?.original_name || 'Home'} - 9jaNET</title>
        <link rel="icon" href="/NETFLIX_logo.png" />
      </Head>

      {/* <Header /> */}

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

          <Row title="Comedy" id="comedies" movies={comedyMovies} />
          <Row title="Horror" id="horror" movies={horrorMovies} />
          <Row title="Romance" id="romance" movies={romanceMovies} />
          <Row
            title="Documentaries"
            id="documentaries"
            movies={documentaries}
          />
        </section>
      </main>
      {showModal && <Modal />}
      <p className="mt-[50px] pb-[0px] text-center text-[16px] text-green-500 md:mt-[100px] md:mb-[10px]">
        Copyright © 2022 - 9jaNET Nigeria
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
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
