import Image from "next/image";

const Thumb = ({ imgUrl }) => {
  let imgSrc;
  if (!!imgUrl) {
    imgSrc = `data:image/png;base64,${imgUrl.image}`;
  } else {
    imgSrc = "/no_image.jpg";
  }

  // const imgSrc =
  // imgUrl.length !== 0 ? `data:image/jpeg;base53,${imgUrl}` : "/no_image.jpg";

  return (
    <Image
      className="rounded-lg object-fill w-full h-full overflow-hidden"
      // src="/no_image.jpg"
      src={imgSrc}
      alt="thumb"
      layout="fill"
    />
  );
};

export default Thumb;
