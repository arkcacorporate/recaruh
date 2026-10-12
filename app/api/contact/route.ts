import { NextResponse } from "next/server";

interface ContactRequestBody {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    let body: ContactRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload received in request." },
        { status: 400 }
      );
    }

    const fullName = body?.fullName?.trim();
    const email = body?.email?.trim();
    const phone = body?.phone?.trim() || "";
    const subject = body?.subject?.trim() || "General Inquiry";
    const message = body?.message?.trim();

    // Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid corporate or personal email address." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please share a few more details in your message (at least 10 characters).",
        },
        { status: 400 }
      );
    }

    // In a production environment with configured SMTP / CRM (SendGrid, Resend, HubSpot, etc.),
    // this is where the email dispatch or CRM webhook happens.
    console.log("Contact form submission received:", {
      fullName,
      email,
      phone,
      subject,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting RECARUH! Your inquiry has been received. Our team will get in touch with you within 24 business hours.",
        details: {
          name: fullName,
          email,
          subject,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error processing contact form submission:", err);
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      {
        success: false,
        error: `Error processing request: ${msg}`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      status: "online",
      endpoint: "/api/contact",
      methodsAllowed: ["POST"],
      description: "RECARUH corporate contact form submission endpoint",
    },
    { status: 200 }
  );
}
