import React from 'react'
import { getFormatedTime } from 'utils/date'

const Top = ({ userTo }) => {
   return (
      <>
      {userTo.name && <div className="Dialog__top">
         <div className="Dialog__name">{userTo.name}</div>
         <div className="Dialog__status">
            {userTo.isOnline 
            ? <>
               <div className="circle"></div>
               <span>онлайн</span>
            </>
            : <span>{getFormatedTime(new Date(userTo.lastSeen))}</span>}
         </div>
      </div>}
      </>
   )
}

export default Top