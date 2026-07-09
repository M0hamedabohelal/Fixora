import BackButton from "../BackButton";

const OrderHero = ({ order }) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-blue-100 text-blue-700",
      icon: "fa-solid fa-truck-fast",
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-700",
      icon: "fa-solid fa-circle-check",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-700",
      icon: "fa-solid fa-circle-xmark",
    },
  };

  const status = statusConfig[order.status];

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">

      {/* Cover */}
      <div className="relative h-72">
        <img
          src={order.service.image}
          alt={order.service.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <BackButton />
        </div>

        <span
          className={`absolute top-6 right-6 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}
        >
          <i className={status.icon}></i>
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              {order.id}
            </h1>

            <h2 className="mt-3 text-xl font-semibold text-[#12376B]">
              {order.service.name}
            </h2>

            <p className="mt-2 max-w-2xl text-gray-500">
              {order.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Price
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#12376B]">
                {order.price} {order.currency}
              </h3>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Scheduled
              </p>

              <h3 className="mt-1 font-semibold text-gray-900">
                {order.scheduledAt}
              </h3>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Technician
              </p>

              <h3 className="mt-1 font-semibold text-gray-900">
                {order.provider.name}
              </h3>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Rating
              </p>

              <h3 className="mt-1 flex items-center gap-2 font-semibold text-gray-900">
                <i className="fa-solid fa-star text-yellow-400"></i>
                {order.provider.rating}
              </h3>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default OrderHero;
