"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 flex-col border-r bg-gray-50 dark:bg-gray-950 p-4">
      <nav className="space-y-2 text-sm">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/markets">Markets</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/trade">Trade</Link>
        <Link href="/auth">Auth</Link>
      </nav>
    </aside>
  );
}