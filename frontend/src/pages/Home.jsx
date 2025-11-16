import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Header from '../components/Header'
import RateLimitUi from '../components/RateLimitUi'
import Note from '../components/NoteCard'
import Loading from '../components/Loading'
import api from '../lib/api'
import NoNotesUi from '../components/NoNotesUi'

const Home = () => {
  const [ isRateLimitExceeded, setIsRateLimitExceeded ] = useState(false)
  const [ notes, setNotes ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${api}/notes`);
      if(response.status === 429) {
        setIsRateLimitExceeded(true);
        return;
      }
      const data = await response.json();
      console.log(data);
      setNotes(data);
      setIsRateLimitExceeded(false);
    } catch (error) {
        console.log("Error in Fetching notes in home page");
        console.log(error);
        toast.error("Failed to load notes");
    } finally {
      setIsLoading(false);
    }

  }
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    // <section data-theme="forest"> this will make the bg and text color be same
    <section className='relative min-h-screen text-white border border-base-300'>
      <div className='absolute w-full h-full left-0 top-0 inset-0 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D_100%)] -z-10'></div>
      { isLoading && <Loading />}
      <Header />
      { isRateLimitExceeded && <RateLimitUi />}
      {notes.length === 0 && !isRateLimitExceeded && !isLoading && <NoNotesUi />}
      <div className='main-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes.map(note => <Note noteObject={note} setNotes={setNotes} key={note._id}/>)}
      </div>
    </section>
  )
}

export default Home
