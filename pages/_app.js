import "../styles/globals.css";
import { AuthProvider } from "../context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ModalStateProvider } from "../context/modalContext";

// 나중에 쿠키 보낼때 사용 할것임
// Axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalStateProvider>
          <Component {...pageProps} />
        </ModalStateProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
