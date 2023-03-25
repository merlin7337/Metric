import React from 'react'
import cl from './FullModal.module.scss'

export default function FullModal({children, visible, setVisible}) {
    const rootClasses = [cl.modal]
    if(visible){
        rootClasses.push(cl.active)
    }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
