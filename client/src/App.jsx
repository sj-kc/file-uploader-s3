import { useState } from 'react'
import axios from 'axios'


function App() {
  const [post, setPost] = useState({
    photo: null
  })

  const [eTag, setTag] = useState({
    etag: null
  })


  const onUpload = async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData()
      formData.append('photo', post.photo)

      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      setTag({ etag: response.data.ETag })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={onUpload}>
        <input type="file" name="photo" onChange={e => setPost({ ...post, photo: e.target.files[0] })} />
        <button type="submit">Upload</button>
      </form>

      {
        eTag.etag &&
        <div>
          <div>
            <p>Id of image: {eTag.etag}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default App