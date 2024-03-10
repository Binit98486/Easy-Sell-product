import type { Metadata } from "next";
import { getCannonicalUrl } from "@/utils";
export const metadata: Metadata = {
 metadataBase: new URL(getCannonicalUrl()),

  title: "Book Seller-upload",
  description: "Upload your books here",
  openGraph:{
    images:[`/assets/og.jpeg`]
  },
  alternates:{
    canonical:"/products/upload"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div>
 {children}
</div>
  );
}
