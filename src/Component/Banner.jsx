import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto my-[6px]">
      <div className="block lg:hidden">
        <Swiper
          speed={500}
          grabCursor={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={10}
        >
          <SwiperSlide>
            <Link to="/category/earbuds">
              <img
                src={assets.ramadan}
                alt="Brand Day"
                className="w-full h-auto object-cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/category/earphones%20&%20headphones">
              <img
                src={assets.iphone16}
                alt="Best Mobile Protection"
                className="w-full h-auto object-cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/category/mobile%20accessories">
              <img
                src={assets.s25}
                alt="Premium"
                className="w-full h-auto object-cover"
              />
            </Link>
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
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
            slidesPerView={1}
            spaceBetween={10}
          >
            <SwiperSlide>
              <Link to="/category/earbuds">
                <img
                  src={assets.ramadan}
                  alt="Brand Day"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/earphones%20&%20headphones">
                <img
                  src={assets.iphone16}
                  alt="Best Mobile Protection"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/lifestyle">
                <img
                  src={assets.s25}
                  alt="Best Mobile Protection"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col space-y-1">
          <Link to="/category/best%20seller">
            <img
              src={assets.soundcore}
              alt="Best Deal Banner"
              className="w-full h-auto object-cover"
            />
          </Link>
          <Link to="/category/mobile%20accessories">
            <img
              src={assets.universe}
              alt="Premium"
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
