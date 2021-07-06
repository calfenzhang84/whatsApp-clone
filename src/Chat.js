import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import { useParams } from "react-router";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { firestore } from "firebase-admin";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  //console.log(message);
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }
    db.collection("rooms")
      .doc(roomId)
      .collection("message")
      .orderBy("timestamp", "asc")
      .onSnapshot(
        (
          snapshot //everytime data was pushed,  we get the new snapshot and update the result
        ) => setMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000)); //whenever load the sidebar, generate some random number
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomId)
      .collection("message")
      .add({
        message: input,
        name: user.displayName, //from google authorization
        timestamp: firestore.Timestamp.now().seconds * 1000, 
      });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at ... 
            {new Date(
              message[message.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {message.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && `chat__reciever`
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form action="">
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
