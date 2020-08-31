import React from 'react'
import { NavLink } from 'react-router-dom'

const ChangePasswordStartTemplate = ({ loading, email, setEmail, resetHandler }) => {
   return (
      <div className="ChangePassword Form">
         <br />
         <NavLink to="/">На главную</NavLink>
         <br />
         <br />
         <div>
            <div className="Input">
               <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  className="yellow-input"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
         </div>
         <div className="button-wrap">
            <button
               className="button"
               onClick={resetHandler}
               disabled={loading || !email.length}
            >
               Подтвердить
            </button>
         </div>
      </div>
   )
}

export default ChangePasswordStartTemplate