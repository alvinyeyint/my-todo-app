import './App.css'
import { useAppSetup } from '@hooks/useAppSetup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from '@components/Root'
import { LoadingOverlay } from '@mantine/core';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const init = useAppSetup();

  return (
    <QueryClientProvider client={queryClient}>
      {!init ? <LoadingOverlay visible overlayBlur={2} /> : <Root />}
    </QueryClientProvider>
    
  );
};

export default App;
