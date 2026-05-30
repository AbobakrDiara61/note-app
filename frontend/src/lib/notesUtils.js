import { toast } from 'react-hot-toast';
import * as notesService from '../service/notesService';

const { getNotes, createNote, updateNote, deleteNote } = notesService;

const fetchNotes = async (setNotes, setIsRateLimitExceeded, setIsLoading) => {
    try {
        const response = await getNotes();
        console.log({ response });
        setNotes(response.data);
    } catch (error) {
        console.error({ error });
        if (error.response.status === 429)
            return setIsRateLimitExceeded(true);
        toast.error("Failed to load notes");
        setNotes([]);
    }
    finally {
        setIsLoading(false);
    }
}

const createNewNote = async (note, navigate) => {
    try {
        await createNote(note);
        toast.success("Note Created Successfully");
        navigate('/');
    } catch (error) {
        console.error({ error });
        if (error.response.status === 429)
            toast.error("Rate Limit Exceeded");
        else
            toast.error("Faild To Create The Note");
    }
}

const handleNoteEditing = async (id, note, navigate) => {
    try {
        await updateNote(id, note);
        toast.success("Note Updated Successfully");
        navigate('/');
    } catch (error) {
        console.error(error);
        if (error.response.status === 429)
            toast.error("Rate Limit Exceeded");
        else
            toast.error("Failed To Update The Note");
    }
}

const handleNoteDeletion = async (id, setNotes) => {
    try {
        await deleteNote(id);
        toast.success("Note Deleted Successfully");
        if (setNotes)
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));

        return true;
    } catch (error) {
        console.error({ error });
        if (error.response.status === 429)
            toast.error("Rate Limit Exceeded");
        else
            toast.error("Failed To Delete The Note");
        return false;
    }
}

export {
    fetchNotes,
    createNewNote,
    handleNoteEditing,
    handleNoteDeletion,
}