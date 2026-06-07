import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string[] }>;
}

async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", category],
    queryFn: () => fetchNotes({ tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}

export default NotesByCategory;
