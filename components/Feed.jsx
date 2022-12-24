import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestion from "./Suggestions.jsx";
import { useSession } from "next-auth/react";
const Feed = () => {
  const { data: session } = useSession();
  return (
    <main className={`grid grid-cols-1 md:grid-colums-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl" } `}>
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>


      {session && (
        <section className="hidden xl:inline-grid">
          <div className="fixed top-20 ">
            <MiniProfile />
            <Suggestion />
          </div>
        </section>
      )}


    </main>
  );
};

export default Feed;
