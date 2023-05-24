import { useEffect, useState } from 'react';
import { setupResponseInterceptor, setupRequestInterceptor, } from '@utils/axios-interceptor';

export function useAppSetup() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setupRequestInterceptor();
    setupResponseInterceptor();
    setInit(true);
  }, []);

  return init;
}
