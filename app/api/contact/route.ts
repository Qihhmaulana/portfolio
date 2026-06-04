import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: "maulanafaqih54@gmail.com",
    replyTo: email,
    subject: `[Portfolio] Pesan dari ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:12px;">
        <h2 style="margin:0 0 16px;color:#111;">Pesan Baru dari Portfolio</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#555;width:80px;"><b>Nama</b></td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#555;"><b>Email</b></td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;border:1px solid #eee;">
          <p style="margin:0;color:#333;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
        </div>
        <p style="margin:16px 0 0;font-size:12px;color:#aaa;">Dikirim via maulanafaqih.dev</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
