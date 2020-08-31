import React from 'react'
import { NavLink } from 'react-router-dom'

const ChangePasswordStartTemplate = ({ loading, email, setEmail, resetHandler }) => {
   return (
      <div className="row">
         <br />
         <NavLink to="/">На главную</NavLink>
         <br />
         <div className="col s6 offset-s3">
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Введите Ваш email</span>
                  <div>
                     <div className="input-field col s12">
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
                  <div className="">
                     <button 
                        className="btn yellow darken-4"
                        onClick={resetHandler}
                        disabled={loading || !email.length}
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

export default ChangePasswordStartTemplate