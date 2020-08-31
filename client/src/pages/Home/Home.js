import React from 'react'
import './Home.scss'
import { Sidebar } from 'components'

const Home = () => {
  return (
    <div className="Home">
      <div className="Home__column1">
        <Sidebar />
      </div>
      <div className="Home__column2">

      </div>
    </div>    
  );
};

export default Home