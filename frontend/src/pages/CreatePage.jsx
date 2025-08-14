import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content relative overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="btn btn-ghost gap-2 rounded-2xl mb-6">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          <div className="card rounded-2xl border border-base-300/50 bg-base-200/40 backdrop-blur shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl">Create New Note</h2>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered rounded-2xl focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered rounded-2xl min-h-40 leading-relaxed"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary rounded-2xl" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
