const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/send-email', (req, res) => {
  const { name, email, company, subject, message } = req.body;

  // Create a transporter object using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'chathuryakaravita@gmail.com',
      pass: 'Wiranga@1234',
    },
  });

  // Set up email options
  const mailOptions = {
    from: email,
    to: 'chathuryakaravita@gmail.com',
    subject: `Contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nSubject: ${subject}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
