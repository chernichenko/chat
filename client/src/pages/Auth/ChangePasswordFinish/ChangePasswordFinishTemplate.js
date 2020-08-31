import React from 'react'
import { NavLink } from 'react-router-dom'

const ChangePasswordFinishTemplate = ({ loading, password, setPassword, resetHandler }) => {
   return (
      <div className="ChangePassword Form">
         <br />
         <NavLink to="/">На главную</NavLink>
         <br />
         <br />
         <div>
            <div className="Input">
               <input
                  placeholder="Введите новый пароль"
                  id="password"
                  type="password"
                  className="yellow-input"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
         </div>
         <div className="button-wrap">
            <button
               className="button"
               onClick={resetHandler}
               disabled={loading || !password.length}
            >
               Подтвердить
            </button>
         </div>
      </div>
   )
}

export default ChangePasswordFinishTemplate