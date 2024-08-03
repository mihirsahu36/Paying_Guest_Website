import React from 'react';
import './files_css/TermsOfService.css'; // Assuming you have CSS for styling

const TermsOfService = () => {
  return (
    <div className="terms-container">
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
      <div className="terms-tile">
        <h1>Terms of Service</h1>
        <div className="terms-content">
          <p>
            Terms of Service for SRI BALAJI PG
            1. Introduction
            Welcome to SRI BALAJI PG. These terms of service ("Terms") govern your stay at our PG accommodation. By residing at our PG, you agree to comply with and be bound by these Terms. Please read them carefully.
          </p>
          <p>
            2. Registration and Check-In
            Eligibility: You must be at least 18 years old to stay at our PG. Minors must be accompanied by a parent or legal guardian.
            Identification: All residents are required to provide valid government-issued identification (e.g., Aadhaar card, passport) at the time of check-in.
            Registration Form: Residents must complete a registration form providing accurate personal information.
          </p>
          <p>
            3. Payment Terms
            Rent: Rent must be paid in advance by the 5th of every month. Late payments may incur a penalty.
            Security Deposit: A security deposit equivalent to one month's rent is required at the time of booking. This deposit will be refunded at the end of your stay, subject to deductions for any damages or unpaid dues.
            Mode of Payment: Payments can be made via bank transfer, UPI, or cash.
          </p>
          <p>
            4. Resident Conduct
            Behavior: Residents are expected to behave respectfully towards other residents, staff, and neighbors. Any form of harassment, abuse, or disruptive behavior will not be tolerated.
            Cleanliness: Residents must maintain cleanliness in their rooms and common areas. Rooms should be kept tidy and free of clutter.
            Noise: Quiet hours are from 10:00 PM to 7:00 AM. Residents should avoid making excessive noise during these hours.
          </p>
          <p>
            5. Use of Facilities
            Common Areas: Common areas, such as the dining hall, lounge, and kitchen, should be used responsibly. Clean up after use and avoid monopolizing shared spaces.
            Utilities: Electricity, water, and internet usage should be reasonable. Wastage of resources may lead to additional charges.
            Cooking: Cooking is only allowed in designated areas. Ensure safety while using kitchen appliances and clean up after use.
          </p>
          <p>
            6. Prohibited Activities
            Substance Abuse: The use of drugs and alcohol is strictly prohibited on the premises.
            Illegal Activities: Engaging in any illegal activities, including but not limited to theft, vandalism, and violence, will result in immediate termination of residency and reporting to authorities.
            Pets: Pets are not allowed on the premises without prior approval from management.
          </p>
          <p>
            7. Safety and Security
            Fire Safety: Residents must comply with fire safety regulations and not tamper with fire safety equipment. In case of fire, follow the evacuation procedures.
            Personal Belongings: Residents are responsible for the safety of their personal belongings. The PG management is not liable for any loss or damage to personal items.
            Security: Do not share your keys or access codes with non-residents. Report any suspicious activity to the management immediately.
          </p>
          <p>
            8. Termination and Vacating
            Notice Period: Residents must provide a minimum of one month's notice before vacating the PG. Failure to do so may result in forfeiture of the security deposit.
            Room Inspection: Rooms will be inspected at the time of vacating. Any damages or unpaid dues will be deducted from the security deposit.
            Eviction: The management reserves the right to evict residents for non-compliance with these Terms, non-payment of rent, or any other valid reason.
          </p>
          <p>
            9. Liability
            Damage: Residents are responsible for any damage caused to the property. The cost of repairs will be deducted from the security deposit.
            Injury: The PG management is not liable for any injury or accident that occurs on the premises. Residents are advised to take necessary precautions.
          </p>
          <p>
            10. Amendments
            Changes to Terms: The management reserves the right to amend these Terms at any time. Residents will be notified of any changes, and continued residence will constitute acceptance of the new Terms.
          </p>
          <p>
            11. Contact Information
            If you have any questions or concerns about these Terms, please contact the management at:
            Phone: +91 98219 94491
            Email: sribalajicpg@gmail.com
            Address: AECS LAyout (See the Contact us section for exact details)
          </p>
          <p>
            By residing at SRI BALAJI PG, you agree to abide by these Terms of Service. Failure to comply with these Terms may result in disciplinary action, including eviction. Thank you for your cooperation and understanding.
          </p>
          <p>
            These terms are intended to create a safe and respectful living environment for all residents. You may need to customize them based on specific rules and regulations of your PG.
          </p>
        </div>
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

export default TermsOfService;
