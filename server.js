// server.js

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors middleware

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Use cors middleware to enable CORS
app.use(cors());

// Route to send email
app.post("/send-email", async (req, res) => {
  const { email, subject, text } = req.body;

  // Create Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gengcangkui@gmail.com", // Your Gmail email address
      pass: "ewui kulg vimh vefz", // Your Gmail password
    },
  });

  // Email message
  let mailOptions = {
    from: "gengcangkui@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
