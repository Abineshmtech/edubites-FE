import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { announcements, padRequests, priorityLevels } from "../data/dummyData";
import toast from "react-hot-toast";

const tabs = ["Announcements", "Events", "Canteen Menu", "Pad Requests"];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [announcementList, setAnnouncementList] = useState(announcements);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    description: "",
    priority: "Normal",
  });
  const [eventForm, setEventForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "Workshop",
  });
  const [foodForm, setFoodForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Breakfast",
    available: true,
  });
  const [adminPadRequests, setAdminPadRequests] = useState(padRequests);

  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.description) {
      toast.error("Fill all fields");
      return;
    }
    setAnnouncementList([
      {
        id: announcementList.length + 1,
        ...announcementForm,
        timestamp: new Date().toLocaleString(),
      },
      ...announcementList,
    ]);
    setAnnouncementForm({ title: "", description: "", priority: "Normal" });
    toast.success("Announcement published!");
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    toast.success("Event added!");
    setEventForm({ name: "", date: "", time: "", location: "", description: "", category: "Workshop" });
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    toast.success("Food item added!");
    setFoodForm({ name: "", description: "", price: "", category: "Breakfast", available: true });
  };

  const handlePadAction = (id, action) => {
    setAdminPadRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    toast.success(`Request ${action.toLowerCase()}!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <p className="text-gray-500 mt-1">Manage campus content</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === idx ? "bg-edubites-sky text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Announcements Tab */}
      {activeTab === 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Publish Announcement</h2>
            <form onSubmit={handlePublishAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="Announcement Title"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={announcementForm.description}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, description: e.target.value })}
                  placeholder="Description..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={announcementForm.priority}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
                >
                  {priorityLevels.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <Button type="submit">Publish Announcement</Button>
            </form>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Announcements</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {announcementList.map((a) => (
                <div key={a.id} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{a.title}</span>
                    <Badge variant={a.priority === "Urgent" ? "danger" : a.priority === "Important" ? "warning" : "default"}>
                      {a.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{a.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{a.timestamp}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 1 && (
        <Card className="p-6 max-w-xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Event</h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input
              type="text"
              value={eventForm.name}
              onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
              placeholder="Event Name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
              />
              <input
                type="time"
                value={eventForm.time}
                onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
              />
            </div>
            <input
              type="text"
              value={eventForm.location}
              onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
              placeholder="Location"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
            />
            <textarea
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
              placeholder="Description"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none resize-none"
            />
            <Button type="submit">Add Event</Button>
          </form>
        </Card>
      )}

      {/* Canteen Tab */}
      {activeTab === 2 && (
        <Card className="p-6 max-w-xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Food Item</h2>
          <form onSubmit={handleAddFood} className="space-y-4">
            <input
              type="text"
              value={foodForm.name}
              onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
              placeholder="Food Name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
            />
            <textarea
              value={foodForm.description}
              onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none resize-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={foodForm.price}
                onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                placeholder="Price (₹)"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
              />
              <select
                value={foodForm.category}
                onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 outline-none"
              >
                {["Breakfast", "Lunch", "Snacks", "Drinks"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={foodForm.available}
                onChange={(e) => setFoodForm({ ...foodForm, available: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Available</span>
            </label>
            <Button type="submit">Add Food Item</Button>
          </form>
        </Card>
      )}

      {/* Pad Requests Tab */}
      {activeTab === 3 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pad Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Reason</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminPadRequests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-100">
                    <td className="py-4 px-2 text-gray-800">{req.date}</td>
                    <td className="py-4 px-2 text-gray-600 max-w-xs truncate">{req.reason}</td>
                    <td className="py-4 px-2 text-gray-600">{req.type}</td>
                    <td className="py-4 px-2">
                      <Badge
                        variant={
                          req.status === "Approved" ? "success" : req.status === "Rejected" ? "danger" : "warning"
                        }
                      >
                        {req.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      {req.status === "Pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handlePadAction(req.id, "Approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handlePadAction(req.id, "Rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
