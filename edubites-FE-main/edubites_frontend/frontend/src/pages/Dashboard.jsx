import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEvent, MdMenuBook, MdReceiptLong, MdHealing } from "react-icons/md";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import {
  statsData,
  announcements,
  todaysMenu,
  events,
  padRequests,
} from "../data/dummyData";

const statCards = [
  { label: "Upcoming Events", value: "upcomingEvents", icon: MdEvent, color: "bg-edubites-sky/10 text-edubites-sky" },
  { label: "Books Available", value: "booksAvailable", icon: MdMenuBook, color: "bg-edubites-mint/50 text-emerald-700" },
  { label: "Orders Today", value: "ordersToday", icon: MdReceiptLong, color: "bg-edubites-peach/50 text-amber-700" },
  { label: "Pad Requests", value: "padRequests", icon: MdHealing, color: "bg-edubites-lavender/50 text-purple-700" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(statsData);
  const [courses, setCourses] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const eventsToShow = upcomingEvents.length ? upcomingEvents : events;

  const token = localStorage.getItem("token");

  // If there is no token, force user to login
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in, keep dummy booksAvailable count
      return;
    }

    fetch("http://127.0.0.1:8000/api/books/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Books request failed: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Supports common shapes:
        // 1) { success: true, data: { count, results: [] } }
        // 2) DRF default pagination: { count, results: [] }
        // 3) Plain list: []
        const apiData = data?.data ?? data;
        const count =
          typeof apiData?.count === "number"
            ? apiData.count
            : Array.isArray(apiData)
              ? apiData.length
              : Array.isArray(apiData?.results)
                ? apiData.results.length
                : null;

        if (typeof count === "number") {
          setStats(prev => ({
            ...prev,
            booksAvailable: count,
          }));
        }
      })
      .catch(err => console.error("Error fetching books count:", err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/events/upcoming/")
      .then(res => res.json())
      .then(data => {
        // Expected shape:
        // { success, message, data: { count, results: [] } }
        const apiData = data?.data ?? data;
        const results = Array.isArray(apiData?.results) ? apiData.results : [];
        const count = typeof apiData?.count === "number" ? apiData.count : results.length;

        setUpcomingEvents(results);
        setStats(prev => ({
          ...prev,
          upcomingEvents: count,
        }));
      })
      .catch(err => console.error("Error fetching upcoming events:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in, keep dummy padRequests count
      return;
    }

    fetch("http://127.0.0.1:8000/api/pad-requests/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        // Expected shape:
        // { success: true, data: { count, results: [] } }
        const count = data?.data?.count ?? 0;

        setStats(prev => ({
          ...prev,
          padRequests: count,
        }));
      })
      .catch(err => console.error("Error fetching pad requests count:", err));
  }, []);

  // Fetch "Orders Today" count from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in, keep dummy ordersToday value
      return;
    }

    fetch("http://127.0.0.1:8000/api/orders/today/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Orders request failed: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Expected response:
        // { success: true, message, data: { count, results: [] } }
        const count = data?.data?.count;

        if (typeof count === "number") {
          setStats(prev => ({
            ...prev,
            ordersToday: count,
          }));
        }
      })
      .catch(err => console.error("Error fetching orders today:", err));
  }, []);
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <Card className="p-6 bg-gradient-to-r from-edubites-sky/20 via-edubites-lavender/20 to-edubites-peach/20">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to EduBites! 👋</h1>
        <p className="text-gray-600 mt-1">{today}</p>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <Card key={value} hover className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats[value]}</p>
              </div>
              <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📢 Announcements</h2>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {announcements.slice(0, 3).map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">{a.title}</span>
                  <Badge variant={a.priority === "Urgent" ? "danger" : a.priority === "Important" ? "warning" : "default"}>
                    {a.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{a.description}</p>
                <p className="text-xs text-gray-400 mt-2">{a.timestamp}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Menu */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🍽 Today's Menu</h2>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {todaysMenu.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <span className="font-semibold text-edubites-sky">₹{item.price}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate("/canteen")}>
            View Full Menu
          </Button>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📅 Upcoming Events</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {eventsToShow.slice(0, 4).map((event) => (
              <div key={event.id} className="p-4 rounded-lg border border-gray-100 hover:border-edubites-sky/30 transition-colors">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-24 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-800">{event.name}</h3>
                <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                <Button size="sm" className="mt-2" onClick={() => toast.success(`Joined "${event.name}"!`)}>Join</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Pad Request Status */}
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🌸 Pad Request Status</h2>
          <div className="space-y-2">
            {padRequests.slice(0, 3).map((req) => (
              <div key={req.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-800">{req.date}</p>
                  <p className="text-xs text-gray-600">{req.reason}</p>
                </div>
                <Badge
                  variant={
                    req.status === "Approved" ? "success" : req.status === "Rejected" ? "danger" : "warning"
                  }
                >
                  {req.status}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate("/pad-request")}>
            View All Requests
          </Button>
        </Card>
      </div>
    </div>
  );
}
