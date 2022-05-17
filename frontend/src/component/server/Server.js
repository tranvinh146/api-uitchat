import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { fetchServerData, selectServer } from "../../features/serverSlice";
import { selectChannel } from "../../features/channelSlice";
import "./Server.css";
import AddSerVer from "./AddServer";
import { fetchChannelData } from "../../features/channelSlice";
import { fetchInfoServerData } from "../../features/infoServerSlice";
import { fetchInfoChannelData } from "../../features/infoChannelSlice";

function Server() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const servers = useSelector(selectServer);
  const { user: currentUser } = useSelector((state) => state.auth);
  // const channels = useSelector(selectChannel);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchServerData());
  }, []);

  // const handleOpenServer = (serverId) =>
  //   Promise.resolve(dispatch(fetchChannelData(serverId)))
  //     .then(() => dispatch(fetchInfoServerData(serverId)))
  //     .then(() => dispatch(fetchInfoChannelData(channels[0]._id, serverId)))
  //     .then(() => navigate(`/servers/${serverId}/${channels[0]._id}`));
  return (
    <div className="flexColumn">
      <div className="server">
        <div className="server__home">
          <Avatar
            onClick={() => {
              navigate("/servers/@me");
            }}
            className="server__avt"
            src="https://pngset.com/images/discord-icon-background-discord-logo-sphere-graphics-art-moon-transparent-png-792846.png"
          />
        </div>
        <div className="server__servers">
          {servers.map((server) => (
            <div key={server._id} className="server__server">
              <Link to={`${server._id}`} style={{ textDecoration: "none" }}>
                <Avatar
                  src={server.avatar}
                  // onClick={() => {
                  //   handleOpenServer(server._id);
                  // }}
                  className="server__avt"
                />
              </Link>
              <div className="hide">{server.name}</div>
            </div>
          ))}
        </div>
        <div className="server__footer">
          <AddSerVer dataFromParent={currentUser} />
        </div>
      </div>
      <div className="server__place">
        <Outlet />
      </div>
    </div>
  );
}
export default Server;
