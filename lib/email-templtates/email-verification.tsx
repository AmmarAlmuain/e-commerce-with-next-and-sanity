import * as React from "react";
import {
  Html,
  Head,
  Heading,
  Hr,
  Text,
  Link,
  Container,
  Section,
} from "@react-email/components";

export default function EmailVerification({
  email,
  token,
  first_name,
  last_name,
}: {
  email: string;
  first_name: string;
  last_name: string;
  token: string;
}) {
  return (
    <Html lang="en">
      <Head>
        <title>Email Verification</title>
      </Head>
      <Container>
        <Heading
          style={{ fontSize: "24px", color: "#333", textAlign: "center" }}
        >
          Verify Your Email Address
        </Heading>
        <Hr style={{ margin: "16px 0", border: "1px solid #ddd" }} />
        <Section style={{ padding: "0 16px" }}>
          <Text style={{ fontSize: "16px", color: "#333" }}>
            Hello {first_name} {last_name},
          </Text>
          <Text style={{ fontSize: "16px", color: "#333" }}>
            Thank you for registering with us. Click the button below to verify
            your email!
          </Text>
          <Text style={{ textAlign: "center", margin: "24px 0" }}>
            <Link
              href={`http://localhost:3000/auth/email-verification?token=${token}`}
              style={{
                fontSize: "16px",
                color: "#1a73e8",
                textDecoration: "none",
                display: "inline-block",
                padding: "12px 24px",
                border: "1px solid #1a73e8",
                borderRadius: "4px",
              }}
            >
              Verify Email
            </Link>
          </Text>
          <Text style={{ fontSize: "16px", color: "#333" }}>
            If you didn't sign up, please ignore this email.
          </Text>
          <Text style={{ fontSize: "16px", color: "#333" }}>
            Best regards, <br /> Our Team
          </Text>
        </Section>
      </Container>
    </Html>
  );
}
