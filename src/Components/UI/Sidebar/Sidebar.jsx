import React, { useContext } from 'react'
import {NavLink } from 'react-router-dom'
import { SidebarContext } from '../../../Context'
import cl from './Sidebar.module.css'

export default function Sidebar() {
  const {isSidebarShown} = useContext(SidebarContext)
  if(isSidebarShown){
    return (
      <div className={cl.sidebar}>
        <div className={cl.links}> 
          <NavLink to='/inbox' className={cl.link} >Inbox</NavLink>
          <NavLink to='/today' className={cl.link}>Today</NavLink>
          <NavLink to='/upcoming' className={cl.link}>Upcoming</NavLink>
        </div>
      </div>
    )
  }
}

