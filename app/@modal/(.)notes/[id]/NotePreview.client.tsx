"use client";

import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClose = () => router.back();

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
        <Modal closeModal={handleClose}>
          <main className={css.main}>
            <div className={css.container}>
              <div className={css.item}>
                <div className={css.header}>
                  <button
                    onClick={handleClose}
                    className={css.backBtn}
                    type="button"
                  >
                    Go Back
                  </button>
                  <h2>{data.title}</h2>
                </div>
                <p className={css.tag}>{data.tag}</p>
                <p className={css.content}>{data.content}</p>
                <p className={css.date}>{data.createdAt}</p>
              </div>
            </div>
          </main>
        </Modal>
      )}
    </>
  );
}

export default NotePreviewClient;
