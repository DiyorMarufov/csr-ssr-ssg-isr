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

const Ssg = async () => {
  const res = await fetch("https://dummyjson.com/users", {
    cache: "force-cache",
  });
  const json = await res.json();
  const data: User[] = json?.users;

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-4 gap-6 max-md:grid-cols-3 max-sm:grid-cols-2">
      {data.map((user) => (
        <Link
          key={user.id}
          href={`/ssg/${user.id}`}
          className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 bg-white cursor-pointer"
        >
          <div className="h-48 w-full overflow-hidden">
            <Image
              src={user.image}
              alt={user.firstName}
              width={300}
              height={200}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-green-600 font-bold text-lg">
                {user.gender}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Ssg;
