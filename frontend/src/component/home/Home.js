import React, { useEffect } from "react";
import Server from "../server/Server";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <div className="home">
      home page
      <Outlet />
    </div>
  );
}

export default Home;
