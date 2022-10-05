import { Avatar } from "@mui/material";

import { useRouter } from "next/router";
import { motion } from "framer-motion";

import user from "../dummydata/users.json";

const Input = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Avatar src={user.image} className="h-10 w-10 cursor-pointer" />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 font-medium w-full text-left"
          onClick={() => {
            router.push("/form");
          }}
        >
          포스팅 하기!!!
        </motion.button>
      </div>
    </div>
  );
};

export default Input;
