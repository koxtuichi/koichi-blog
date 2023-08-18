// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Post } from "@/notionApi/notion";
import styled from "@emotion/styled";
import { Image } from "semantic-ui-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";
import { useState } from "react";

const ImageComponent = styled(Image)({
  "> *": {
    borderRadius: "2px",
    margin: "0 auto 4px auto",
  },
  width: "60vw",
});

type SlideImages = {
  post?: Post;
};
const SlideImages: React.FC<SlideImages> = ({ post }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  const postComponent = post && (
    <>
      {Array.from({ length: 4 }).map((_, index) => {
        let url = null;
        if (index === 0) {
          url = post.url;
        } else if (index === 1) {
          url = post.url2;
        } else if (index === 2) {
          url = post.url3;
        } else {
          url = post.url4;
        }
        return (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ImageComponent src={url} />
          </SwiperSlide>
        );
      })}
    </>
  );
  return (
    <div style={{ padding: "0 10vw" }}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={false}
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
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {postComponent}
      </Swiper>
    </div>
  );
};

export default SlideImages;
