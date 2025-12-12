"use client";

import React, { useState, useEffect } from "react";
import { BsEmojiLaughing } from "react-icons/bs";
import { useSession, signOut } from "next-auth/react";
import EmojiPicker from "emoji-picker-react";

function InsertComment({
  clickReply,
  setClickReply,
  setShowLine,
}: {
  clickReply: boolean;
  setClickReply: any;
  setShowLine: any;
}) {
  const [comment, setComment] = useState<string>("");
  const [createCommentsLoader, setCreateCommentsLoader] =
    useState<boolean>(false);
  const [showPicker, setShowPicker] = useState(false);
  const { data: session, status } = useSession();

  function handleCommentSubmit(e: any) {
    e.preventDefault();
    return;
  }
  return (
    <section className="_insert_comments_ w-full h-[6rem] flex justify-start items-center gap-2 sm:gap-4 mb-0 mt-3">
      <section className="__left_ _image_ h-full  w-[60px] md:w-[51px] overflow-hidden flex items-start ">
        <section className="border-3 border-slate-300 w-full h-[50px] rounded-full overflow-hidden object-cover bg-cover  bg-amber-600">
          <img
            src={`${session?.user?.image}`}
            alt=""
            className="w-full h-full object-cover object-top bg-slate-600 "
          />
        </section>
      </section>
      <form onSubmit={handleCommentSubmit} className="__right_ w-full relative">
        <input
          disabled={createCommentsLoader}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onClick={() => {
            setClickReply(true);
          }}
          value={clickReply ? comment : ""}
          readOnly={!clickReply}
          placeholder="Add a comment..."
          type="text"
          className="w-full  border-b placeholder:font-semibold placeholder:text-[0.9rem] md:placeholder:text-[1rem] outline-none pb-1 cursor-text"
        />

        <section className="_comment-button_ w-full flex items-center justify-between mt-2  ">
          <section className="_left_ _emoji_ text-2xl cursor-pointer shadow-lg rounded-full">
            {clickReply && (
              <span onClick={() => setShowPicker(!showPicker)}>
                <BsEmojiLaughing />
              </span>
            )}
          </section>
          <section className="_right_ _handle_button_ flex gap-2 items-center justify-between ">
            {clickReply ? (
              <>
                <button
                  disabled={createCommentsLoader}
                  type="button"
                  onClick={() => {
                    setClickReply(false);
                    setShowLine(false);
                  }}
                  className="px-3 py-2 sm:px-5 md:px-6 md:py-3 rounded-full hover:bg-slate-200 font-semibold shadow cursor-pointer border-2 hover:text-slate-500 border-black text-[0.7rem] sm:text-[0.9rem] "
                >
                  Cancel
                </button>
                <button
                  disabled={createCommentsLoader}
                  type="submit"
                  className="px-3 py-2 sm:px-5 md:px-6 md:py-3 rounded-full bg-slate-950 text-white font-semibold shadow-md cursor-pointer border border-slate-400 flex items-center justify-center  text-[0.7rem] sm:text-[0.9rem] hover:text-blue-200"
                >
                  {createCommentsLoader ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    " Comment"
                  )}
                </button>
              </>
            ) : (
              <span className="_temporary-for-support_ px-5 py-[25px]"></span>
            )}
          </section>
        </section>
        {showPicker && (
          <div className="absolute -left-20  top-20 shadow-xl z-10">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                setComment((prev) => prev + emoji.emoji); // insert emoji
                setShowPicker(false);
              }}
            />
          </div>
        )}
      </form>
    </section>
  );
}

export default InsertComment;
