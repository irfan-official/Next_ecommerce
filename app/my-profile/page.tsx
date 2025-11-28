"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { fetchWithRetry } from "@/context/DataContext";
import { VscUnverified } from "react-icons/vsc";
import { VscVerifiedFilled } from "react-icons/vsc";

interface ProfileData {
  name: string;
  email: string;
  image: string;
}

export default function MyProfilePage() {
  const { data: session, status, update } = useSession();

  const router = useRouter();

  const [editForm, setEditForm] = useState(false);
  const [updateFormField, setUpdateFormField] = useState(false);
  const [updateFormFieldLoader, setUpdateFormFieldLoader] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    image: "",
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  // Populate profile data once session is loaded
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    }
  }, [status, session]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [profileData.image]);

  if (status === "loading") {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        <span className="loading loading-spinner loading-xl scale-200"></span>
      </div>
    );
  }

  if (!session?.user) return null; // user will be redirected

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateFormField(true);
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateFormField) {
      return;
    }

    try {
      // Replace with your update API call

      setUpdateFormFieldLoader(true);

      const res = await fetchWithRetry(() =>
        fetch("/api/profile-update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        })
      );
      const result = await res.json();

      if (result.success) {
        await update({
          name: result.name,
          email: result.email,
          image: result.image,
          isEmailVerified: session?.user?.isEmailVerified,
        });

        setProfileData({
          name: result.name,
          email: result.email,
          image: result.image,
        });

        swal({ icon: "success", title: "profile update successfully!" });
        setEditForm(false);
        setUpdateFormField(false);
        router.refresh();
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setUpdateFormFieldLoader(false);
      setUpdateFormField(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full min-h-[50vh] py-5  flex  flex-col gap-5 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[25rem] md:w-[35rem] mt-10 md:mt-20 flex flex-col items-center gap-2 p-4 md:p-5 py-10 rounded shadow bg-white"
        >
          <div className="__image__ w-24 h-24 border-3 border-slate-300 rounded-full overflow-hidden mb-2">
            {profileData.image ? (
              <img
                src={profileData.image}
                alt={profileData.name}
                width={96}
                height={96}
                className="object-cover object-top w-full h-full"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full" />
            )}
          </div>

          <div className="_verified_ w-full flex items-center justify-center gap-2 text-2xl mb-5">
            <h2 className="c">
              {session?.user?.isEmailVerified ? "verified" : "Not verified"}
            </h2>
            {session?.user?.isEmailVerified ? (
              <span className="text-blue-500">
                <VscVerifiedFilled size={27} />
              </span>
            ) : (
              <span className="text-red-600">
                <VscUnverified size={27} />
              </span>
            )}
          </div>

          <div className="w-full grid grid-cols-1 gap-5">
            {/* Email */}
            <div className="flex items-center gap-3">
              <span className="w-[24%] md:w-[17%]">Email:</span>
              <input
                name="email"
                type="email"
                value={profileData.email}
                disabled
                className="w-[80%]  px-3 py-1 rounded-sm bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div className="flex items-center gap-3">
              <span className="w-[24%] md:w-[17%]">Name:</span>
              <input
                name="name"
                type="text"
                value={profileData.name}
                disabled={!editForm}
                onChange={handleFormInput}
                className={`w-[80%] bg-gray-100 px-3 py-1 rounded-sm ${
                  editForm && "bg-gray-200 border border-blue-600/60"
                }`}
              />
            </div>

            {/* Image URL */}
            <div className="flex items-start gap-3 justify-between">
              <span className="w-[24%] md:w-[17%] ">Image URL:</span>
              <textarea
                name="image"
                value={profileData.image}
                disabled={!editForm}
                onChange={handleFormInput}
                onInput={handleTextareaInput}
                ref={textareaRef}
                className={`w-[80%] bg-gray-100 px-3 py-1 rounded-sm resize-none ${
                  editForm && "bg-gray-200 border border-blue-600/60"
                }`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-5">
            {editForm ? (
              <>
                <button
                  type="submit"
                  disabled={updateFormFieldLoader}
                  className="px-5 py-3 bg-slate-900 text-white rounded-md shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-950 hover:text-slate-400"
                >
                  {updateFormFieldLoader ? (
                    <span className="loading loading-spinner loading-xl"></span>
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="button"
                  disabled={updateFormFieldLoader}
                  onClick={() => setEditForm(false)}
                  className="px-5 py-3 bg-red-600 text-white rounded-md shadow-md cursor-pointer hover:bg-red-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditForm(true)}
                className="px-5 py-3 bg-lime-500 text-white rounded-md shadow-md flex items-center gap-2 hover:bg-lime-600 cursor-pointer  hover:text-lime-200"
              >
                Edit <FaRegEdit />
              </button>
            )}
          </div>
        </form>

        {!session?.user?.isEmailVerified && (
          <button
            onClick={() => router.push("/auth/verify")}
            className="w-[22rem] md:w-[35rem] px-5 py-3 bg-blue-500 hover:bg-blue-800 cursor-pointer text-white rounded-md shadow-md mt-4"
          >
            Verify Email
          </button>
        )}

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-[22rem] md:w-[35rem] px-5 py-3 bg-slate-800 text-white hover:text-orange-400 rounded-md shadow-md cursor-pointer hover:bg-slate-900 mb-20"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
