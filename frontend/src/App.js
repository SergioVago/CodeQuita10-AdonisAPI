import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

function App() {
  const [newPostContent, setNewPostContent] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get('/posts')
      .then(({ data: posts }) => {
        setPosts(posts)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  async function handleDelete(id) {
    await api.delete(`/posts/${id}`)

    setPosts(posts.filter(post => (
      post.id !== id
    )))
  }

  async function handlePostSave(e) {
    e.preventDefault()

    const { data: post } = await api.post('/posts', { content: newPostContent })

    setPosts([...posts, post])
    setNewPostContent('')
  }

  return (
    <div className="App">
      <form onSubmit={handlePostSave}>
        <textarea
          onChange={e => setNewPostContent(e.target.value)}
          value={newPostContent}
        />
        <button type="submit">Postar</button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id} onClick={() => { handleDelete(post.id) }}>{post.content}</li>
        ))
        }
      </ul >
    </div >
  );
}

export default App;
