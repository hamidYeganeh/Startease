export function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 0c3.4 15.4 8.6 20.6 24 24-15.4 3.4-20.6 8.6-24 24C20.6 32.6 15.4 27.4 0 24 15.4 20.6 20.6 15.4 24 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className={diagonal ? "arrow diagonal" : "arrow"}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <span className="brand" dir="ltr">
      <Star />
      startease
    </span>
  );
}
