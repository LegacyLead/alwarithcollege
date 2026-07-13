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
  const { parentName, phone, studentName, studentClass, message } = body;

  if (!parentName || !phone || !studentName || !studentClass) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'Al-Warith College Website <onboarding@resend.dev>',
      to: schoolEmail,
      replyTo: undefined,
      subject: `Admission inquiry: ${studentName} (${studentClass})`,
      text: [
        `New admission inquiry from the website:`,
        ``,
        `Parent/Guardian: ${parentName}`,
        `Phone: ${phone}`,
        `Student: ${studentName}`,
        `Class applying for: ${studentClass}`,
        `Message: ${message || '(none)'}`,
      ].join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error (admissions):', err);
    return NextResponse.json({ error: 'Could not send your inquiry right now. Please try again shortly.' }, { status: 502 });
  }
}
