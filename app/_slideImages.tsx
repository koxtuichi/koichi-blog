// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Post } from "@/notionApi/notion";
import { Container } from "semantic-ui-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";
import { useState } from "react";

import { Image } from "@chakra-ui/react";

type SlideImages = {
  post?: Post;
};
const SlideImages: React.FC<SlideImages> = ({ post }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  const postComponent = post && (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src={`blogImages/${index + 1}-${post.id}.png`}
              borderRadius={4}
              alt="slideImage"
            />
          </SwiperSlide>
        );
      })}
    </>
  );
  return (
    <Container>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {postComponent}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {postComponent}
      </Swiper>
    </Container>
  );
};

export default SlideImages;
