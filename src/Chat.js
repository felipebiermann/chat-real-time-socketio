import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");
socket.on("connect", () =>
  console.log("[IO] Connect => A new connection has been established")
);

const Chat = () => {
  const [message, updateMessage] = useState("");
  const [messages, updateMessages] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      updateMessages([
        ...messages,
        {
          id: 1,
          message,
        },
      ]);
      updateMessage("");
    }
  };

  const handleInputChange = (event) => updateMessage(event.target.value);

  return (
    <main className="container">
      <ul className="list">
        {messages.map((m) => (
          <li className={"list__item list__item"} key={m.id}>
            <span className={"message message--mine"}>{m.message}</span>
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__field"
          onChange={handleInputChange}
          placeholder="Type a new message here"
          type="text"
          value={message}
        />
      </form>
    </main>
  );
};

export default Chat;
