import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { padRequests, padRequestTypes } from "../data/dummyData";
import toast from "react-hot-toast";

export default function PadRequest() {
  const [requests, setRequests] = useState(padRequests);
  const [form, setForm] = useState({
    reason: "",
    date: "",
    type: "Personal",
  });
  const nextExpectedDate = "2025-03-15";

  const handleEmergencyRequest = () => {
    toast.success("Emergency request submitted! Someone will reach out shortly.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.reason || !form.date) {
      toast.error("Please fill all fields");
      return;
    }
    setRequests([
      {
        id: requests.length + 1,
        date: form.date,
        reason: form.reason,
        type: form.type,
        status: "Pending",
      },
      ...requests,
    ]);
    setForm({ reason: "", date: "", type: "Personal" });
    toast.success("Pad request submitted successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">EduBites Care</h1>
        <p className="text-gray-500 mt-1">Pad Request & Support</p>
      </div>

      {/* Emergency Pad Request */}
      <Card className="p-6 bg-gradient-to-r from-rose-50 to-rose-100 border-2 border-rose-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">🚨 Emergency Pad Request</h2>
            <p className="text-gray-600 mt-1">Need immediate support?</p>
          </div>
          <Button variant="danger" size="lg" onClick={handleEmergencyRequest}>
            Request Now
          </Button>
        </div>
      </Card>

      {/* Next Expected Date */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Next Expected Date</h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-edubites-mint/30 text-gray-800">
          <span className="text-2xl">📅</span>
          <span className="font-medium">{nextExpectedDate}</span>
        </div>
      </Card>

      {/* New Pad Request Form */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">New Pad Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Write your reason...</label>
            <textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Enter your reason for the request..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 focus:border-edubites-sky outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date (dd-mm-yyyy)</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 focus:border-edubites-sky outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-edubites-sky/50 focus:border-edubites-sky outline-none"
            >
              {padRequestTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit">Submit Request</Button>
        </form>
      </Card>

      {/* Request History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Request History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Reason</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
