import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto my-2">
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
            <Link to="/category/earbuds">
              <img
                src={assets.brand_day}
                alt="Brand Day"
                className="w-full h-auto object-cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/category/earphones%20&%20headphones">
              <img
                src={assets.get_gadgets}
                alt="Best Mobile Protection"
                className="w-full h-auto object-cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/category/mobile%20accessories">
              <img
                src={assets.best_mobile}
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
            modules={[Autoplay]}
            className="mySwiper"
            slidesPerView={1}
            spaceBetween={10}
          >
            <SwiperSlide>
              <Link to="/category/earbuds">
                <img
                  src={assets.brand_day}
                  alt="Brand Day"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/earphones%20&%20headphones">
                <img
                  src={assets.get_gadgets}
                  alt="Best Mobile Protection"
                  className="w-full h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/category/best%20seller">
            <img
              src={assets.phone_pro}
              alt="Best Deal Banner"
              className="w-full h-[207px] object-cover"
            />
          </Link>
          <Link to="/category/mobile%20accessories">
            <img
              src={assets.best_mobile}
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
