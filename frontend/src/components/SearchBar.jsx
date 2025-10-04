export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="🔎 Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border rounded-lg p-2 w-full max-w-md mb-4 dark:bg-gray-800 dark:text-white"
    />
  );
}
