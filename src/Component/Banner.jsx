import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { assets } from "../assets/Assets";

const Banner = () => {
  const { best_mobile, brand_day, get_gadgets, phone_pro } = assets;

  return (
    <div className="container mx-auto my-2">
      <div className="block lg:hidden">
        <Swiper
          speed={500}
          grabCursor={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={10}
        >
          <SwiperSlide>
            <img
              src={brand_day}
              alt="Brand Day"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={get_gadgets}
              alt="Best Mobile Protection"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={best_mobile}
              alt="Premium"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Swiper
            speed={500}
            grabCursor={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
            slidesPerView={1}
            spaceBetween={10}
          >
            <SwiperSlide>
              <img
                src={brand_day}
                alt="Brand Day"
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={get_gadgets}
                alt="Best Mobile Protection"
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <img
              src={phone_pro}
              alt="Best Deal Banner"
              className="w-full h-[207px] object-cover"
            />
          </div>
          <div>
            <img
              src={best_mobile}
              alt="Premium"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
