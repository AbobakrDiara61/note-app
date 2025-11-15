import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import { useNavigate } from "react-router";

const Note = ({ noteObject, setNotes }) => {
    const { title, description, createdAt, _id } = noteObject;
    const navigate = useNavigate();
    const deleteNote = async () => {
      try {
        const response = await fetch(`${api}/notes/${_id}`,{
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(response.status === 200) toast.success("Note Deleted Successfully");
        setNotes(prevNotes => prevNotes.filter(note => note._id !== _id));
        /* else if(response.status === 404) toast.error("Note Not Found");
        else if(response.status === 429) toast.error("Rate Limit Exceeded"); 
        else toast.error("Failed To Delete The Note"); */
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error("Failed To Delete The Note");
      }
    }

    const editNote = () => {
      navigate('/edit', {
        state: noteObject,
      });
    }
    return (
      <div className="bg-base flex flex-col gap-1 text-stone-300/90 rounded-md border-t-3 border-secondary/90 p-5 max-w-96555 shadow-xs shadow-white/10" id={_id}>
        <h4 className="text-white text-lg font-bold">{title}</h4>
        <p className="text-sm uppercase">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs">{new Date(createdAt).toDateString()}</p>
          <div className="text-sm mt-5">
            <button className="hover:text-stone-300 btn-transition" onClick={editNote}> 
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button className="text-error/80 hover:text-error btn-transition ml-2" onClick={deleteNote}> 
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    );
};

export default Note;
