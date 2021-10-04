import hotkeys, { KeyHandler } from 'hotkeys-js';
import { useEffect } from 'react';

const useHotKey = (keys: string, callback: KeyHandler) => {
  useEffect(() => {
    hotkeys(keys, callback);
    return () => hotkeys.unbind(keys, callback);
  }, [keys]);
};

export default useHotKey;
