import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "StudyFlow — Học tập có kế hoạch",
    template: "%s | StudyFlow",
  },
  description: "Theo dõi mục tiêu, nhiệm vụ và thời gian học của bạn.",
  openGraph: {
    siteName: "StudyFlow",
    locale: "vi_VN",
    type: "website",
  },
};

const themeBootstrap = `(()=>{const apply=(dark)=>{document.documentElement.dataset.theme=dark?"dark":"light";document.documentElement.style.colorScheme=dark?"dark":"light"};try{const s=localStorage.getItem("studyflow-theme");apply(s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches))}catch{apply(window.matchMedia("(prefers-color-scheme: dark)").matches)}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
