import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { checkAuth } from "../../services/api";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth()
      .then(() => {
        dispatch(uiActions.setIsAuth(true));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
