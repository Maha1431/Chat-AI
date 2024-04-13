import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAltOutlined";
import "./feedback.css";
import light from "../assests/image 34.png";
import Avatar from "@mui/material/Avatar";
import icon from "../assests/image 29.png";
import Card from "@mui/material/Card";

function ConversationPage({ conversation, onSaveFeedback,  onUpdateConversation  }) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);
  const [showRatingBar, setShowRatingBar] = useState(false);
  
 
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

   // Load rating from local storage when component mounts
   useEffect(() => {
    const savedRating = localStorage.getItem("rating");
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, []);
  const handleSubmitFeedback = () => {
  
   onSaveFeedback(feedback, rating);
 // Construct the updated conversation array with feedback appended to the last bot message
 const updatedConversation = conversation.map((item, index) => {
  if (
    typeof item === "string" && // Check if item is a string
    item.startsWith("Bot AI") // Check if the string starts with "Bot AI"
  ) {
    // Append feedback to the last Bot AI message
    return (
     
       `${item} Feedback: ${feedback} Rating: ${rating}`   
    )
  }
  return item;
});
console.log(updatedConversation);

    // Combine conversation and feedback data
    const dataToSave = {
      conversation: conversation,
      feedback: feedback,
      rating: rating,
    };
    
    // Save data to local storage
    localStorage.setItem("conversation", JSON.stringify(dataToSave));
// Pass the updated conversation to the parent component
onUpdateConversation(updatedConversation);


    setFeedback("");
    setRating(0);
    setShowFeedbackSection(false);
    setShowRatingBar(false);
    
  };
   
  

  const handleThumbsUpClick = (index) => {
    setShowRatingBar(true);
    setShowFeedbackSection(false);
  };

  const handleThumbsDownClick = () => {
    setShowFeedbackSection(true);
    setShowRatingBar(false);
  };

  const handleCloseFeedback = () => {
    setShowFeedbackSection(false);
  };

 
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const formattedHours = hours < 10 ? "0" + hours : hours; // Add leading zero for single-digit hours
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero for single-digit minutes
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  return (
    <div className="chatbox">
      <div className="conversation-container">
        {conversation.map((item, index) => (
          <div key={index} className="message-container">
             {typeof item === "string" && item.startsWith("You")   ? (
              <Card className="user-message">
                <Avatar
                  alt="Travis Howard"
                  src="/static/images/avatar/2.jpg"
                  className="avatar"
                />
                <div className="data">
                  <p>{item}</p>
                  <span>{getCurrentTime()}</span>
                </div>
              </Card>
            ) : (
              <Card className="bot-message">
                <img src={icon} alt="icon" className="icon1" />
                <div className="data">
                  <p>{item}</p>
                  <span className="active">{getCurrentTime()}
                  
                    <ThumbUpIcon
                      onClick={handleThumbsUpClick}
                      style={{ cursor: "pointer" }}
                    />
                    <ThumbDownIcon
                      onClick={handleThumbsDownClick}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                
                  { showRatingBar && (
                    <div className="rating-bar">
                      <p>Rate this Response:{rating}</p>
                      <Rating
                        name="conversation-rating"
                        value={rating}
                        onChange={(event, newValue) => {
                          handleRatingChange(newValue);
                        }}
                      />
                    </div>
                  )}
                </div>
            
              </Card>
            )}
          </div>
        ))}
      </div>

      {showFeedbackSection && (
        <div className="feedback-section">
          <div className="feedback">
            <img src={light} alt="..." />
            <h3>Provide Additional Feedback </h3>
            <span onClick={handleCloseFeedback}>X</span>
          </div>
          <textarea
            rows="5"
            cols="50"
            value={feedback}
            onChange={handleFeedbackChange}
            className="textarea"
          ></textarea>
          <button onClick={handleSubmitFeedback} className="submitbtn">
            Submit{" "}
          </button>
        </div>
      )}
    </div>
  );
}
export default ConversationPage;
