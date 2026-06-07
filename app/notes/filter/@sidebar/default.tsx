import Link from "next/link";
import css from "./SidebarNotes.module.css";

async function SidebarNotes() {
  const categories = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {categories.map((category, index) => (
        <li key={index} className={css.menuItem}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;
