import { useGeolocation } from "./useGeolocation";

export function CheckGPS() {
  const { location, error, isLoading, getLocation } = useGeolocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Aktifkan Lokasi GPS</h1>
      
      <button onClick={getLocation} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        {isLoading ? "Meminta Lokasi..." : "Aktifkan GPS"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {location && (
        <div className="mt-4 text-center">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {/* <p>Akurasi: {location.accuracy} meter</p> */}
        </div>
      )}
    </div>
  );
}
