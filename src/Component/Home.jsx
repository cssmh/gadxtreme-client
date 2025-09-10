import { Helmet } from "react-helmet-async";
import BestSeller from "../Pages/BestSeller";
import NewArrivals from "../Pages/NewArrivals";
import PopularProducts from "../Pages/PopularProducts";
import TopCategories from "../Pages/TopCategories";
import Banner from "./Banner";
import OurService from "./OurService";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>GadXtreme | Tech Destination</title>
      </Helmet>
    <div className="space-y-5 lg:space-y-10">
        <Banner />
        <PopularProducts />
        <TopCategories />
        <NewArrivals />
        <BestSeller />
        <OurService />
      </div>
    </>
  );
};

export default Home;
