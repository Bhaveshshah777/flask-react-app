"use client";

import { BASE_API_URL } from "@/constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../globals.css"; // Import the CSS file

export default function blogs() {
  try {
    let [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
      const raw = await fetch(BASE_API_URL + "blog");
      if (!raw.ok) {
        return (
          <div>
            <h1>Some Issue with the API</h1>
          </div>
        );
      }
      const data = await raw.json();
      setBlogs(data);
    };

    useEffect(() => {
      fetchBlogs();
    }, []);

    // Getting blogs from the backend

    // Function to handle delete
    const handleDelete = (id: number) => {
      console.log(id);

      fetch(`${BASE_API_URL}blog`, {
        method: "DElETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [id] }),
      }).then(() => {
        alert("Blog deleted succesfully!");
        fetchBlogs();
      });
    };

    return (
      <div>
        <div className="button-container">
          <Link href="/">
            <button className="button button-back">Back To Home Page</button>
          </Link>
          <Link href="/blogs/create">
            <button className="button button-create">Create New Blog</button>
          </Link>
        </div>
        <h1>Blogs</h1>
        <table>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Titles</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: any) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>
                  <Link href={`/blogs/${blog.id}`}>View</Link>
                </td>
                <td>
                  <Link
                    href={`/blogs/update/${blog.id}`}
                    className="actionBtn primaryBtn"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(blog.id);
                    }}
                    className="actionBtn dangerBtn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Failed to load blogs</h1>
      </div>
    );
  }
}
