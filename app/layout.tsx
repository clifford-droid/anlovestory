import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Poppins,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "ANLoveStory",
  description:
    "Nnamdi John & Angel Nwanyim Wedding Invitation",

  openGraph: {
    title: "ANLoveStory",
    description:
      "Nnamdi John & Angel Nwanyim Wedding Invitation",
    type: "website",
    images: [
      {
        url: "/images/wedding-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Nnamdi John & Angel Nwanyim Wedding Invitation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ANLoveStory",
    description:
      "Nnamdi John & Angel Nwanyim Wedding Invitation",
    images: ["/images/wedding-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}