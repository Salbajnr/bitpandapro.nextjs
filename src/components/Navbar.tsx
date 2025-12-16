"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          NewBit
        </Link>
        <nav className="hidden sm:flex gap-4 text-sm text-gray-600 dark:text-gray-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/markets">Markets</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/trade">Trade</Link>
        </nav>
      </div>
    </header>
  );
}