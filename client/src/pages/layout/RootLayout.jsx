import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { checkAuth } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import Cookies from "js-cookie";
import { getToken } from "../../utils/token";

const RootLayout = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!isAuth) {
      checkAuth(getToken())
        .then((res) => {
          dispatch(uiActions.setIsAuth(true));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
