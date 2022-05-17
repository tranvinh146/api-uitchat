import React, { useEffect, useLayoutEffect } from "react";
import "./Chat.css";
import Member from "./member/Member";
import ChatHeader from "./chatHeader/ChatHeader";
import Message from "./message/Message";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchInfoChannelData } from "../../features/infoChannelSlice";

function Chat() {
  let { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInfoChannelData(channelId,serverId))
  }, [dispatch])
  return (
    <div className="chat">
      <ChatHeader />
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
        <Member />
      </div>
    </div>
  );
}

export default Chat;
