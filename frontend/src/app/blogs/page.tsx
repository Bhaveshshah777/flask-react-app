import { BASE_API_URL } from "@/constant";

export default async function blogs() {

  //Getting blogs from the backend
  const raw = await fetch(BASE_API_URL + 'blog');
  const blogs = await raw.json();
  console.log(blogs);

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
          {blogs.map((blog:any) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}