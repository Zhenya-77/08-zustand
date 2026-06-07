"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      value={value}
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleOnChange}
    />
  );
}

export default SearchBox;
