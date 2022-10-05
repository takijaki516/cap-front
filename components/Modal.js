import { motion } from "framer-motion";

import { useRecoilValue } from "recoil";

import Backdrop from "./Backdrop";
import Post from "./Post";
import { getPostState } from "../atoms/postAtom";

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

const Modal = ({ handleClose, type }) => {
  const post = useRecoilValue(getPostState);

  return (
    <Backdrop onClick={handleClose}>
      {/* gifyouup 타입일 경우 */}
      {type === "gifYouUp" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className=" flex bg-[#1D2226] mx-6 rounded-lg"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 여기서 어떻게 분배 했지??? */}
          <motion.img
            alt=""
            onDoubleClick={handleClose}
            src={post.image_src}
            className="object-contain max-h-[80vh] w-4/5 max-w-3xl"
          />
          <div className="w-full md:w-3/5 bg-white dark:bg-[#1D2226] rounded-lg rounded-l-lg">
            <Post post={post} modalPost />
          </div>
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;
