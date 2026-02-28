/**
 * Mock blog data for Lab 4 — Dynamic Routing.
 * Each post has: id, slug, title, content.
 */
export const posts = [
  {
    id: 1,
    slug: 'my-first-post',
    title: 'My First Post',
    content: 'This is the content of my first blog post. Here you can write about anything—ideas, tutorials, or updates. The slug in the URL is used to load this post dynamically.',
  },
  {
    id: 2,
    slug: 'getting-started-with-react-router',
    title: 'Getting Started with React Router',
    content: 'React Router lets you build single-page apps with multiple "pages" using dynamic routes. You can use the slug or id from the URL to fetch and display the right content. This post is an example of that pattern.',
  },
  {
    id: 3,
    slug: 'dynamic-routing-basics',
    title: 'Dynamic Routing Basics',
    content: 'A dynamic route like /blog/[slug] matches any path after /blog/. Your component reads the slug with useParams() and finds the matching post from your data. If no post is found, show "Post not found."',
  },
];

/**
 * Find a post by slug.
 * @param {string} slug - URL-friendly slug
 * @returns {object|undefined} - Post object or undefined
 */
export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
