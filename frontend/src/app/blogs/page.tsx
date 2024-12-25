import { BASE_API_URL } from "@/constant";
import Link from "next/link";
import '../globals.css';  // Import the CSS file

export default async function blogs() {
  try {
    // Getting blogs from the backend
    const raw = await fetch(BASE_API_URL + "blog");

    if (!raw.ok) {
      return (
        <div>
          <h1>Some Issue with the API</h1>
        </div>
      );
    }

    const blogs = await raw.json();

    return (
      <div>
        <div className="button-container">
          <Link href="/">
            <button className="button button-back">
              Back To Home Page
            </button>
          </Link>
        </div>
        <div className="button-container">
          <Link href="/blogs/create">
            <button className="button button-create">
              Create New Blog
            </button>
          </Link>
        </div>
        <h1>Blogs</h1>
        <table>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Titles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: any) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>
                  <Link href={`/blogs/${blog.id}`}>View</Link>
                  <Link href={`/blog/update${blog.id}`}>Edit</Link>
                  <Link href={`/blog/delete${blog.id}`}>Delete</Link>
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
