import Link from "next/link";
import { memo, ReactNode } from "react";

const Header = () => {
  return (
    <div className="flex gap-10 h-[60px] justify-center items-center">
      <Link href={"/csr"}>CSR</Link>
      <Link href={"/isr"}>ISR</Link>
      <Link href={"/ssg"}>SSG</Link>
      <Link href={"/ssr"}>SSR</Link>
    </div>
  );
};

export default memo(Header);
