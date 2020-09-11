import React from 'react'
import { getFormatedTime } from 'utils/date'

const Top = ({ userTo }) => {
   return (
      <div className="Dialog__top">
         <div className="Dialog__name">{userTo.name}</div>
         <div className="Dialog__status">
            {userTo.isOnline 
            ? <>
               <div className="circle"></div>
               <span>онлайн</span>
            </>
            : <span>{getFormatedTime(userTo.lastSeen)}</span>}
         </div>
      </div>
   )
}

export default Top