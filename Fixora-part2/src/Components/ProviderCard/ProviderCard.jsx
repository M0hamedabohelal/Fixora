import { Link } from "react-router-dom";

const ProviderCard = ({ order, onOpenChat }) => {
  const { provider } = order;

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="h-20 w-20 rounded-full border-2 border-[#12376B]/10 object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {provider.name}
              </h2>

              {provider.verified && (
                <i className="fa-solid fa-circle-check text-blue-600"></i>
              )}
            </div>

            <p className="mt-1 text-gray-500">
              {provider.speciality}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <i className="fa-solid fa-star"></i>

                <span className="font-semibold">
                  {provider.rating}
                </span>
              </div>

              <span className="text-gray-400">
                ({provider.reviews} Reviews)
              </span>
            </div>
          </div>
        </div>

        <Link
          to={`tel:${provider.phone}`}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#12376B] text-white transition hover:bg-[#0F2F5A]"
        >
          <i className="fa-solid fa-phone"></i>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gray-50 p-4 text-center">
          <h3 className="text-2xl font-bold text-[#12376B]">
            {provider.experience}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Years
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 text-center">
          <h3 className="text-2xl font-bold text-[#12376B]">
            {provider.reviews}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Reviews
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 text-center">
          <h3 className="text-2xl font-bold text-[#12376B]">
            {provider.rating}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Rating
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <a
          href={`tel:${provider.phone}`}
          className="flex items-center justify-center gap-3 rounded-2xl bg-[#12376B] py-4 font-semibold text-white transition hover:bg-[#0F2F5A]"
        >
          <i className="fa-solid fa-phone"></i>

          Call Now
        </a>

        <button
            onClick={onOpenChat}
            className="flex items-center justify-center gap-3 rounded-2xl border border-[#12376B] py-4 font-semibold text-[#12376B] transition hover:bg-[#12376B] hover:text-white"
            >
            <i className="fa-regular fa-message"></i>
            Send Message
        </button>
      </div>
    </section>
  );
};

export default ProviderCard;