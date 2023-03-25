import React, { useContext } from 'react'
import {NavLink } from 'react-router-dom'
import { SidebarContext } from '../../../Context'
import cl from './Sidebar.module.scss'

export default function Sidebar(props) {
  const {isSidebarShown} = useContext(SidebarContext)
  if(isSidebarShown){
    return (
      <div className={cl.sidebar}>
        <div className={cl.links}>
          <NavLink to='/inbox' className={cl.link}>
            Inbox
            <div>
              {}
            </div>
          </NavLink>
          <NavLink to='/today' className={cl.link}>
            Today
            <div>
              {}
            </div>
          </NavLink>
          <NavLink to='/upcoming' className={cl.link}>Upcoming</NavLink>
        </div>
      </div>
    )
  }
}

