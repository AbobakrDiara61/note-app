import { faBook, faNoteSticky } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router"

const NoNotesUi = () => {
  return (
    <div className=''>
      <div className='main-container flex flex-col items-center gap-5'>
        <div className="rounded-full bg-primary/10 p-8">
          <FontAwesomeIcon icon={faBook} className="text-primary text-2xl"/>
        </div>
        <h3 className="text-white text-2xl font-bold tracking-wide">No Notes Yet</h3>
        <p className="text-stone-300/70 text-sm text-center max-w-96">Ready to organize your thoughts? Create your first note to get started on your journey.</p>
        <Link to={'/create'} className='main-btn'>Create Your First Note</Link>
      </div>
    </div>
  )
}

export default NoNotesUi
