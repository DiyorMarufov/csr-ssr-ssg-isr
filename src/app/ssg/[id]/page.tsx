import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
}

interface SsgDetailProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: SsgDetailProps): Promise<Metadata> {
  const res = await fetch(`https://dummyjson.com/users/${params.id}`);
  const data: User = await res.json();

  return {
    title: `${data.firstName} ${data.lastName}`,
    description: data.email,
    openGraph: {
      images: [data.image],
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/users?limit=50");
  const data = await res.json();

  return data.users.map((user: User) => ({
    id: String(user.id),
  }));
}

const SsgDetail = async ({ params: { id } }: SsgDetailProps) => {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    cache: "force-cache",
  });

  const user: User = await res.json();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <Link
        href="/ssg"
        className="mb-6 inline-block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        ← Back
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={user.image}
          alt={user.firstName}
          width={400}
          height={400}
          className="rounded-xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-lg text-gray-600 mb-2">{user.email}</p>
          <p className="text-lg">
            <span className="font-semibold">Gender:</span> {user.gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SsgDetail;
