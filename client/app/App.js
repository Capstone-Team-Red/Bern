import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllListings, selectListings } from "../store/allListingsSlice";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  const listings = useSelector(selectListings);

  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
