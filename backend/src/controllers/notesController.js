import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes (getAllNotes controller):", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).json({message: "Note not found"})
        }
        res.json(note);
    } catch (error) {
        console.error("Error fetching note (getNoteById controller):", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title:title, content});
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating note (createNote controller):", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    try {   
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content:content}, {new: true,}); // new: true returns the updated document
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) { 
        console.error("Error updating note (updateNode controller):", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found"});
        }
        res.json({message: "Note deleted successfully!"}); // default status 200
    } catch (error) {
        console.error("Error deleting note (deleteNode controller):", error);
        res.status(500).json({ message: "Internal server error" });
    }
}