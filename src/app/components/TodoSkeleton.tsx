export default function TodoSkeleton() {
  return (
    <ul className="w-full flex flex-col rounded-lg shadow-lg overflow-hidden">
      {[1, 2, 3].map((item) => (
        <li
          key={item}
          className="w-full h-16 bg-primaryBackground flex items-center px-4 gap-4 border-b border-outlinePrimary"
        >
          <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
}
