import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import AccountBank from "./components/AccountBank";
import Header from "./components/Header";
import Transactions from "./components/Transactions";
import { AppProvider } from "./context/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AppProvider>
          <Header />
          <AccountBank />
          <Transactions />
        </AppProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
