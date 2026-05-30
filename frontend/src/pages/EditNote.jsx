import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import NoteForm from '../components/NoteForm'
import { handleNoteEditing, handleNoteDeletion } from '../lib/notesUtils'

const EditNote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = async (title, description) => {
    const { _id } = location.state || { _id: '' };
    await handleNoteEditing(_id, { title, description }, navigate);
  }
  const handleDeletion = async () => {
    const { _id } = location.state || { _id: '' };
    const status = await handleNoteDeletion(_id);
    status && navigate('/');
  }

  return (
    <section className='min-h-screen bg-base flex px-5 @min-xs:px-20'>
      <div className='w-full md:max-w-2xl m-auto flex flex-col justify-center '>
        <div className='mb-5 flex justify-between'>
          <Link to={'/'} className='ghost-btn group' >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className='font-medium ml-2 relative duration-300 transition-all left-0 group-hover:-left-1'>Back to Notes</span>
          </Link>
          <button className='py-2 px-4 rounded-full text-error hover:text-red-300 font-bold ring-1 ring-error/70 hover:ring-error/80 hover:bg-error/10 transition-all duration-300 '
            onClick={handleDeletion}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className='ml-2'>Delete Note</span>
          </button>
        </div>
        <NoteForm sumbitText={"Save Changes"} loadingText={"Saving ..."} note={location.state} onSubmit={handleSubmit} />
      </div>
    </section>
  )
}

export default EditNote
