import { Link, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import NoteForm from '../components/NoteForm'
import api from '../lib/api'

const EditNote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editNote = async (title, description) => {
    const {_id } = location.state || {_id: ''}; 
    // console.log(location);
    try {
      const response = await fetch(`${api}/notes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title, description}),
      });
      response.status === 200 && toast.success("Note Updated Successfully");
      navigate('/');
      console.log(response);

    } catch (error) {
      console.log(error);
      toast.error("Failed To Update The Note");
    }
  }
  const handleDeletion = async () => {
    const {_id } = location.state || {_id: ''}; 
    try {
      const response = await fetch(`${api}/notes/${_id}`,{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.status === 200) toast.success("Note Deleted Successfully");
      /* else if(response.status === 404) toast.error("Note Not Found");
      else if(response.status === 429) toast.error("Rate Limit Exceeded"); 
      else toast.error("Failed To Delete The Note"); */
      navigate('/');
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete The Note");
    }
  }
  return (
    <section className='min-h-screen flex px-5 @min-xs:px-20'>
      <div className='w-full md:w-10/12 md:max-w-lg m-auto flex flex-col justify-center '>
        <div className='mb-5 flex justify-between'>
          <Link to={'/'} className='text-white' >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className='font-medium ml-2 relative duration-300 transition-all left-0 hover:-left-1'>Back to Notes</span>
          </Link>
          <button className='py-2 px-4 rounded-full text-error hover:text-red-300 font-bold ring-1 ring-error/70 hover:ring-error/80 hover:bg-error/10 transition-all duration-300 ' 
            onClick={handleDeletion}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className='ml-2'>Delete Note</span>
          </button>
        </div>
        <NoteForm sumbitText={"Save Changes"} loadingText={"Saving ..."} onSubmit={editNote}/>
      </div>
    </section>
  )
}

export default EditNote
