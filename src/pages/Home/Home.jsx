

import React, { useState, useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const [heroMovie,setHeroMovie] = useState(null)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjU2MmI0NzM5NGVkODA0NDAxMGNkZWFlNTg2MDk4NyIsIm5iZiI6MTc0MjQyODUzNC43MDMsInN1YiI6IjY3ZGI1OTc2OWYzNThmNGExMzdmOGM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ZkMdQzKtZAEe0knyQY33-hnDpt4QSiQC9jJL0Weot0'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          setHeroMovie(data.results[Math.floor(Math.random() * data.results.length)]);
        }
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className='home'>
 <Navbar/>
 {heroMovie && (
 <div className="hero">
  <img src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`} alt="" className='banner-img' />
  <div className="hero-caption">
  <h1 className="movie-title">{heroMovie.title}</h1>
  <p className="movie-overview">{heroMovie.overview}</p>
    <div className="hero-btns">
      <button className='btn'><img src={play_icon} alt="" />Play</button>
      <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
    </div>
    <TitleCards/>
  </div>
 </div>

)}
<div className="more-cards">
  <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
  <TitleCards title={"Only on Netflix"} category={"popular"}/>
  <TitleCards title={"Upcoming"} category={"upcoming"}/>
  <TitleCards title={"Top Pics fo you"} category={"now_playing"}/>
</div>
<Footer/>

    </div>
  )
}

export default Home