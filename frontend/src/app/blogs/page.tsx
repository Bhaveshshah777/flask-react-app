import { BASE_API_URL } from "@/constant";
import Link from "next/link";

export default async function blogs() {
  try {
    //Getting blogs from the backend
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "1em" }}>
          <Link href="/">Home</Link>
        </div>
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
