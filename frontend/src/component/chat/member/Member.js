import React from "react";
import "./Member.css";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { selectInfoServer } from "../../../features/infoServerSlice";
function Member(props) {
  const channel = props.channel;
  console.log(channel)
  return (
    <div className="member">
      <h4 className="member__status">Owners</h4>
      <div className="member__users">
          {"ownerIds" in channel &&
            channel.ownerIds.map((owner) => (
              <li key={owner._id} className="member__user user__on">
                <Avatar />
                {console.log("owner.name")}
                <h4>{owner.name}</h4>
              </li>
            ))}
      </div>
      <h4 className="member__status">Members</h4>
      <div className="member__users">
          {"MemberIds" in channel && channel.memberIds.map((member) => (
            <li key={member._id} className="member__user user__on">
              <Avatar />
              <h4>{member.name}</h4>
            </li>
          ))}
      </div>
    </div>
  );
}

export default Member;
