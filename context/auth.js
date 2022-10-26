import {createContext, useContext, useEffect, useReducer, useState} from "react";
import Axios from "axios";

const StateContext = createContext({
  authenticated: false,
  user: null,
  loading: true,
})

const DispatchContext = createContext(null);

const reducer = (state, {type, payload}) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};


export const AuthProvider = ({children}) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  })

  const dispatch = (type, payload) => defaultDispatch({type, payload})

  // useEffect(() => {
  //   async function loadUser() {
  //     try {
  //       const res = await Axios.get("/auth/me");
  //       dispatch("LOGIN", res.data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       dispatch("STOP_LOADING");
  //     }
  //   }
  //
  //   loadUser();
  // }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useAuthDispatch = () => useContext(DispatchContext);
export const useAuthState = () => useContext(StateContext);
