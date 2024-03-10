import type { Metadata } from "next";
import { Nunito,Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getCannonicalUrl } from "@/utils";

const nuni = Nunito({ subsets: ["latin"] });
const jose  = Josefin_Sans({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL(getCannonicalUrl()),
  title: "Book Seller",
  description: "Find Books at Best price of good quality",
  openGraph:{
    images:[`/assets/og.jpeg`]
  },
  alternates:{
    canonical:"/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nuni.className}>
        <Header font={jose.className}/>
        <div className="bg-gray-951 py-12 mx-4">

        {children}
        </div>
        <Footer font={jose.className}/>
        </body>
    </html>
  );
}
