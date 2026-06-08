"use client";

import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { useRouter } from "next/navigation";

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const [deboucedValue] = useDebounce(inputValue, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, deboucedValue, tag],
    queryFn: () =>
      fetchNotes({ page: currentPage, searchQuery: deboucedValue, tag }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setInputValue(value);
    setCurrentPage(1);
  };

  const createNote = () => router.push("/notes/action/create");

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={createNote} className={css.button}>
          Create note +
        </button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
