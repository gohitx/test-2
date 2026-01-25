import { useEffect, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadPost() {
    setLoading(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setPost({ title: 'Error', body: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>App</h1>

      <section>
        <p>Contador: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Incrementar</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
          Reset
        </button>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Post (remoto)</h2>
        <button onClick={loadPost} disabled={loading}>
          {loading ? 'Cargando...' : 'Recargar'}
        </button>

        {post ? (
          <article style={{ marginTop: 8, padding: 12, border: '1px solid #ddd' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ) : (
          <p style={{ marginTop: 8 }}>Sin datos</p>
        )}
      </section>
    </main>
  );
}
