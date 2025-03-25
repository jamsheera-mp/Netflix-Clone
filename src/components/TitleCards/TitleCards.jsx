

import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import {Link} from 'react-router-dom'




const TitleCards = ({title,category}) => {

  const [apiData,setApiData] = useState([])
  const cardsRef = useRef()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjU2MmI0NzM5NGVkODA0NDAxMGNkZWFlNTg2MDk4NyIsIm5iZiI6MTc0MjQyODUzNC43MDMsInN1YiI6IjY3ZGI1OTc2OWYzNThmNGExMzdmOGM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ZkMdQzKtZAEe0knyQY33-hnDpt4QSiQC9jJL0Weot0'
    }
  };
  

    const handleWheel = (e)=>{
      e.preventDefault()
      cardsRef.current.scrollLeft += e.deltaY
    }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])
 
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card_list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return  <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
            </Link>
        })}
      </div>
        
    </div>
  )
}

export default TitleCards