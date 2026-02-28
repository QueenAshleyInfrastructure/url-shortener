import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../lib/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="container">
        <p className="not-found">Post not found.</p>
        <p style={{ textAlign: 'center' }}>
          <Link to="/blog">← Back to Blog</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <article className="post-article">
        <h1>{post.title}</h1>
        <div className="content">{post.content}</div>
        <p style={{ marginTop: '1.5rem' }}>
          <Link to="/blog">← Back to Blog</Link>
        </p>
      </article>
    </div>
  );
}
