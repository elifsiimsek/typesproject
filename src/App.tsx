import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import type { Book } from "./types/todo";
import TodoInput from "./components/todo/TodoInput";
import TodoList from "./components/todo/TodoList";
import TodoFilter from "./components/todo/TodoFilter";

type FilterType = "all" | "active" | "completed";

function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem("my-reading-list");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem("my-reading-list", JSON.stringify(books));
  }, [books]);

  const addBook = (title: string) => {
    if (!title.trim()) return;
    const newBook: Book = {
      id: Date.now(),
      title,
      isRead: false,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const toggleRead = (id: number) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, isRead: !b.isRead } : b
      )
    );
  };

  const deleteBook = (id: number) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const clearAll = () => {
    Swal.fire({
      title: "Tüm listeyi silmek istiyor musun?",
      text: "Bu işlem geri alınamaz.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil",
      cancelButtonText: "Vazgeç",
      confirmButtonColor: "#111827",
      cancelButtonColor: "#d1d5db",
      background: "#ffffff",
      backdrop: "rgba(0,0,0,0.4)",
      customClass: {
        popup: "rounded-[28px] shadow-2xl px-8 py-6",
        title: "text-xl font-semibold text-gray-800",
        htmlContainer: "text-gray-500 mt-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setBooks([]);
        Swal.fire({
          icon: "success",
          title: "Liste temizlendi ✨",
          timer: 1200,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-[28px] shadow-xl px-6 py-5",
          },
        });
      }
    });
  };

  // HESAPLAMALAR - useMemo sayesinde books değiştiği an sayaçlar ZORUNLU güncellenir
  const unreadCount = useMemo(() => books.filter((b) => !b.isRead).length, [books]);
  const readCount = useMemo(() => books.filter((b) => b.isRead).length, [books]);

  const filteredBooks = useMemo(() => {
    if (filter === "active") return books.filter((b) => !b.isRead);
    if (filter === "completed") return books.filter((b) => b.isRead);
    return books;
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center py-10 px-4 font-sans text-[#2d2d2d]">
      <div className="flex gap-3 mb-6 w-full max-w-md">
        <StatCard
          label="Tümü"
          count={books.length}
          color="blue"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <StatCard
          label="Okundu"
          count={readCount}
          color="green"
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        />
        <StatCard
          label="Okunacak"
          count={unreadCount}
          color="red"
          active={filter === "active"}
          onClick={() => setFilter("active")}
        />
      </div>

      <div className="w-full max-w-md space-y-4">
        <TodoInput onAdd={addBook} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <TodoList
            books={filteredBooks}
            onToggle={toggleRead}
            onDelete={deleteBook}
          />

          {books.length > 0 && (
            <TodoFilter
              count={unreadCount}
              currentFilter={filter}
              setFilter={setFilter}
              onClear={clearAll}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const StatCard = ({
  label,
  count,
  color,
  active,
  onClick,
}: {
  label: string;
  count: number;
  color: "blue" | "red" | "green";
  active: boolean;
  onClick: () => void;
}) => {
  const colorClasses = {
    blue: "text-blue-500",
    red: "text-red-500",
    green: "text-green-500",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white p-4 rounded-2xl border flex-1 text-center transition
        ${active ? "shadow-md scale-105 border-blue-300" : "border-gray-100 hover:shadow-sm"}
      `}
    >
      <div className={`text-2xl font-bold ${colorClasses[color]}`}>
        {count}
      </div>
      <div className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

export default App;  