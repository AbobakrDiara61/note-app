import { useNavigate } from "react-router-dom";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleNoteDeletion } from "../lib/notesUtils";

const Note = ({ noteObject, setNotes }) => {
  const { title, description, createdAt, _id } = noteObject;
  const navigate = useNavigate();
  const handleDeletion = async () => await handleNoteDeletion(_id, setNotes);

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
          <button className="text-error/80 hover:text-error btn-transition ml-2" onClick={handleDeletion}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
