import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 space-y-6 max-w-lg mx-auto text-center">
      <div className="bg-base-200 border border-base-300 shadow-md rounded-2xl p-6">
        <NotebookIcon className="size-12 text-primary" />
      </div>
      <h3 className="text-3xl font-semibold">No Notes Yet</h3>
      <p className="text-base-content/70 leading-relaxed">
        Your ideas deserve a cozy place to live. Start brewing your thoughts into notes today.
      </p>
      <Link to="/create" className="btn btn-primary btn-wide">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
