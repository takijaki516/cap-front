import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Axios from "axios";
import { AuthProvider, useAuthState } from "../context/auth";
import { useEffect } from "react";

Axios.defaults.baseURL = "http://localhost:8800";
Axios.defaults.withCredentials = true;

export const fetcher = async (url) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
