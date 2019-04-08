import { useEffect, useRef } from 'react';

/**
 * Usage:
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 */
export default (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
