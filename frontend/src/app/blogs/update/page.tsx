"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/constant";

export default function UpdateBlog() {
  const [blogId, setBlogId] = useState(""); // For blog ID
  const [title, setTitle] = useState(""); // For blog title
  const [content, setContent] = useState(""); // For blog content
  const [link, setLink] = useState(""); // For blog link
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", { blogId, title, content, link });

    try {
      // API call to edit a blog
      const response = await fetch(`${BASE_API_URL}/blog/update/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, link }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        alert("Blog edited successfully");
        console.log("Updated Blog:", updatedBlog);
        router.push("/blogs");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update the blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="blogId">Blog ID:</label>
          <input
            type="text"
            id="blogId"
            value={blogId}
            onChange={(e) => setBlogId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Blog Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="link">Blog Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Edit Blog</button>
      </form>
    </div>
  );
}
