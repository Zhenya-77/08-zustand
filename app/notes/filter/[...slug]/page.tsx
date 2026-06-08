import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === "all" ? "All Notes" : slug[0];

  const title =
    category === "all" ? "All Notes" : `Notes in category: ${category}`;

  const description =
    category === "all"
      ? "Browse all available notes."
      : `Browse notes filtered by category "${category}".`;

  const url =
    category === "all"
      ? "https://notehub.com/notes/filter/all"
      : `https://notehub.com/notes/filter/${category}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: `Note: ${title}`,
      description: description,
      url: url,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
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
