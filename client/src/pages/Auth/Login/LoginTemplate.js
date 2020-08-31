import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginTemplate = ({ loading, form, changeHandler, loginHandler }) => {
   return (
      <div className="Login Form">
         <div>
            <div className="Input">
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

            <div className="Input">
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
               className="button"
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
   )
}

export default LoginTemplate