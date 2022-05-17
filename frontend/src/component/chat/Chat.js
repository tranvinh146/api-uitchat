import React, { useEffect } from "react";
import "./Chat.css";
import Member from "./member/Member";
import ChatHeader from "./chatHeader/ChatHeader";
import Message from "./message/Message";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfoChannelData } from "../../features/infoChannelSlice";
import { fetchChannelData } from "../../features/channelSlice";
import { selectInfoChannel } from "../../features/infoChannelSlice";
import { selectChannel } from "../../features/channelSlice";

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channelId, serverId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const channel = useSelector(selectInfoChannel);
  // const channels = useSelector(selectChannel);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(async () => {
    if (channelId) {
      dispatch(fetchInfoChannelData(channelId, serverId));
    } 
      // await dispatch(fetchChannelData(serverId));
      // await dispatch(fetchInfoChannelData(channels[0]._id, serverId));
    
  }, [channelId]);

  return (
    <div className="chat">
      <ChatHeader channel={channel} />
      <div className="chat__messAndMem">
        <div className="chat__mess">
          <div className="chat__messages">
            <Message />
            <Message />
            <Message />
          </div>
          <div className="chat__input">
            <AddCircleIcon fontSize="large" />
            <form action="">
              <input placeholder={`Message #Channel Name`} />
              <button className="chat__inputButton" type="submit">
                Send
              </button>
            </form>
            <div className="chat__inputIcons">
              <CardGiftcardIcon />
              <GifBoxIcon />
              <EmojiEmotionsIcon />
            </div>
          </div>
        </div>
        <Member channel={channel} />
      </div>
    </div>
  );
}

export default Chat;
