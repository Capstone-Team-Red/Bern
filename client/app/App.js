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

  // I'm guessing you might be leaving this here because you'll come back to it -- but just in case, I wanted to leave a reminder to clean up any unused code :)
  const listings = useSelector(selectListings);

  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
