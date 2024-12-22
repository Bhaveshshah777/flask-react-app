import { BASE_API_URL } from "@/constant";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: { id: string }; // No need for `Promise<any>` here
}) {
  try {
    // Fetch the blog data using id from params
    const response = await fetch(`${BASE_API_URL}blog/${params.id}`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with id: ${params.id}`);
    }

    const blog = await response.json();

    console.log("Params:", params);

    return (
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
        <a href={blog.link} target="_blank" rel="noopener noreferrer">
          Visit Link
        </a>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return (
      <div>
        <h1>
          Error: {error instanceof Error ? error.message : "Unknown Error"}
        </h1>
      </div>
    );
  }
}
