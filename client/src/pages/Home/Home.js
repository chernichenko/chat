import React from 'react'
import './Home.scss'
import { Route } from "react-router-dom"
import { Sidebar, Dialog } from 'components' 

const Home = () => {
  return (
    <div className="Home">
      <div className="Home__column1">
        <Sidebar />
      </div>
      <div className="Home__column2">
        <Route component={Dialog} path="/:id" />
      </div>
    </div>    
  );
};

export default Home