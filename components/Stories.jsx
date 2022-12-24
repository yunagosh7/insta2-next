import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestionsList = [...Array(20)].map((_, i) => ({
      userId: i,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestionsList);
  }, []);
  const {data: session} = useSession()

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
    {session && (
      <Story img={session.user.image} username={session?.user?.name.split(" ").join("").toLocaleLowerCase()} />
    ) }
      {suggestions.map((profile, id) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
