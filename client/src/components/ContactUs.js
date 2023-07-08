import React from "react";
import Title from "./Title";

const ContactUs = () => {
  return (
    <div className="contactUs">
      <div className="contactUs-container">
        <Title title="Contact Us" />
        <div className="contactUs-list">
          <p>Would you like to get in touch with us?</p>
          <p>Got news tips or more information on a topic we've discussed?</p>
          <p>
            Experiencing any problems with the site or like to share your
            feedback or suggestions?
          </p>
          <p>Excellent!</p>
          <p>
            All queries can be emailed to — <b>admin@thehackernews.com</b>
          </p>
          <p>
            For more information on our advertising opportunities, please visit
            our <a href="#">advertising page</a>.
          </p>
          <p>
            The best way to make sure you don't miss any of our articles is to{" "}
            <a href="#">sign up for our daily newsletter</a>. Once you sign up,
            make sure you click on the confirmation link you receive via an
            email to start your free subscription.
          </p>
          <p>
            Subscribing to our <a href="#">Telegram channel</a> and{" "}
            <a href="#">RSS feed</a> will also help you stay up to date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
