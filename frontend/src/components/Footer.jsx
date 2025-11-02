import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-5 text-xs text-white duration-300 border-b shadow-md border-indigo-300/30 backdrop-blur-md bg-indigo-800/90">
      <div className="flex items-center justify-between px-6 mx-auto max-w-7xl">
        <span>© {new Date().getFullYear()} STORA</span>
        <p className="tracking-wider text-white">
          Developed By:{" "}
          <Link
            to="https://www.linkedin.com/in/venkateshamulraj2004"
            target="_blank"
            className="underline"
          >
            Venkatesh A
          </Link>
        </p>
        <span className="text-gray-200">Made with ❤️ by STORA</span>
      </div>
    </footer>
  );
}
