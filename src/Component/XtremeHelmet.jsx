import { Helmet } from "react-helmet-async";

const XtremeHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | GadXtreme</title>
    </Helmet>
  );
};

export default XtremeHelmet;
