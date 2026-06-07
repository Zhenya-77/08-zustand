import axios from "axios";
import type { Note, NewNoteData, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

export interface GetNotes {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesProps {
  page?: number;
  searchQuery?: string;
  tag?: string;
}

export async function fetchNotes({ page, searchQuery, tag }: fetchNotesProps) {
  const res = await axios.get<GetNotes>("/notes", {
    params: {
      page,
      ...(searchQuery && { search: searchQuery }),
      perPage: 12,
      tag,
    },
  });

  console.log(res.data);

  return res.data;
}

export async function createNote(noteData: NewNoteData) {
  const res = await axios.post<Note>("/notes", noteData);
  return res.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
}

export async function fetchNoteById(noteId: string) {
  const res = await axios.get<Note>(`/notes/${noteId}`);
  return res.data;
}
