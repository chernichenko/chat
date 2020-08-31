import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginTemplate = ({ loading, form, changeHandler, loginHandler }) => {
   return(
      <div className="row login">
         <div className="col s6 offset-s3">
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Вход</span>

                  <div>
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

                  <NavLink to="/password">Забыли пароль?</NavLink>

                  <div className="button-wrap">
                     <button 
                        className="btn yellow darken-4"
                        onClick={loginHandler}
                        disabled={loading}
                     >
                        Войти
                     </button>
                  </div>

                  <div className="to-registration-wrap">
                     <p className="">Нет аккаунта?</p>
                     <NavLink to="/registration">Регистрация</NavLink>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LoginTemplate