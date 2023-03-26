import React, { useContext } from 'react'
import cl from './Navbar.module.scss'
import { SidebarContext } from '../../../Context'
import { IoMenu } from "react-icons/io5"

export default function Navbar() {
  const {isSidebarShown, setIsSidebarShown} = useContext(SidebarContext)
  return (
    <div className={cl.navbar}>
      <button className={cl.menuButton} onClick={() => setIsSidebarShown(!isSidebarShown)}><IoMenu className={cl.menuIcon}/></button>
    </div>
  )
}
