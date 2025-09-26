import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Recipe } from "../page";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const res = await fetch(`https://dummyjson.com/recipes/${params.id}`, {
    cache: "no-store",
  });
  if (!res.ok) return { title: "Recipe not found" };

  const recipe: Recipe = await res.json();
  return {
    title: recipe.name,
    description: `Cuisine: ${recipe.cuisine} | Difficulty: ${recipe.difficulty}`,
    openGraph: { images: [recipe.image] },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return notFound();

  const recipe: Recipe = await res.json();

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <Link
        href="/ssr"
        className="mb-6 inline-block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        ← Back
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={500}
          height={400}
          className="rounded-xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">{recipe.name}</h1>
          <p className="text-lg text-gray-600 mb-4">
            Cuisine: {recipe.cuisine}
          </p>
          <p className="text-lg">Difficulty: {recipe.difficulty}</p>
          <p className="text-lg text-yellow-500">⭐ {recipe.rating}</p>
        </div>
      </div>
    </div>
  );
}
