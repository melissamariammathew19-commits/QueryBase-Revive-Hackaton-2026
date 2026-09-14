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
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
			<h1 className="text-3xl font-bold mb-6">Where are you located?</h1>

			<button
				onClick={detectLocation}
				className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-4 hover:bg-blue-700"
			>
				Detect My Location
			</button>

			{status === "loading" && <p>Detecting...</p>}
			{status === "error" && (
				<p className="text-red-500">
					Couldn't detect location — please select manually.
				</p>
			)}
			{location && (
				<p className="mb-4">
					Selected: <strong>{location}</strong>
				</p>
			)}

			<div className="mb-6">
				<p className="mb-2 text-gray-600">Or choose manually:</p>
				<div className="flex gap-3">
					<button
						onClick={() => handleManualSelect("California")}
						className="border px-4 py-2 rounded-lg hover:bg-gray-100"
					>
						California
					</button>
					<button
						disabled
						className="border px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
					>
						Texas (Coming Soon)
					</button>
					<button
						disabled
						className="border px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
					>
						New York (Coming Soon)
					</button>
				</div>
			</div>

			<button
				onClick={handleContinue}
				disabled={!location}
				className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700"
			>
				Continue
			</button>
		</div>
	);
}

export default Location;
