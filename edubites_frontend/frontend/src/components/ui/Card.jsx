export default function Card({ children, className = "", hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md border border-gray-100
        transition-all duration-300
        ${hover ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
