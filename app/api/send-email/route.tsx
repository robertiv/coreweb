import formData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY as string,
    });

    await mg.messages.create(process.env.MAILGUN_DOMAIN as string, {
      from: `Victor <admin@lycansro.com>`,
      to: [body.to],
      subject: body.subject,
      text: body.message,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error sending email" }, { status: 500 });
  }
}
