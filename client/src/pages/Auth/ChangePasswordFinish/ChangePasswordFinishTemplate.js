import React from 'react'
import { NavLink } from 'react-router-dom'

const ChangePasswordFinishTemplate = ({ loading, password, setPassword, resetHandler }) => {
   return (
      <div className="row">
         <br />
         <NavLink to="/">На главную</NavLink>
         <br />
         <div className="col s6 offset-s3">
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Введите новый пароль</span>
                  <div>
                     <div className="input-field col s12">
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
                  <div className="">
                     <button 
                        className="btn yellow darken-4"
                        onClick={resetHandler}
                        disabled={loading || !password.length}
                     >
                        Подтвердить
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ChangePasswordFinishTemplate