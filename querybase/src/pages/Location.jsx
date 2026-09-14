import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Location() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  const detectLocation = () => {
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const state = data.address.state || "Unknown";
          setLocation(state);
          setStatus("done");
        } catch (err) {
          setStatus("error");
        }
      },
      () => setStatus("error")
    );
  };

  const handleManualSelect = (state) => {
    setLocation(state);
  };

  const handleContinue = () => {
    navigate("/topic", { state: { location } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6 text-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-900 tracking-tight">
        Query<span className="text-indigo-600">Base</span>
      </h1>
      <p className="text-gray-500 mb-8">Where are you located?</p>

      <button
        onClick={detectLocation}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold mb-6 hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-md"
      >
        📍 Detect My Location
      </button>

      {status === "loading" && <p className="text-gray-500 mb-4">Detecting...</p>}
      {status === "error" && (
        <p className="text-red-500 mb-4">
          Couldn't detect location — please select manually.
        </p>
      )}
      {location && (
        <p className="mb-4 text-gray-700">
          Selected: <strong className="text-indigo-600">{location}</strong>
        </p>
      )}

      <div className="mb-8">
        <p className="mb-3 text-gray-500 text-sm font-medium">Or choose manually:</p>
        <div className="flex gap-3">
          <button
            onClick={() => handleManualSelect("California")}
            className="bg-white border-2 border-indigo-200 px-5 py-2.5 rounded-xl font-medium hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm"
          >
            California
          </button>
          <button
            disabled
            className="bg-white/60 border-2 border-dashed border-gray-200 px-5 py-2.5 rounded-xl text-gray-400 cursor-not-allowed"
          >
            Texas (Coming Soon)
          </button>
          <button
            disabled
            className="bg-white/60 border-2 border-dashed border-gray-200 px-5 py-2.5 rounded-xl text-gray-400 cursor-not-allowed"
          >
            New York (Coming Soon)
          </button>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!location}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.03] hover:shadow-lg transition-all shadow-md"
      >
        Continue →
      </button>
    </div>
  );
}

export default Location;