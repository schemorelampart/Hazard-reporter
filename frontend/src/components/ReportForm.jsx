import { useState, useRef } from "react";
import axios from "axios";
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import LocationPicker from "./LocationPicker";

export default function HazardReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Road");
  const [location, setLocation] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      setMessage("❌ Please select a location on the map.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category.toLowerCase());
    formData.append("location", JSON.stringify(location));
    if (file) formData.append("image", file);

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reports/submit/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("✅ Report submitted!");
      console.log("Success:", res.data);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("Road");
      setLocation(null);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Submission failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl max-w-lg w-full p-8 border border-white/40">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          🚨 Hazard Patrol
        </h1>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Report hazards quickly and help keep the community safe.
        </p>

        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.includes("❌") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              Title
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-purple-400 transition">
              <PencilSquareIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter hazard title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Describe the hazard in detail..."
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              Category
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Road</option>
              <option>Construction</option>
              <option>Weather</option>
              <option>Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              Location
            </label>
            <LocationPicker onChange={(coords) => setLocation(coords)} />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              Upload Photo
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
              <CloudArrowUpIcon className="h-10 w-10 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">
                Click to upload or drag & drop
              </span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}
