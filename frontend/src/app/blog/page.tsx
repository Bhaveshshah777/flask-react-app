import Image from "next/image";
import styles from "./page.module.css";
import { BASE_API_URL } from "@/constant";
import Link from "next/link";

export default async function blogs() {
  try {
    // Getting blogs from the backend
    const raw = await fetch(BASE_API_URL + 'blog');

    // Check if the response is successful
    if (!raw.ok) {
      throw new Error('Failed to fetch data');
    }

    const blogs = await raw.json();
    console.log(blogs);

    if (blogs.length === 0) {
      console.log('No data found');
    }

    return (
      <div>
        <h1>Blogs</h1>
        <table>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Titles</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: any) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>
                  <button>
                    <Link href={`/blog/${blog.id}`}>
                      View
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return (
      <div>
        <h1>Error: {error instanceof Error ? error.message : 'Unknown Error'}</h1>
      </div>
    );
  }
}