"use client";

import { BASE_API_URL } from "@/constant";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpdateBlog() {
  const router = useRouter();
  const id = useParams<{ id: string }>().id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/blog/${id}`);
        const data = await response.json();

        setTitle(data.title);
        setContent(data.content);
        setLink(data.link);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleUpdateSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      link: e.target.link.value,
    };

    fetch(`${BASE_API_URL}/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        alert("Blog updated successfully!");
        router.push("/blogs");
      })
      .catch((error) => {
        console.error("Error updating blog post:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleUpdateSubmit}>
        <div>
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Blog Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="link">Blog Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="actionBtnContainer">
          <button
            type="button"
            onClick={() => router.push("/blogs")}
            className="actionBtn secondaryBtn"
          >
            Cancel
          </button>
          <button type="submit" className="actionBtn  primaryBtn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
