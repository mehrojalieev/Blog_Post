import { useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Create.scss";
import { Button } from "../../../utils"
import instance from '../../../services/api';
import { useFetch } from '../../../helpers/hooks/useFetch';
import { useValue } from '../../../context/AppProvider';

const Create = () => {
  const [state] = useValue()
  const [category, setCategory] = useState("")
  const { data } = useFetch("/api/categories")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState('');

  const [loadingOpen, setLoadingOpen] = useState(false)


  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link',]
      ],
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  };

  const Button = useRef()
  const createBtn = Button.current
  const handleCreatePost = (e) => {
    e.preventDefault()
    createBtn.style = "cursor: not-allowed; opacity: 0.8"
    instance.post("/api/posts", {
      title,
      description,
      category,
      image, image
    })
      .then(response => console.log(response))
      .catch(err => console.log(err))
      setTimeout(() => {
        window.location.reload(true)
      }, 1800)
  }

  console.log(category);
  return (
    <div className='create'>
      <form onSubmit={handleCreatePost} className='create-form'>
        <input type="text" placeholder='Title' className='form__input' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="url" placeholder='Image Link' className='form__input' value={image} onChange={(e) => setImage(e.target.value)} />
        <ReactQuill modules={modules} theme="snow" value={description} onChange={setDescription} />
        <select defaultValue={"select"} className='form__input' onChange={(e) => setCategory(e.target.value)}>
          <option disabled value="select">Select post category</option>
          {
            data?.data.map(categoryItem =>
              <option value={categoryItem._id}>
                {categoryItem.title}
              </option>
            )
          }
        </select>
        <button ref={Button} onClick={() => setLoadingOpen(true)}>Create</button>
      </form>
          {/* Loading */}
          <div style={loadingOpen ? {display: "block"} : {display: "none"}} class="lds-dual-ring"></div>
    </div>

  )
}

export default Create
