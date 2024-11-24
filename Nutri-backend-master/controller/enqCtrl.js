const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const nodemailer = require("nodemailer");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(updatedEnquiry);
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ message: error.message });
  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    const getallEnquiry = await Enquiry.find();
    res.json(getallEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});


const sendFeedbackEmail = async (to, userName, staffMember, originalComment, feedback) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "synergyvines@gmail.com",
      pass: "qrnxkjjeeoctxkxu",
    },
  });

  let info = await transporter.sendMail({
    from: '"Synergy Vines" <your-email@gmail.com>',
    to: to,
    subject: "Your Enquiry and Feedback",
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
        <p style="font-size: 18px; text-align: left; margin: 0;">
          Hello ${userName},<br/><br/>
          Warm greetings and I trust this mail finds you well.<br/><br/>
          
          <div style="width: 100%; box-sizing: border-box;">
            <div style="border: 2px solid #ced4da; margin-bottom: 10px;  box-sizing: border-box;">
              <h1 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">
                Your Enquiry:
              </h1>
              <p style="margin-top: 10px; text-align: left; padding: 5px;">${originalComment}</p>
            </div>
            
            <div style="border: 2px solid #ced4da; margin-bottom: 10px;  box-sizing: border-box;">
              <h1 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">
                Our Feedback:
              </h1>
              <p style="margin-top: 10px; text-align: left; padding: 5px;">${feedback}</p>
            </div>
          </div>

          <br/><br/>
          <div style="text-align: left;">
            Thank you for your continued business and support, we value you so much.<br/><br/>
            Kind Regards,<br/>
            ${staffMember}
          </div>
          
          <br/><br/>
          <div style="text-align: center; margin-top: 20px;">
            <a href="#" style="text-decoration: none; margin: 0 10px;">
              <img src="https://ci3.googleusercontent.com/meips/ADKq_NZqVjDCetyaSxLtCMYa7niUuyl4cgoeaBe4VLQ9NqTV16--ChwzzhxKlPq0b-3GsPApEXEufLUcQP9n1NMjsklpxss-muJHgMVSTSK1g6HlVzJ80w-U5CANzyd1n3Bko6tQOlBnvNbPE-AS4gc0XA0vWQ=s0-d-e1-ft#https://img.alicdn.com/imgextra/i1/O1CN01xLrsa11jAFvuNTXkJ_!!6000000004507-2-tps-114-114.png" alt="Instagram" style="width: 24px; height: 24px;"/>
            </a>
            <a href="#" style="text-decoration: none; margin: 0 10px;">
              <img src="https://ci3.googleusercontent.com/meips/ADKq_NYz8TKpWEJM8IN900AQLGhE6UU8VSQZsvnbestS4RdRtbIapiFUm28c8phr9ZTqUW5PWgp5mHeQZYRPhEnaCYjEm8a9eQAG0rEcTB1c4DuxFnQ-M6Y_JMw7yhsv_c_7nnWv6oGj549yz31LkKnEmNth0w=s0-d-e1-ft#https://img.alicdn.com/imgextra/i1/O1CN01iBKpmg20cVpshErkl_!!6000000006870-2-tps-114-114.png" alt="Twitter" style="width: 24px; height: 24px;"/>
            </a>
            <a href="https://fb.me/6Qf0mqFaH" style="text-decoration: none; margin: 0 10px;">
              <img src="https://ci3.googleusercontent.com/meips/ADKq_NYvOG6omClLtsC-1ShfnxDl0Klcakq_ymaFADtGg4MRwEBrUOJstZp7XGAJ-y4tzV5tAQ8IKMqufie1QRRecaybwks1djpMXkf507F0wKqj5Y1wFBYdpteFWFD3MxVRLXUIVTtdyz0I2t7l-VvcsVN4iQ=s0-d-e1-ft#https://img.alicdn.com/imgextra/i2/O1CN01jle56A1kzq9jUdfNT_!!6000000004755-2-tps-114-114.png" alt="Facebook" style="width: 24px; height: 24px;"/>
            </a>
          </div>
          
        </p>
      </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};




const submitFeedback = asyncHandler(async (req, res) => {
  const { id, feedback, userName, staffMember, originalComment } = req.body;
  try {
    // Find the enquiry by ID
    const updatedEnquiry = await Enquiry.findById(id);

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    // Update the enquiry with the feedback
    updatedEnquiry.feedback = feedback;
    await updatedEnquiry.save();

    // Send an email with the feedback and the original comment
    await sendFeedbackEmail(updatedEnquiry.email, userName, staffMember, originalComment, feedback);

    res.json({ message: "Feedback submitted and email sent successfully!" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
  submitFeedback,
};
