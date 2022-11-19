const Thumb = ({ imgUrl }) => {
  // const imgSrc = imgUrl.length !== 0 ? imgUrl : "/noimage.jpg";

  return (
    <img
      className="rounded-lg object-fill w-full h-full overflow-hidden"
      src="/no_image.jpg"
      alt="thumb"
    />
  );
};

export default Thumb;
