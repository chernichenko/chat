import React from 'react'
import './Home.scss'
import { Sidebar, Dialog } from 'components' 

const Home = () => {
  return (
    <div className="Home">
      <div className="Home__column1">
        <Sidebar />
      </div>
      <div className="Home__column2">
        <Dialog /> 
      </div>
    </div>    
  );
};

export default Home