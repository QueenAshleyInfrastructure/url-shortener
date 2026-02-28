import { Link } from 'react-router-dom';
import { posts } from '../lib/posts';

export default function BlogIndex() {
  return (
    <div className="container">
      <h1 className="page-title">Blog</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            <div className="muted">/blog/{post.slug}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
