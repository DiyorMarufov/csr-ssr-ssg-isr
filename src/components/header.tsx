"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const Header = () => {
  const pathName = usePathname();

  const links = [
    { href: "/csr", label: "CSR" },
    { href: "/isr", label: "ISR" },
    { href: "/ssg", label: "SSG" },
    { href: "/ssr", label: "SSR" },
  ];

  return (
    <div className="flex gap-10 h-[60px] justify-center items-center">
      {links.map((link) => {
        const isActive = pathName === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              isActive ? "text-blue-500 font-bold underline" : "text-gray-700"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default memo(Header);
