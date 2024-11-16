import NewArrivals from "../Pages/NewArrivals";
import PopularProducts from "../Pages/PopularProducts";
import TopCategories from "../Pages/TopCategories";
import Banner from "./Banner";
import OurService from "./OurService";
// import RoyalEnfield from "./RoyalEnfield";

const Home = () => {
  return (
    <div>
      <Banner />
      <NewArrivals />
      <TopCategories />
      <PopularProducts />
      {/* <RoyalEnfield /> */}
      <OurService />
    </div>
  );
};

export default Home;
