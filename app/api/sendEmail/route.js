import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse the request body
    const { email } = await req.json();

    // Validate email input
    if (!email || !validateEmail(email)) {
      return new Response(
        JSON.stringify({ message: "Invalid email address" }),
        { status: 400 }
      );
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail App Password
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"Aftershock" <${process.env.GMAIL_USER}>`,
      to: "denzelnyatsanza@gmail.com",
      subject: "New Aftershock Join Request from Website",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #FF5733;">New Aftershock Join Request</h2>
          <p>A new person has requested to join Aftershock. Here are their details:</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email Address:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                <a href="mailto:${email}" style="color: #007BFF;">${email}</a>
              </td>
            </tr>
          </table>
          <br/>
          <p style="font-size: 0.9em; color: #555;">This is an automated email from Aftershock.</p>
        </div>
      `,
    };
    

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Error sending email", error: error.message }),
      { status: 500 }
    );
  }
}

// Helper function to validate email format
function validateEmail(email) {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
  return emailRegex.test(email);
}
