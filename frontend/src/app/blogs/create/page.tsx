"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { error } from "console";
import { BASE_API_URL } from "@/constant";


export default function CreateBlog() {
    const [title, setTitle] = useState(""); // For blog title
    const [content, setContent] = useState(""); // For blog content
    const [link, setLink] = useState(""); // For blog link
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // API call to create a new blog
            const response = await fetch(BASE_API_URL + "/blogs/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, link }),
            });

            if (!response.ok) {
                const data = await response.text();
                throw new Error(`Failed to create blog`);
            }


            // Clear form inputs and show success message
            setTitle("");
            setContent("");
            setLink("");
            alert("Blog created successfully!");


            // Redirect to blogs list
            router.push("/blogs");
        } catch (error) {
            // Show error message
            alert(`Error: ${"Something went wrong"}`);
        }
    };

    return (
        <div>
            <h1>Create a New Blog</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Blog Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="content">Blog Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="link">Blog Link:</label>
                    <input
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)} />
                </div>
                <button type="submit">Create Blog</button>
            </form >
        </div >
    );
}