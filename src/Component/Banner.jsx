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
            <Link to="/category/best%20seller">
              <img
                src={assets.ramadanBanner}
                alt="Brand Day"
                className="w-full h-auto object-cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/product/iphone_16_pro_max/6759a3f4c4cc9a848286cba9">
              <img
                src={assets.iphone16}
                alt="Best Mobile Protection"
                className="w-full h-auto object-cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/product/galaxy_s25_ultra_5g/67d06998d74ef252c73a4d98">
              <img
                src={assets.s25}
                alt="Premium"
                className="w-full h-auto object-cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/category/smartwatch">
              <img
                src={assets.zeblaze}
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
              <Link to="/category/best%20seller">
                <img
                  src={assets.ramadanBanner}
                  alt="Brand Day"
                  className="w-full lg:h-[445px] 2xl:h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/product/iphone_16_pro_max/6759a3f4c4cc9a848286cba9">
                <img
                  src={assets.iphone16}
                  alt="Best Mobile Protection"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/product/galaxy_s25_ultra_5g/67d06998d74ef252c73a4d98">
                <img
                  src={assets.s25}
                  alt="Best Mobile Protection"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/smartwatch">
                <img
                  src={assets.zeblaze}
                  alt="Best Mobile Protection"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col space-y-1">
          <Link to="/product/anker_soundcore_liberty_4_pro_nc_tws_earbud/67cfd53f700aa4ef554357e0">
            <img
              src={assets.soundcore}
              alt="Best Deal Banner"
              className="w-full h-auto object-cover"
            />
          </Link>
          <Link to="/category/more">
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
