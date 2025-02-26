import sgMail from "@sendgrid/mail"

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { name, email, subject, message } = req.body

    const content = {
      to: "matinnjt2000@gmail.com",
      from: "your-verified-sender-email@example.com", // This needs to be a verified sender in SendGrid
      subject: `New message from ${name}: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    }

    try {
      await sgMail.send(content)
      res.status(200).json({ status: "Ok" })
    } catch (error) {
      console.error("Error sending email", error)
      if (error.response) {
        console.error(error.response.body)
      }
      res.status(500).json({ error: "Error sending email" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}

