import { deleteNote } from "@/lib/api";

import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View Details</Link>
            <button
              onClick={() => handleDelete(note.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
