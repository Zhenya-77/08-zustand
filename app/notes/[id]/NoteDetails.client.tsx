"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && !data && <p>Something went wrong.</p>}
      {isSuccess && (
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{data.title}</h2>
              </div>
              <p className={css.tag}>{data.tag}</p>
              <p className={css.content}>{data.content}</p>
              <p className={css.date}>{data.createdAt}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default NoteDetailsClient;
