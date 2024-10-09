import PopularProducts from "../Pages/PopularProducts";
import TopCategories from "../Pages/TopCategories";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopCategories />
      <PopularProducts />
    </div>
  );
};

export default Home;
