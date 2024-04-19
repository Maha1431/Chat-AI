import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAltOutlined";
import "./feedback.css";
import light from "../assests/image 34.png";
import Avatar from "@mui/material/Avatar";
import icon from "../assests/image 29.png";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";

function ConversationPage({ conversation, onUpdateConversation }) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);
  const [showRatingBar, setShowRatingBar] = useState(false);
  const [storedFeedback, setStoredFeedback] = useState("");
  const [storedRating, setStoredRating] = useState(0);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
    // Save rating value to local storage
    localStorage.setItem("rating", newValue.toString());
    setStoredRating(newValue);
  };

  

  const handleSubmitFeedback = () => {
    localStorage.setItem("feedback", feedback);
    setStoredFeedback(feedback);
    setFeedback("");
    // setRating(0);
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
            {typeof item === "string" && item.startsWith("You") ? (
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
                <div className="data1">
                  <p>{item}</p>
                  <span className="active">
                    {getCurrentTime()}

                    <ThumbUpIcon
                      onClick={handleThumbsUpClick}
                      style={{ cursor: "pointer" }}
                    />
                    <ThumbDownIcon
                      onClick={handleThumbsDownClick}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                
                  {showRatingBar && (
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
                
                <div className="details-fr">
                {storedFeedback && (
        
          <p>Feedback: {storedFeedback}</p>
        
      )}

      {storedRating > 0 && (
        <div className="stored-rating">
          <p>Rating: {storedRating}</p>
        </div>
      )}
      </div>
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
