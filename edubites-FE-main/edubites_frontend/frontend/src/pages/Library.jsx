import { useState } from "react";
import { MdSearch } from "react-icons/md";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { books, libraryStats } from "../data/dummyData";

const categories = ["All", "Programming", "Design", "Algorithms", "Web"];

export default function Library() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books.filter(
    (b) =>
      (search === "" || b.title.toLowerCase().includes(search.toLowerCase())) &&
      (category === "All" || true)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Library</h1>
        <p className="text-gray-500 mt-1">Browse and borrow books</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 focus:border-edubites-sky outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat ? "bg-edubites-sky text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Books", value: libraryStats.total },
          { label: "Issued", value: libraryStats.issued },
          { label: "Due Soon", value: libraryStats.dueSoon },
          { label: "Available", value: libraryStats.available },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} hover className="overflow-hidden">
            <div className="flex">
              <img
                src={book.image}
                alt={book.title}
                className="w-24 h-36 object-cover flex-shrink-0"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {book.status === "Available" ? `ISBN: ${book.isbn}` : `Return: ${book.returnDate}`}
                </p>
                <Badge
                  variant={book.status === "Available" ? "success" : "warning"}
                  className="mt-2 w-fit"
                >
                  {book.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto"
                  onClick={() => setSelectedBook(book)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        title={selectedBook?.title}
      >
        {selectedBook && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="w-32 h-44 object-cover rounded-lg"
              />
              <div>
                <p className="text-gray-600"><strong>Author:</strong> {selectedBook.author}</p>
                <p className="text-gray-600"><strong>ISBN:</strong> {selectedBook.isbn}</p>
                <Badge variant={selectedBook.status === "Available" ? "success" : "warning"}>
                  {selectedBook.status}
                </Badge>
                {selectedBook.returnDate && (
                  <p className="text-sm text-gray-500 mt-2">Return by: {selectedBook.returnDate}</p>
                )}
              </div>
            </div>
            <Button>Request Book</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
