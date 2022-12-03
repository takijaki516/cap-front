import { useEffect, useState } from "react";
import Image from "next/image";
import Moment from "react-moment";
import "moment/locale/ko";
import Axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useAuthState } from "../context/auth";

const TableItem = ({ item }) => {
  const [token, setToken] = useState("");
  const { setUserEmail } = useAuthState();
  const router = useRouter();

  const queryClient = useQueryClient();

  let imgSrc;
  if (!!item.imageReturnFormList[0]) {
    imgSrc = `data:image/png;base64,${item.imageReturnFormList[0].image}`;
  } else {
    imgSrc = "/no_image.jpg";
  }

  // comma won
  let commaPrice = [];
  let counter = 0;
  for (let i = item.price.length - 1; i >= 0; i--) {
    if (counter === 3) {
      commaPrice.unshift(",");
      commaPrice.unshift(item.price[i]);
      counter = 1;
      continue;
    }
    counter++;
    commaPrice.unshift(item.price[i]);
  }

  const statusMutation = useMutation({
    mutationFn: async (type) => {
      const url = `http://110.12.218.147:8080/api/v1/board/status?board_id=${item.board_id}&status=${type}`;
      try {
        const res = await Axios.post(
          url,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        setUserEmail("");
        localStorage.removeItem("auth");
        router.push("/");
        return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBoard"] });
    },
  });

  // TODO: delete 오류 왜?????
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const url = `http://110.12.218.147:8080/api/v1/board/delete?board_id=${item.board_id}`;
      try {
        const res = await Axios.post(
          url,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.result === "success") {
          window.alert("성공");
          router.push("/homepage");
        }
      } catch (err) {
        window.alert("다시 로그인해주세요");
        setUserEmail("");
        localStorage.removeItem("auth");
        router.push("/");
        return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBoard"] });
    },
  });

  // token 확인
  useEffect(() => {
    const storageData = localStorage.getItem("auth");
    if (!!storageData) {
      const tokenData = JSON.parse(storageData).data;
      setToken(tokenData);
    } else {
      setToken("");
    }
  }, []);

  const statusTypeCSS = (type) => {
    if (type === "0") {
      return "statusGreen";
    }
    if (type === "1") {
      return "statusYellow";
    }
    if (type === "2") {
      return "statusOrange";
    }
  };

  const statusTypeText = (type) => {
    if (type === "0") {
      return "렌탈가능";
    }
    if (type === "1") {
      return "사용중";
    }
    if (type === "2") {
      return "완료";
    }
  };

  return (
    <tr className="text-gray-700">
      <td className="px-4 py-3 border">
        <div className="flex items-center text-sm">
          <div className="relative w-12 h-12 mr-3  md:block">
            <Image
              className="object-cover w-full h-full  rounded-lg"
              src={imgSrc}
              alt="product"
              loading="lazy"
              layout="fill"
            />
          </div>
          <div>
            <p className="font-semibold text-black">{item.title}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-ms font-semibold border">
        {commaPrice.join("")} 원
      </td>
      <td className="px-4 py-3 text-xs border">
        <span
          className={`px-2 py-1 font-semibold leading-tight ${statusTypeCSS(
            item.status
          )} `}
        >
          {statusTypeText(item.status)}
        </span>
      </td>

      <td className="px-4 py-3 text-sm font-semibold border">
        <Moment fromNow ago>
          {item.created_at}
        </Moment>
        전
      </td>

      <td className="text-sm  border">
        <div className="flex font-semibold leading-tight text-sm items-center  justify-around">
          <span
            onClick={() => statusMutation.mutate(0)}
            className="p-2 statusGreen cursor-pointer"
          >
            렌탈가능
          </span>
          <span
            onClick={() => statusMutation.mutate(1)}
            className="p-2 statusYellow cursor-pointer"
          >
            사용중
          </span>
          <span
            onClick={() => statusMutation.mutate(2)}
            className="p-2 statusOrange cursor-pointer"
          >
            완료
          </span>
          <span
            onClick={() => deleteMutation.mutate()}
            className="p-2 statusRed cursor-pointer"
          >
            삭제
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TableItem;
