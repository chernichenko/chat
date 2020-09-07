import React, { useState } from 'react'
import searchSvg from 'assets/icons/search.svg'

const Search = ({ initialDialogs, dialogs, setDialogs }) => {
   const [search, setSearch] = useState('')

   const changeHandler = e => {
      if (e.target.value) {
         const filteredDialogs = dialogs
            .filter(dialog => dialog.name.toLowerCase().includes(e.target.value.toLowerCase()))
         setDialogs(filteredDialogs)
      } else {
         setDialogs(initialDialogs)
      }
      
      setSearch(e.target.value)
   }

   return (
      <div className="Input Input__search">
         <input
            placeholder="Поиск среди контактов"
            type="text"
            name="search"
            value={search}
            onChange={changeHandler}
         />
         <div className="Search">
            <img src={searchSvg} alt="search" />
         </div>
      </div>
   )
}

export default Search