import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "NotFound",
  description: "This page is not found",
  openGraph: {
    title: "NotFound",
    description: "This page is not found",
    url: "https://08-zustand-weld-psi.vercel.app/",
    images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
  },
};

function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
