import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    onSnapshot(query(collection(db, "posts"), orderBy('timeStamp', "desc")), (snapshot) => {
      setPosts(snapshot.docs);
    });
    console.log(posts);
  }, []);

  console.log(posts);

  return (
    <div>
    
      {posts.map((post)=> (
        <Post
              key={post.id}
              img={post.data().image}
              id={post.id}
              username={post.data().username}
              userImg={post.data().profileImg}
              caption={post.data().caption}
            />
      ))}
        
    </div>
  );
};

export default Posts;
