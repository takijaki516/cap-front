import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-128">
      <div className="relative flex flex-col-reverse h-full max-w-7xl m-auto z-10 pb-12 text-center md:text-left">
        <div className="text-white max-w-2xl px-4">
          <h2 className="text-2xl md:text-5xl font-bold pb-8">안녕하세요</h2>
          <p className="text-lg md:text-xl">
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
          </p>
        </div>
      </div>
      <Image
        priority
        objectFit="cover"
        objectPosition="center"
        layout="fill"
        src="https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="hero-image"
      />
    </div>
  );
};

export default Hero;
