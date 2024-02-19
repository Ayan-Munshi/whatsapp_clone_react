import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function Sidebar_chats({ id, name, createnewchat }) {  // arguments comins from <Side_bar> component
  const [seedval, setseedval] = useState("");

  useEffect(() => {
    setseedval(
      Math.floor(Math.random() * 300) // this calculation is  for random avatar
    );
  }, []);

  const add_new_chat = () => {
    const chatroomname = prompt("Enter new chat room name");
           // If you don't mark the function as async, JavaScript won't wait for the asynchronous operation (like adding a document to Firestore) 
           // to complete before moving on to the next line of code. This means that other parts of your code might execute before the Firestore operation finishes.

    if (chatroomname) {
      async function addChatRoom() {
        try {
          const docRef = await addDoc(collection(db, "rooms"), {
            name: chatroomname,
          });
          console.log("Document written with ID: ", docRef.id); // if the code runs with no error then this
        } catch (e) {
          console.error("Error adding document: ", e); //e is the could be error
        }
      }

      addChatRoom(); // Invoking the function
    }
  };

  return !createnewchat ? (    // if this does not receives createnewchat (word) from <Sidebar> component then this section will design chat rooms else design + Add New Chat section
    <Link to={`/rooms/${id}`}>
    <div className="flex p-2 cursor-pointer  border-gray-400 border-b-[0.2px] hover:bg-gray-300">
      <Avatar src={`https://api.dicebear.com/7.x/bottts/svg?seed=${seedval}`} />{" "}
      {/* ...link of random avatar */}
      <div id="room name and info" className="m-2">
        <h2>{name}</h2>
        <p className="text-[10px] ">information....</p>
      </div>
    </div>
    </Link>
  ) : (
    <div onClick={add_new_chat}>
      <h2 className=" font-bold p-4  cursor-pointer  border-gray-400 border-b-[0.2px] hover:bg-gray-300 ">
        + Add New chat
      </h2>
    </div>
    
  );
}

export default Sidebar_chats;
