import { PoemPost } from "@/notionApi/poemNotion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Text } from "@chakra-ui/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './styles.css';

type VerticalPoemSwipeProps = {
  poems: PoemPost[];
};
const VerticalPoemSwipe: React.FC<VerticalPoemSwipeProps> = ({ poems }) => {
  return (
    <Swiper
      direction='vertical'
      scrollbar={true}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Mousewheel, Pagination, Scrollbar, Autoplay]}
      className="poemSwiper"
      >
      {poems.map((item) => (
        <SwiperSlide>
          <Text
            fontFamily="initial"
            fontStyle="oblique"
            fontSize="16px"
            color="#4D4D4D"
            whiteSpace="pre-wrap"
          >
            {item.content}
          </Text>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VerticalPoemSwipe;
