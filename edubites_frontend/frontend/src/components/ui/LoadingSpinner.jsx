export default function LoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-2",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`
          ${sizeClasses[size]} border-edubites-sky/30 border-t-edubites-sky
          rounded-full animate-spin
        `}
      />
    </div>
  );
}
