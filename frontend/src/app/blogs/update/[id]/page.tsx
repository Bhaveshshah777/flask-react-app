"use client";

import { useRouter } from "next/navigation";

export default function UpdateBlog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">Blog Title:</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="content">Blog Content:</label>
          <textarea id="content"></textarea>
        </div>
        <div>
          <label htmlFor="link">Blog Link:</label>
          <input type="text" id="link" />
        </div>
        <span>
          <button type="button" onClick={() => router.push("/blogs")}>
            Cancel
          </button>
        </span>
        <span>
          <button type="submit">Update Blog</button>
        </span>
      </form>
    </div>
  );
}
