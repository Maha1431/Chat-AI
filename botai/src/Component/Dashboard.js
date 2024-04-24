import React, { useState } from "react";
import icon from "../assests/image 29.png";
import chaticon from "../assests/image 31.png";
import data from "../sampleData.json";
import "./interface.css";
import ConversationPage from "./conversation";
import {useNavigate} from 'react-router-dom'

function Dashboard({}) {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [showConversation, setShowConversation] = useState(false);
  
  const navigate = useNavigate();

  


  const sendMessage = () => {
    if (!message.trim()) return; // If message is empty, do nothing
  
    setShowConversation(true);
    setMessage(""); // Clear message input after sending
  
    // Simulating AI response from JSON file
    const aiResponse = data[Math.floor(Math.random() * data.length)].response;
  
    // Add user's message and AI's response to the conversation
    const userMessage = `You: ${message}`;
    const newConversation = [...conversation, userMessage, `Bot AI: ${aiResponse}`];
    setConversation(newConversation);
   // Storing conversation array as a string
localStorage.setItem("conversation", JSON.stringify(newConversation));
  };
  
const handleSavebutton =(feedback, rating) => {
   
}
  
 
 
  const handleclick =() => {
    navigate('/conversations');
  }
  return (
    <div className="container">
      <div className="sidebar">
         <div className="header">
        <img src={icon} alt="icon" className="icon" />
        <h2 className="heading">New Chat</h2>
        <img src={chaticon} alt="...."  className="chat"/>
         </div>
        <div className="history">
        <button className="btn" onClick={handleclick}>Past Conversation</button>
        </div>
        
      </div>
      <div className="conversation">
        {!showConversation ? (
            <>
        <h6 className="heading1">Bot AI</h6>
        <div className="content">
        <h3>How Can I Help You Today?</h3>
        <img src={icon} alt=""  className="icon1"/>
        <div className='data-container'>
        <div className="box-container">
        <div className="box">
          <h4>Hi, what is the weather</h4>
          <p className="para">Get immediate AI generated response</p>
        </div>
        <div className="box">
          <h4>Hi, what is my location</h4>
          <p className="para">Get immediate AI generated response</p>
        </div>
        </div>
        <div className="box-container">
        <div className="box">
          <h4>Hi, what is the temperature</h4>
          <p className="para">Get immediate AI generated response</p>
        </div>
        <div className="box">
          <h4>Hi, how are you</h4>
          <p className="para">Get immediate AI generated response</p>
        </div>
        </div>
        </div>
        </div>
        </>
      ):( <ConversationPage conversation={conversation}
      />)}
        <form
          className="message-input"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
           className='inputbox'
          />
          <button type="submit"  className="ask">Ask</button>
          <button className="save"  onClick={handleSavebutton}>Save</button>
        </form>
        
       
      </div>
    </div>
  );
}

export default Dashboard;
