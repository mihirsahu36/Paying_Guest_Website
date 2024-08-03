import React, { useState } from 'react';
import './files_css/FAQ.css'; // Assuming you have CSS for styling

const questionsAndAnswers = [
  { question: "Where is Sri Balaji PG located?", answer: "Sri Balaji PG is located at AECS LAyout, in the heart of the city, close to Brookefeild Mall." },
  { question: "How far is the PG from the nearest metro station?", answer: "The PG is approximately 1 km from the nearest metro station." },
  { question: "Are there any shopping malls nearby?", answer: "Yes, there are several shopping malls within a 2 km radius." },
  { question: "What is the nearest bus stop to Sri Balaji PG?", answer: "The nearest bus stop is just 200 meters away." },
  { question: "How far is the PG from the airport?", answer: "The PG is around 15 km from the airport." },
  { question: "Is there a hospital nearby?", answer: "Yes, there is a hospital just 1.5 km away." },
  { question: "Are there any parks or recreational areas nearby?", answer: "Yes, there is a park within a 500-meter walking distance." },
  { question: "Is the PG located in a safe area?", answer: "Yes, the PG is located in a very safe and secure neighborhood." },
  { question: "How far is the PG from the city center?", answer: "The PG is about 5 km from the city center." },
  { question: "Are there any gyms or fitness centers nearby?", answer: "Yes, there are several gyms and fitness centers within 1 km of the PG." },
  { question: "Do you provide meals at Sri Balaji PG?", answer: "Yes, we provide three meals a day – breakfast, lunch, and dinner." },
  { question: "What type of cuisine is served at the PG?", answer: "We serve a variety of cuisines including North Indian, South Indian, and Continental dishes." },
  { question: "Is there a separate kitchen for vegetarian and non-vegetarian food?", answer: "Yes, we have separate kitchens for vegetarian and non-vegetarian food." },
  { question: "Can I cook my own food in the PG?", answer: "Yes, there is a common kitchen available for residents to cook their own food." },
  { question: "Are the meals included in the rent?", answer: "Yes, the cost of meals is included in the rent." },
  { question: "Can we get food delivered from outside?", answer: "Yes, you can get food delivered from outside." },
  { question: "Do you cater to special dietary requirements?", answer: "Yes, we can cater to special dietary requirements with prior notice." },
  { question: "Is drinking water provided?", answer: "Yes, we provide purified drinking water." },
  { question: "Are snacks and beverages available?", answer: "Yes, snacks and beverages are available in the common dining area." },
  { question: "How is the quality of food maintained?", answer: "We ensure high-quality, hygienic food preparation and regularly review our food services." },
  { question: "What types of rooms are available at Sri Balaji PG?", answer: "We offer single, double, and triple sharing rooms." },
  { question: "Do the rooms have attached bathrooms?", answer: "Yes, all rooms have attached bathrooms." },
  { question: "Is there Wi-Fi available?", answer: "Yes, high-speed Wi-Fi is available throughout the PG." },
  { question: "Are there laundry services available?", answer: "Yes, we provide laundry services for our residents." },
  { question: "Is there a parking facility?", answer: "Yes, we have ample parking space available for residents." },
  { question: "Are the rooms air-conditioned?", answer: "Yes, we have both air-conditioned and non-air-conditioned rooms." },
  { question: "Is there a common room or lounge area?", answer: "Yes, we have a common room with TV and seating arrangements." },
  { question: "Are housekeeping services provided?", answer: "Yes, housekeeping services are provided daily." },
  { question: "Is there a 24/7 power backup?", answer: "Yes, we have 24/7 power backup to ensure uninterrupted power supply." },
  { question: "Do you provide bed linens and towels?", answer: "Yes, bed linens and towels are provided and changed regularly." },
  { question: "Is the PG secure?", answer: "Yes, the PG is very secure with 24/7 security personnel and CCTV surveillance." },
  { question: "Are there separate buildings for men and women?", answer: "Yes, we have separate buildings for men and women." },
  { question: "Is there a curfew time?", answer: "Yes, the curfew time is 10:00 PM for security reasons." },
  { question: "Are visitors allowed?", answer: "Visitors are allowed during specified hours and need to register at the front desk." },
  { question: "What security measures are in place?", answer: "We have biometric access control, CCTV cameras, and round-the-clock security personnel." },
  { question: "Can residents leave the PG at any time?", answer: "Residents can leave the PG anytime, but they must inform the management if they will be returning late." },
  { question: "Is there a fire safety system in place?", answer: "Yes, we have a comprehensive fire safety system in place." },
  { question: "Are valuables safe in the rooms?", answer: "Yes, each room has a lockable cupboard to store valuables." },
  { question: "What should I do in case of an emergency?", answer: "In case of an emergency, contact the front desk immediately, and they will assist you." },
  { question: "Do you have an intercom system?", answer: "Yes, we have an intercom system for easy communication within the PG." },
  { question: "What are the check-in and check-out times?", answer: "Check-in time is 12:00 PM, and check-out time is 11:00 AM." },
  { question: "Can I book a room online?", answer: "Yes, you can book a room online through our website." },
  { question: "What is the rent payment process?", answer: "Rent can be paid monthly via bank transfer, online payment, or cash." },
  { question: "Is there a minimum stay period?", answer: "Yes, the minimum stay period is one month." },
  { question: "Do you offer any discounts for long-term stays?", answer: "Yes, we offer discounts for residents staying for six months or more." },
  { question: "What documents are required for booking?", answer: "You need to provide a government-issued ID and address proof for booking." },
  { question: "Can I see the rooms before booking?", answer: "Yes, you can schedule a visit to see the rooms before booking." },
  { question: "What is the cancellation policy?", answer: "Cancellations must be made at least 7 days before the check-in date for a full refund." },
  { question: "Are pets allowed in the PG?", answer: "No, pets are not allowed in the PG." },
  { question: "How can I contact the management for more information?", answer: "You can contact the management through our website, email, or by calling our helpline number." },
  { question: "Custom Question......", answer: "You can send to us by sending a mail at sribalajicPG@gmail.com, Thankyou SO much!!!" },

];

const Chatbot = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e) => {
    const selected = e.target.value;
    setSelectedQuestion(selected);
    const found = questionsAndAnswers.find(qa => qa.question === selected);
    setAnswer(found ? found.answer : "");
  };

  return (
    <div className="chatbot-container">
      <div className="background-video-container">
        <video autoPlay loop muted>
          <source src="https://videos.pexels.com/video-files/1826896/1826896-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="header">
        <h1 className="title">Sri Balaji PG</h1>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/contact" className="nav-link">Contact Us</a>
          <a href="/about" className="nav-link">About Us</a>
        </nav>
      </div>
      <div className="chatbot-tile">
        <h1>Frequently Asked Questions</h1>
        <select value={selectedQuestion} onChange={handleQuestionChange} className="chatbot-select">
          <option value="">Select a question</option>
          {questionsAndAnswers.map((qa, index) => (
            <option key={index} value={qa.question}>{qa.question}</option>
          ))}
        </select>
        {answer && (
          <div className="chatbot-answer">
            <h2>Here You Go:</h2>
            <p>{answer}</p>
          </div>
        )}
      </div>
      <div className="footer">
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/faq" className="footer-link">FAQ</a>
        </div>
        <div>© 2024 Sri Balaji PG</div>
      </div>
    </div>
  );
};

export default Chatbot;
