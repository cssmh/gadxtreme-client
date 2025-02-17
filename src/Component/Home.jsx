import BestSeller from "../Pages/BestSeller";
import NewArrivals from "../Pages/NewArrivals";
import PopularProducts from "../Pages/PopularProducts";
import TopCategories from "../Pages/TopCategories";
import Banner from "./Banner";
import OurService from "./OurService";

const Home = () => {
  return (
    <>
      <Banner />
      <PopularProducts />
      <TopCategories />
      <NewArrivals />
      <BestSeller />
      <OurService />
    </>
  );
};

export default Home;
