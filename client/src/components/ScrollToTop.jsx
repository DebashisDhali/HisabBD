import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force immediate scroll to top on every route change
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Use instant for professional software feel, or 'smooth' if desired
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
