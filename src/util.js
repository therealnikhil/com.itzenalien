import { useLayoutEffect, useState } from 'react';

export const useSquare = (ref) => {
  const [height, setHeight] = useState(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref]);

  return height;
};