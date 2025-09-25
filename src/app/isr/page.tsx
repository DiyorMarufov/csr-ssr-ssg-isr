import { memo } from "react";

const Isr = async () => {
  const res = await fetch("https://dummyjson.com/posts", {
    next: { revalidate: 60 },
  });
  const json = await res.json();
  const data = json?.posts;
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-4 gap-6 max-md:grid-cols-3 max-sm:grid-cols-2">
      {data.map((user: any) => (
        <div
          key={user.id}
          className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 bg-white cursor-pointer"
        >
          <div className="h-48 w-full overflow-hidden">
            <img
              src={`https://picsum.photos/400/300?random=${user.id}`}
              alt={user.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {user.title}
            </h1>
            <p className="text-sm text-gray-500 capitalize line-clamp-4">
              {user.body}
            </p>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Isr);
