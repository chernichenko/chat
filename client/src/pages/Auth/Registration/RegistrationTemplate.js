import React from 'react'
import { NavLink } from 'react-router-dom'

const RegistrationTemplate = ({ loading, form, changeHandler, registerHandler }) => {
   return (
      <div className="Registration Form">
         <br />
         <NavLink to="/">На главную</NavLink>
         <br />
         <br />
         <div>
            <div className="Input">
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
         <div className="">
            <button
               className="button"
               onClick={registerHandler}
               disabled={loading}
            >
               Регистрация
            </button>
         </div>
      </div>
   )
}

export default RegistrationTemplate