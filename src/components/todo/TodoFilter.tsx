import type { Dispatch, SetStateAction } from "react";

type FilterType = "all" | "active" | "completed";

interface Props {
  count: number;
  currentFilter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  onClear: () => void;
}

const TodoFilter = ({ count, currentFilter, setFilter, onClear }: Props) => {
  return (
    <div className="flex items-center justify-between p-4 text-sm border-t">
      <span className="text-gray-500">{count} kitap kaldı</span>

      <div className="flex gap-6">
        <span
          onClick={() => setFilter("all")}
          className={`cursor-pointer transition ${
            currentFilter === "all"
              ? "text-blue-500 font-semibold"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Tümü
        </span>
        <span
          onClick={() => setFilter("completed")}
          className={`cursor-pointer transition ${
            currentFilter === "completed"
              ? "text-green-500 font-semibold"
              : "text-gray-500 hover:text-green-500"
          }`}
        >
          Okundu
        </span>
        <span
          onClick={() => setFilter("active")}
          className={`cursor-pointer transition ${
            currentFilter === "active"
              ? "text-red-500 font-semibold"
              : "text-gray-500 hover:text-red-500"
          }`}
        >
          Okunacak
        </span>
      </div>

      <span
        onClick={onClear}
        className="cursor-pointer text-red-500 hover:opacity-70 transition"
      >
        Temizle
      </span>
    </div>
  );
};

export default TodoFilter;