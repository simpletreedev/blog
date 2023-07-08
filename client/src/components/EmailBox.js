const EmailBox = ({ emailBoxRef }) => {
  return (
    <div className="emailBox" ref={emailBoxRef}>
      <div className="emailBox-container">
        <h2>Join 120,000+ Professional</h2>
        <p>
          Sign up for free and start receving your daily of cybersecurity news,
          insights and tips.
        </p>
        <form action="#" className="emailBox-form">
          <input type="text" placeholder="You e-mail address" />
          <button className="emailBox-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default EmailBox;
