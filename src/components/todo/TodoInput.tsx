import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

const TodoInput = ({ onAdd }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    onAdd(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-1.5 pl-5 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between"
    >
      <label htmlFor="bookTitle" className="sr-only">
        Kitap Adı
      </label>

      <input
        id="bookTitle"
        name="bookTitle"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Kitap ekle..."
        autoComplete="off"
        className="flex-1 outline-none text-sm text-gray-600 placeholder:text-gray-300
                   border border-gray-200 rounded-2xl px-3 py-2
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all"
      />

      <button
        type="submit"
        className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all active:scale-95"
      >
        Ekle
      </button>
    </form>
  );
};

export default TodoInput;