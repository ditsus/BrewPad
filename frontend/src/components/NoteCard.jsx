// import {Link} from "react-router";
// import {PenSquareIcon, Trash2Icon} from "lucide-react";
// import {formatDate} from "../lib/utils";
// import api from "../lib/axios";
// import toast from "react-hot-toast";

// const NoteCard = ({note, setNotes}) => {
//   const handleDelete = async (e,id) => {
//     e.preventDefault(); // get rid of navigation behavior

//     if (!window.confirm("Are you sure to delete this note?")) return;

//     try {
//       await api.delete(`/notes/${id}`);
//       setNotes((prev) => prev.filter(notes => notes._id !== id)) // get rid of delete note
//       toast.success("Note successfully deleted");
//     } catch (error) {
//       console.log("Error is handleDelete", error);
//       toast.error("Failed to delete note");
//     }
//   }
//   return (
//     <Link to={`/note/${note._id}`} className = "card bg-base-100 hover:shadow-lg transition-all duraction-200 border-t-4 border-solid border-[#00FF9D]">
//         <div className = "card-body">
//              <h3 className = "card-title text-base-content">{note.title}</h3>
//              <p className = "text-base-content/70 line-clamp-3">{note.content}</p>
//              <div className = "card-actions justify-between items-center mt-4">
//                 <span className = "text-sm text-based-content/60">
//                     {formatDate(new Date(note.createdAt))}
//                 </span>
//                 <div className = "flex items-center gap-1">
//                     <PenSquareIcon className = "size-4"/>
//                     <button className = "btn btn-ghost btn-xs text-error" onClick = {(e) => {handleDelete(e, note._id)}}>
//                         <Trash2Icon className = "size-4"/>
//                     </button>
//                 </div>
//              </div>
//         </div>
//     </Link>
//   )
// }

// export default NoteCard



import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note successfully deleted");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group block rounded-2xl bg-base-200/40 border border-base-300/60 shadow-sm backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative rounded-t-2xl h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-base-content line-clamp-1">
          {note.title}
        </h3>
        <p className="mt-2 text-base-content/70 leading-relaxed line-clamp-3">
          {note.content}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 opacity-60 group-hover:opacity-80" />
            <button
              className="btn btn-ghost btn-xs text-error rounded-xl"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
