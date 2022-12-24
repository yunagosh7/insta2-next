import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, img, userImg, username, caption }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const { data: session } = useSession();

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name.split(" ").join("").toLocaleLowerCase(),
      timeStamp: serverTimestamp(),
      userImage: session.user.image,
    });
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timeStamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((likes) => likes.id === session?.user?.email) !== -1
    );
  }, [likes]);

  console.log(hasLiked);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.email));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.email), {
        username: session.user.name.split(" ").join("").toLocaleLowerCase(),
      });
    }
  };

  return (
    <div className="bg-white my-7 border border-rounded-sm">
      <div className="flex  p-5 items-center">
        <img
          src={userImg}
          className="rounded-full w-12 h-12 object-contain border p-1 mr-3"
          alt={username}
        />
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="w-6" />
      </div>
      <img src={img} alt="post" className="w-full" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className=" postBtn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className=" postBtn" />
            )}
            <ChatBubbleOvalLeftIcon
              className=" postBtn"
              style={{ transform: "rotatey(180deg)" }}
            />
            <PaperAirplaneIcon className=" postBtn -rotate-45" />
          </div>
          <BookmarkIcon className=" postBtn" />
        </div>
      )}

      <p className="p-5 truncate">
              
            {likes.length > 0 && (
              <p className="font-bold mb-1">{likes.length} likes</p>
            )}
        <span className="font-bold mr-1">{username} </span> {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((com) => (
            <div className="flex items-center space-x-2 mb-3" key={com.id}>
              <img
                src={com.data().userImage}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{com.data().username}</span>
                <span> {com.data().comment}</span>
              </p>
              <Moment className="pr-7 text-xs" fromNow>
                {com.data().timeStamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="w-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="border-none flex-1 focus:ring-0 outline-none"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400 "
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
