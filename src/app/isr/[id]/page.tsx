import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const res = await fetch(`https://dummyjson.com/posts/${params.id}`);
  if (!res.ok) return { title: "Post not found" };

  const post: Post = await res.json();
  return { title: post.title, description: post.body.slice(0, 100) };
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/posts", {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.posts.map((post: Post) => ({ id: String(post.id) }));
}

export default async function Page({ params }: any) {
  const { id } = params;

  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return notFound();

  const post: Post = await res.json();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <Link
        href="/isr"
        className="mb-6 inline-block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        ← Back
      </Link>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700">{post.body}</p>
      <p className="mt-4 text-sm text-gray-500">User ID: {post.userId}</p>
    </div>
  );
}
