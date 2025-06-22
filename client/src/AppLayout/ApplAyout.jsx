import Footer from "@/Footer";
import Header from "@/Header";

import {Outlet} from "react-router-dom";

const ApplAyout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ApplAyout;
