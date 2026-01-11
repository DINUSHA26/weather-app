export default function CacheStatus({ status }) {
  const isHit = status === "HIT";
  return (
    <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${isHit ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
      Cache: {status || "LOADING..."}
    </div>
  );
}