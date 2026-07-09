import { Link } from "react-router-dom";

const ChatHeader = ({ provider, onClose }) => {
  return (
    <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow-sm">
      {/* Provider */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="h-14 w-14 rounded-full object-cover border-2 border-[#12376B]/10"
          />

          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">
              {provider.name}
            </h2>

            {provider.verified && (
              <i className="fa-solid fa-circle-check text-blue-600 text-sm"></i>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {provider.speciality}
          </p>

          <p className="mt-1 flex items-center gap-2 text-xs text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Online
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          to={`tel:${provider.phone}`}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#12376B] transition hover:bg-[#12376B]/10"
        >
          <i className="fa-solid fa-phone"></i>
        </Link>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#12376B] transition hover:bg-[#12376B]/10"
        >
          <i className="fa-solid fa-video"></i>
        </button>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-red-100 hover:text-red-600"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;