import CardFlip from "@/components/kokonutui/card-flip";
import { Content } from "./content";
import { Hero } from "./hero";
import { CreditCard } from "@/components/experimental/nfc-card";
import CurrencyTransfer from "@/components/kokonutui/currency-transfer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Main() {
  return (
    <div className="relative size-screen portrait:flex items-center justify-center">
      <Hero />
      <div className="w-full space-x-4 flex items-center justify-center absolute z-100">
        <CurrencyTransfer />
        <div>
          <CreditCard
            className="bg-protap-blue"
            cardNumber="4532 1234 5678 9012"
            cardHolder="JOHN DOE"
            expiryDate="12/28"
            cvv="123"
            variant="visa"
          />
          <Link
            href={"/alpha"}
            className="text-zinc-400 p-4 text-center align-middle"
          >
            Landing A
          </Link>
        </div>
        <CardFlip />
      </div>
    </div>
  );
}
