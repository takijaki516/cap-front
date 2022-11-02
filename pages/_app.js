import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Axios from "axios";
import { AuthProvider } from "../context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 나중에 쿠키 보낼때 사용 할것임
// Axios.defaults.withCredentials = true;

export const fetcher = async (url) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
