import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import HeroSection from "../components/HeroSection";

const HomeScreen = ({ history, location }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  return (
    <>
      <HeroSection />
    </>
  );
};

export default HomeScreen;
