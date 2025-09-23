import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if a media query matches.
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the query matches
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false); // initially false

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => {
      setMatches(mediaQueryList.matches);
    };

    updateMatch(); // Set the match on mount

    // Add listener
    mediaQueryList.addEventListener?.('change', updateMatch);
    mediaQueryList.addListener?.(updateMatch); // Safari fallback

    return () => {
      mediaQueryList.removeEventListener?.('change', updateMatch);
      mediaQueryList.removeListener?.(updateMatch); // Safari fallback
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

// * USAGE
// const isMobile = useMediaQuery('(max-width: 639px)');
// const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
// const isDesktop = useMediaQuery('(min-width: 1024px)');
