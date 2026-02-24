import type { Book } from "../../types/todo";

interface Props {
  book: Book;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ book, onToggle, onDelete }: Props) => {
  return (
    <div
      onClick={() => onToggle(book.id)}
      className="group flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-3">
      
        <div
          className={`
            w-6 h-6 flex items-center justify-center
            rounded-full
            transition-all duration-300
            ${
              book.isRead
                ? "bg-blue-500 shadow-md scale-100"
                : "bg-white border border-gray-300 scale-95"
            }
          `}
        >
          <svg
            className={`w-3 h-3 transition-all duration-300 ${
              book.isRead ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            fill="none"
            stroke="white"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span
          className={`text-sm transition-all duration-300 ${
            book.isRead
              ? "line-through text-gray-400"
              : "text-gray-700"
          }`}
        >
          {book.title}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(book.id);
        }}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-lg transition"
      >
        ✕
      </button>
    </div>
  );
};

export default TodoItem;