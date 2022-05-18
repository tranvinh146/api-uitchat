import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./ServerPlace.css";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ServerPlace(props) {
  const { serverId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <div className="serverPlace">
      <Sidebar serverId={serverId} />
      <Outlet />
    </div>
  );
}
export default ServerPlace;
