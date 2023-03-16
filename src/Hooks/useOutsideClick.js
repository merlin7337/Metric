import {useCallback, useEffect, useRef} from "react";

export const useOutsideClick = (
    then,
    event = 'mousedown',
    except,
) => {
    const ref = useRef(null);

    const handler = useCallback((e) => {
        const {target} = e;
        if (null === ref.current) {
            return;
        }

        if (!ref.current?.contains(target) && !except?.current?.contains(target)) {
            then();
        }
    }, []);

    useEffect(() => {
        window.addEventListener(event, handler);

        return () => window.removeEventListener(event, handler);
    }, [])

    return ref;
};