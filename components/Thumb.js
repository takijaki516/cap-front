import Image from "next/image";

const Thumb = ({ imgUrl }) => (
  <Image
    placeholder="blur"
    blurDataURL="/placeholder.jpg"
    className="rounded-lg"
    layout="fill"
    objectFit="cover"
    src={imgUrl}
    alt="thumb"
  />
);

export default Thumb;
