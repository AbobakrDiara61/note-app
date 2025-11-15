import { useRef, useState } from 'react'
import toast from 'react-hot-toast';

const NoteForm = ({onSubmit, sumbitText, loadingText}) => {

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // validation First
    // ----------------
    if(!title.trim() || !description.trim()) {
      toast.error("All Fields are Required");
      return;
    }
    setLoading(true);
    onSubmit(title, description); 
  }
  return (
    <div className='bg-base-300 text-stone-300/70 flex flex-col justify-center  gap-5 p-10 rounded-2xl'>
      <h2 className="text-white text-xl font-bold">Create New Note</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='input-wrapper'>
            <label htmlFor="note-title">Title</label>
            {/* <input onChange={(e) => setTitle(e.target.value)}/> */}
            <input 
              ref={titleRef} 
              type="text" 
              name="title" 
              id="note-title" 
              value={title} 
              onChange={() => setTitle(titleRef.current.value)} 
              placeholder='Note Title'
            />
        </div>
        <div className='input-wrapper'>
            <label htmlFor="note-description">Content</label>
            <textarea 
              ref={descriptionRef} 
              name="description" 
              id="note-description" 
              value={description} 
              onChange={() => setDescription(descriptionRef.current.value)} 
              placeholder='Write your note here...' 
              className='min-h-32'
            />
        </div>
        <button className='main-btn w-fit ml-auto font-bold' type='submit' disabled={loading}>
          {!loading ? sumbitText : loadingText}
        </button>
      </form>
    </div>
  )
}

export default NoteForm
