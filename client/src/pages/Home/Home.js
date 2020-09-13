import React, { useState } from 'react'
import './Home.scss'
import { Route } from "react-router-dom"
import { Sidebar, Dialog } from 'components' 

const Home = () => {
  const [dialogId, setDialogId] = useState()

  return (
    <div className="Home">
      <div className="Home__column1">
        <Sidebar dialogId={dialogId} />
      </div>
      <div className="Home__column2">
        <Route render={() => <Dialog setDialogId={setDialogId} />} path="/:userToId" />
      </div>
    </div>    
  );
};

export default Home