import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import cl from './Navbar.module.css'
import menu from '../../../Images/UI Icons/menu.svg'
import { SidebarContext } from '../../../Context'

export default function Navbar() {
  const {isSidebarShown, setIsSidebarShown} = useContext(SidebarContext)
  return (
    <div className={cl.navbar}>
      <button className={cl.menu} onClick={() => setIsSidebarShown(!isSidebarShown)}><ReactSVG src={menu}/></button>
    </div>
  )
}
