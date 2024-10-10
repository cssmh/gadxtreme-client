// import FeaturedProducts from "../Pages/FeaturedProducts";
import PopularProducts from "../Pages/PopularProducts";
import TopCategories from "../Pages/TopCategories";
import Banner from "./Banner";
import OurService from "./OurService";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopCategories />
      <PopularProducts />
      {/* <FeaturedProducts /> */}
      <OurService />
    </div>
  );
};

export default Home;
