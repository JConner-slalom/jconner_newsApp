"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SubscriptionIndicator from "./components/subButton";
import Link from "next/link";
import { SubscriptionProvider } from "./context/subscriptionContext";
import { Suspense } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
                <SubscriptionProvider>
                    <Header />
                    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">{children}</main>
                    <Suspense fallback={<div className="w-full h-20 bg-zinc-200 animate-pulse rounded mt-8" />}>
                        <Footer />
                    </Suspense>
                </SubscriptionProvider>
            </body>
        </html>
    );
}

function Header() {
    return (
        <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black sticky top-0 z-50">
            <nav className="flex items-center justify-between max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <img src="/jc.svg" alt="JC Logo" className="h-7 w-auto" />
                    </Link>
                    <Link href="/" className="text-zinc-700 dark:text-zinc-200 hover:underline">Home</Link>
                    <Link href="/search" className="text-zinc-700 dark:text-zinc-200 hover:underline">Search</Link>
                </div>
                <SubscriptionIndicator />
            </nav>
        </header>
    );
}

function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black py-4 mt-8">
            <div className="max-w-6xl mx-auto px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} JC News. All rights reserved.
            </div>
        </footer>
    );
}
