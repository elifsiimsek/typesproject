import type { Book } from '../../types/todo';
import TodoItem from './TodoItem';

interface Props {
  books: Book[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ books, onToggle, onDelete }: Props) => {
  if (books.length === 0) {
    return (
      <div className="p-10 text-center text-gray-300 text-sm italic">
        Liste boş görünüyor...
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {books.map((book) => (
        <TodoItem key={book.id} book={book} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;