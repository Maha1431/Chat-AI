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

function ConversationPage({ conversation, onsaveButton }) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);
  const [showRatingBar, setShowRatingBar] = useState(false);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(
    null
  );
  const [conversationsFeedback, setConversationsFeedback] = useState([]);
  const [conversationsRating, setConversationsRating] = useState([]);




  useEffect(() => {
    // Initialize feedback and rating arrays from localStorage, or set to empty arrays if no data is available
    const storedFeedback = JSON.parse(localStorage.getItem("Feedbackarr")) || [];
    const storedRating = JSON.parse(localStorage.getItem("Ratingarr")) || [];
    setConversationsFeedback(storedFeedback);
    setConversationsRating(storedRating);
  }, []);


  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };



  const handleRatingChange = (newValue, index) => {
    setRating(newValue);
    // Create a copy of the existing ratings array
    const updatedRatings = [...conversationsRating];
    // Update the rating value at the specified index
    updatedRatings[index] = newValue;
    // Set the updated ratings array in state
    setConversationsRating(updatedRatings);
    // Filter out null values and store the updated ratings array in localStorage
    const filteredRatings = updatedRatings.filter(value => value !== null);
    localStorage.setItem("Ratingarr", JSON.stringify(filteredRatings));
  };

  const handleSubmitFeedback = () => {
    if (selectedConversationIndex !== null) {
      const updatedFeedback = [...conversationsFeedback];
      updatedFeedback[selectedConversationIndex] = feedback;
      setConversationsFeedback(updatedFeedback);
     

      // Filter out null values and store the updated feedback array in localStorage
      const filteredFeedback = updatedFeedback.filter(value => value !== null);
      localStorage.setItem("Feedbackarr", JSON.stringify(filteredFeedback));
      setFeedback("");
      setShowFeedbackSection(false);
    }
  };

  const handleThumbsUpClick = (index) => {
    setShowRatingBar(true);
    setShowFeedbackSection(false);
    setSelectedConversationIndex(index);
  };

  const handleThumbsDownClick = (index) => {
    setShowFeedbackSection(true);
    setShowRatingBar(false);
    setSelectedConversationIndex(index);
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
                      onClick={() => handleThumbsUpClick(index)}
                      style={{ cursor: "pointer" }}
                    />
                    <ThumbDownIcon
                      onClick={() => handleThumbsDownClick(index)}
                      style={{ cursor: "pointer" }}
                    />
                  </span>

                  {showRatingBar  && selectedConversationIndex === index && (
                    <div className="rating-bar">
                      <p>Rate this Response:{rating}</p>
                      <Rating
                        name="conversation-rating"
                        value={rating}
                        onChange={(event, newValue) => {
                          handleRatingChange(newValue, index);
                        }}
                      />
                    </div>
                  )}

                  
                    {/* Display feedback and ratings */}
                    {conversationsFeedback[index] && (
                      <div>
                        <p>Feedback: {conversationsFeedback[index]}</p>
                      </div>
                    )}
                    {conversationsRating[index] && (
                      <div>
                        <p>Rating: {conversationsRating[index]}</p>
                        <Rating
                          name="conversation-rating"
                          value={conversationsRating[index]}
                          readOnly
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
            cols="40"
            value={feedback}
            onChange={handleFeedbackChange}
            className="textarea"
          ></textarea>
          <button
            onClick={handleSubmitFeedback}
            className="submitbtn"
          >
            Submit{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default ConversationPage;
