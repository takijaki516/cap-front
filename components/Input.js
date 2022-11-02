import { Avatar } from "@mui/material";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useAuthState } from "../context/auth";

import user from "../dummydata/users.json";

const Input = ({ className }) => {
  const router = useRouter();

  const { userEmail, setUserEmail } = useAuthState();

  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <div className="flex flex-col items-center justify-start border-1 rounded-md p-1">
          <Avatar src={user.image} className="h-5 w-5" />
          <div className="text-sm">{`${userEmail}`}</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border p-2 border-gray-400 py-2.5 px-3 font-medium w-full text-left"
          onClick={() => {
            router.push("/form");
          }}
        >
          상품등록 하기
        </motion.button>
      </div>
    </div>
  );
};

export default Input;
