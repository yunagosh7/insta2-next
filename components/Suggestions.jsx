import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const Sugestions = () => {
  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {
    const suggestionsList = [...Array(5)].map((_, i) => ({
      userId: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      company: faker.company.name(),
    }));
    setSuggestions(suggestionsList);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400 ">
          Suggestions for you
        </h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

      {suggestions.map((profile) => (
        <div key={profile.userId} className="flex items-center jusitfy-between">
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={profile.avatar}
            alt={profile.username}
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-small ">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">Works at {profile.company}</h3>
          </div>
          <button className="text-blue-400 text-xs font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Sugestions;
