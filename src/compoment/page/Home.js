import React from 'react'
import BodyHome from '../common/BodyHome'
import PaginationHome from '../common/PaginationHome'
import SearchFill from '../common/SearchFill'
import '../scss/homemobile.scss'
import '../scss/home.scss'


const Home = () => {
  return (
    <div className='home'>
        <SearchFill/>
        <BodyHome/>
        <PaginationHome/>
    </div>
  )
}

export default Home