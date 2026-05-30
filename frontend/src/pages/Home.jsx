import { useEffect, useState } from 'react'
import Header from '../components/Header'
import RateLimitUi from '../components/RateLimitUi'
import Note from '../components/NoteCard'
import Loading from '../components/Loading'
import NoNotesUi from '../components/NoNotesUi'
import { fetchNotes } from '../lib/notesUtils.js'

const Home = () => {
  const [isRateLimitExceeded, setIsRateLimitExceeded] = useState(false)
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes(setNotes, setIsRateLimitExceeded, setIsLoading);
  }, []);

  return (
    <section className='relative min-h-screen text-white border border-base-300'>
      <div className='absolute w-full h-full left-0 top-0 inset-0 bg-radial-[125%_125%_at_50%_10%,#000_60%,#00FF9D_100%] -z-10'></div>
      {isLoading && <Loading />}
      <Header />
      {isRateLimitExceeded && <RateLimitUi />}
      {notes.length === 0 && !isRateLimitExceeded && !isLoading && <NoNotesUi />}
      <div className='main-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes && notes?.map(note => <Note noteObject={note} setNotes={setNotes} key={note._id} />)}
      </div>
    </section>
  )
}

export default Home
