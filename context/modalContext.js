import { createContext, useContext, useState } from "react";

const ModalStateContext = createContext();

export const ModalStateProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false);

  return (
    <ModalStateContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalStateContext.Provider>
  );
};

export const useModalState = () => useContext(ModalStateContext);
