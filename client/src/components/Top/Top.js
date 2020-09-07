import React from 'react'

const Top = ({ name }) => {
   return (
      <div className="Dialog__top">
         <div className="Dialog__name">{name}</div>
         <div className="Dialog__status">
            <div className="circle"></div>
            <span>онлайн</span>
         </div>
      </div>
   )
}

export default Top