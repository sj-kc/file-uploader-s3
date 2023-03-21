import { useState } from 'react'
import axios from 'axios'


function App() {
  const [post, setPost] = useState({
    title: '',
    photo: null
  })

  const onUpload = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('photo', post.photo)

    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    console.log(response);
  }

  return (
    <div>
      <form onSubmit={onUpload}>
        <input type="text" name="title" placeholder='title' onChange={(e) => setPost({ ...post, title: e.target.value })} />
        <input type="file" name="photo" onChange={e => setPost({ ...post, photo: e.target.files[0] })} />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default App