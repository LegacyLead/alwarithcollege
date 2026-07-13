import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const schoolEmail = process.env.SCHOOL_EMAIL;

  if (!apiKey || !schoolEmail) {
    return NextResponse.json(
      { error: 'Email is not configured yet. Set RESEND_API_KEY and SCHOOL_EMAIL in .env.local.' },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'Al-Warith College Website <onboarding@resend.dev>',
      to: schoolEmail,
      replyTo: email,
      subject: `Website message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error (contact):', err);
    return NextResponse.json({ error: 'Could not send your message right now. Please try again shortly.' }, { status: 502 });
  }
}
