import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { events, eventCategories } from "../data/dummyData";
import toast from "react-hot-toast";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = selectedCategory === "All"
    ? events
    : events.filter((e) => e.category === selectedCategory);

  const handleJoin = (event) => {
    toast.success(`Joined "${event.name}"!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Events</h1>
        <p className="text-gray-500 mt-1">Discover and join campus events</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {eventCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-edubites-sky text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} hover className="overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <span className="text-xs font-medium text-edubites-sky bg-edubites-sky/10 px-2 py-1 rounded">
                {event.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{event.name}</h3>
              <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-2">
                <span>📅 {event.date}</span>
                <span>🕐 {event.time}</span>
                <span>📍 {event.location}</span>
              </div>
              <p className="text-gray-600 text-sm mt-3 line-clamp-2">{event.description}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" onClick={() => handleJoin(event)}>
                  Join
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.name}
        size="lg"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div>
              <p className="text-gray-600">{selectedEvent.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              <p><strong>Time:</strong> {selectedEvent.time}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Category:</strong> {selectedEvent.category}</p>
            </div>
            <Button onClick={() => handleJoin(selectedEvent)}>Join Event</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
