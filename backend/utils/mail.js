// mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingConfirmation = async (to, bookingDetails) => {
  const { movieTitle, date, seatNumber, time } = bookingDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Booking Confirmation",
    text: `Dear Customer,

Your booking has been confirmed for the movie "${movieTitle}" on ${date}.
Seat Number: ${seatNumber}
Showtime: ${time}

Thank you for choosing our service!`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
