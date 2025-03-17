import { Helmet } from "react-helmet-async";

const GadHelmet = ({ title }) => {
  const capitalizeTitle = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Helmet>
      <title>{capitalizeTitle(title)} | GadXtreme</title>
    </Helmet>
  );
};

export default GadHelmet;
