import {useEffect} from "react";

export function useAdaptive(callback: () => void) {
    useEffect(() => {
        callback();
        window.addEventListener("resize", callback);
        return () => {
            window.removeEventListener("resize", callback);
        }
    }, [])
}