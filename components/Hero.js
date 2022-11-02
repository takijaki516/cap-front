import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-128">
      <div
        className="relative flex flex-col-reverse h-full max-w-7xl 
      m-auto z-10 pb-12 text-center md:text-left md:pl-10"
      >
        <div className="text-white max-w-2xl px-4">
          <h2 className="text-2xl md:text-5xl font-bold pb-8">렌트허브</h2>
          <p className="text-lg md:text-xl">렌트허브 입니다..............</p>
        </div>
      </div>
      <Image
        priority
        objectFit="cover"
        objectPosition="center"
        layout="fill"
        src="/index_pic.jpg"
        alt="hero-image"
      />
    </div>
  );
};

export default Hero;
