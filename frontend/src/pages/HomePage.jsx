import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <Navbar />

      <div className="mx-auto max-w-7xl px-4">
        <section className="mt-6 rounded-2xl border border-base-300/50 bg-base-200/60 backdrop-blur shadow-soft">
          <div className="px-6 py-5">
            <h1 className="text-2xl sm:text-3xl font-semibold">Notes</h1>
            <p className="mt-1 text-sm opacity-80">
              Capture ideas, chores, and flashes of brilliance—then come back with fresh eyes.
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent rounded-b-2xl" />
        </section>

        {loading && (
          <div className="py-12 flex justify-center">
            <span className="loading loading-ring loading-lg text-primary" aria-label="Loading notes" />
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && (
          <section className="mt-8 rounded-2xl border border-base-300/50 bg-base-200/40 p-6">
            <NotesNotFound />
          </section>
        )}

        {!loading && notes.length > 0 && !isRateLimited && (
          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-wide text-base-content/70">All notes</h2>
              <div className="h-px flex-1 ml-4 bg-base-300/60" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div key={note._id} className="rounded-2xl transition-transform duration-200 hover:-translate-y-0.5">
                  <NoteCard note={note} setNotes={setNotes} />
                </div>
              ))}
            </div>
          </section>
        )}

              {isRateLimited && (
        <div className="mx-auto max-w-7xl px-4">
          <RateLimitedUI />
        </div>
      )}
      </div>
    </div>
  );
};

export default HomePage;
