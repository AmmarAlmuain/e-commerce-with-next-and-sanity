import { H1, H2, H4, Large, Small } from "@/components/ui/typography";
import {
  Clock,
  CreditCard,
  Headset,
  Lock,
  Package,
  Package2,
  Phone,
  Recycle,
  Rocket,
  Timer,
  Trophy,
} from "lucide-react";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queries = await searchParams;
  if (queries?.email_verification_token) {
    const token: string = queries.email_verification_token as string;
  }
  return (
    <>
      <main className="p-8 max-sm:p-0">
        {/* features section */}
        <section className="p-8 space-y-8 max-sm:border-none border-t border-r border-l  border-muted">
          <H2 className="border-none">
            Connecting You, Empowering Possibilities
          </H2>
          <p>Discover the latest mobile phones with unbeatable prices.</p>
        </section>
        <section className="p-8 gap-8 maxsm:border-none border border-muted flex-wrap flex justify-between items-center">
          <FeaturesItem
            icon={<Clock size={32} />}
            title="Fasted Delivery"
            sub_title="Lightning Speed Delivery: Get your hands on the latest mobile phones within 24 hours."
          />
          <FeaturesItem
            icon={<Trophy size={32} />}
            title="Unbeatable Prices"
            sub_title="Best Deals: Get exclusive discounts on top brands like Apple, Samsung, and more."
          />
          <FeaturesItem
            icon={<Lock size={32} />}
            title="Authentic Products"
            sub_title="Genuine Guarantee: Only original, certified mobile phones directly from the manufacturers."
          />
          <FeaturesItem
            icon={<Phone size={32} />}
            title="24/7 Customer Support"
            sub_title="We're Here for You: Round-the-clock assistance to help with any inquiries or issues."
          />
          <FeaturesItem
            icon={<CreditCard size={32} />}
            title="Secure Payment Options"
            sub_title="Safe Transactions: Multiple payment methods with top-notch security for a worry-free shopping experience."
          />
          <FeaturesItem
            icon={<Recycle size={32} />}
            title="Easy Returns & Exchanges"
            sub_title="Hassle-Free Policies: Quick and simple return and exchange process within 30 days of purchase."
          />
        </section>
      </main>
    </>
  );
}

function FeaturesItem({
  icon,
  title,
  sub_title,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  sub_title: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full space-y-4 flex-col justify-start max-w-96 h-full flex gap-x-4 ${className ? className : ""}`}
    >
      <div className="text-primary">{icon}</div>
      <div className="space-y-2">
        <H4 className="leading-none">{title}</H4>
        <p className="opacity-70">{sub_title}</p>
      </div>
    </div>
  );
}
