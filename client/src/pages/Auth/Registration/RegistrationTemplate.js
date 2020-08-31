import React from 'react'
import { NavLink } from 'react-router-dom'

const RegistrationTemplate = ({ loading, form, changeHandler, registerHandler }) => {
   return (
      <div className="row registration">
         <br />
         <NavLink to="/">На главную</NavLink>
         <br />
         <div className="col s6 offset-s3">
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Регистрация</span>

                  <div>
                     <div className="input-field col s12">
                        <input
                           placeholder="Введите имя"
                           id="name"
                           type="text"
                           className="yellow-input"
                           name="name"
                           value={form.name}
                           onChange={changeHandler}
                        />
                     </div>

                     <div className="input-field col s12">
                        <input
                           placeholder="Введите email"
                           id="email"
                           type="text"
                           className="yellow-input"
                           name="email"
                           value={form.email}
                           onChange={changeHandler}
                        />
                     </div>

                     <div className="input-field col s12">
                        <input
                           placeholder="Введите пароль"
                           id="password"
                           type="password"
                           className="yellow-input"
                           name="password"
                           value={form.password}
                           onChange={changeHandler}
                        />
                     </div>

                  </div>
                  <div className="">
                     <button
                        className="btn yellow darken-4"
                        onClick={registerHandler}
                        disabled={loading}
                     >
                        Регистрация
                  </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default RegistrationTemplate