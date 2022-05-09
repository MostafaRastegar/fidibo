/**
 * @function
 * @name usePrevious
 * @description Return previous value (happens before update in useEffect above)
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';

type PropI = string | number | boolean | null;
const usePrevious = (value: PropI) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef(null);
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

export default usePrevious;
