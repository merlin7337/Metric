import React, {useEffect, useState} from 'react';
import { useOutsideClick } from "../../Hooks/useOutsideClick";
import cl from "./Popup.module.css";
import {AnimatePresence, motion} from 'framer-motion';
import {createPortal} from "react-dom";

const calculateTop = (initialTop, initialHeight) => {
    return (initialTop + initialHeight / 2) + initialHeight / 10;
}

const Popup = ({containerRef, children, className, event="click", ...props}) => {
    const [visible, setVisible] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    const closePopup = () => {
        setVisible(false)
    }

    const ref = useOutsideClick(closePopup, event, containerRef)

    useEffect(() => {

        const updatePosition = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            setTop(calculateTop(rect.y / 2, rect.height));
            setLeft(rect.left)
        }

        updatePosition()

        window.addEventListener("resize", updatePosition)

        const handler = () => {
            setVisible(prev => !prev);
        }
        containerRef.current?.addEventListener(event, handler)

        return () => {
            containerRef.current?.removeEventListener(event, handler)
            window.removeEventListener("resize", updatePosition);
        }
    }, [])

    return createPortal((
        <AnimatePresence>
            {visible && (
                <motion.div transition={{duration: 0.15}} initial={{y: top - 10, opacity: 0}}
                            animate={{y: top, opacity: 1}}
                            exit={{y: top - 10, opacity: 0}}
                            onClick={closePopup} ref={ref}
                            style={{
                                top,
                                left
                            }}
                            className={`${cl.popupContainer} ${className}`} {...props}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    ), document.querySelector("#popups"));
};

export default Popup;