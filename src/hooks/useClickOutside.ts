import { useEffect, useState, RefObject } from 'react';

const useClickOutside = (ref: RefObject<HTMLDivElement>) => {
  const [isClickOutside, setOutside] = useState(false);
  const handler = (e: MouseEvent) => {
    if (ref.current && e.target) {
      if (ref.current.contains(e.target as HTMLDivElement)) {
        setOutside(false);
      } else {
        setOutside(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref]);
  return isClickOutside;
};

export default useClickOutside;
