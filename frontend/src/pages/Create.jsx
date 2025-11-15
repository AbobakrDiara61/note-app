import { Link, useNavigate } from 'react-router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-hot-toast'
import NoteForm from '../components/NoteForm'
import api from '../lib/api'

const Create = () => {
  const navigate = useNavigate();

  const onSubmit = async (title, description) => {
    try {
      await fetch(`${api}/notes`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title: title, description: description})
      })
      toast.success("Note Created Successfully");
      // window.location.href = '/';
      navigate('/');
    } catch (error) {
      console.log("Error Creating The Note", error);
      toast.error("Faild To Create The Note");
    } 
  }
  return (
    <section className='min-h-screen bg-base-200 flex px-5 @min-xs:px-20'>
      <div className='w-full md:w-10/12 md:max-w-lg m-auto flex flex-col justify-center '>
        <Link to={'/'} className='mb-5 ghost-btn ' >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className='font-medium ml-2 relative duration-300 transition-all left-0 hover:-left-1'>Back to Notes</span>
        </Link>
        <NoteForm sumbitText={"Create Note"} loadingText={"Creating ..."} onSubmit={onSubmit}/>
      </div>
    </section>
  )
}

export default Create
