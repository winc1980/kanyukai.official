import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Propsで画像リストを受け取る
interface SlideShowProps {
  images: { src: string; alt: string }[];
}

const SlideShow2 = ({ images }: SlideShowProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image.src}
            alt={image.alt}
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideShow2;
