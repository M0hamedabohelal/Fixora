const OrderInfo = ({ order }) => {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#12376B]/10">
          <i className="fa-solid fa-circle-info text-xl text-[#12376B]"></i>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Order Information
          </h2>

          <p className="text-sm text-gray-500">
            Details about this service request
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Service</p>

          <h3 className="mt-1 font-semibold text-gray-900">
            {order.service.name}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Order Number</p>

          <h3 className="mt-1 font-semibold text-gray-900">
            {order.id}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Scheduled Time</p>

          <h3 className="mt-1 font-semibold text-gray-900">
            {order.scheduledAt}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Price</p>

          <h3 className="mt-1 font-semibold text-[#12376B]">
            {order.finalPrice || order.price || (order.minPrice ? `${order.minPrice} - ${order.maxPrice}` : '')} {order.finalPrice || order.price || order.minPrice ? 'EGP' : 'N/A'}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 md:col-span-2">
          <p className="text-sm text-gray-500">Location</p>

          <h3 className="mt-1 font-semibold text-gray-900">
            {order.location.address}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {order.location.district}, {order.location.city}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 md:col-span-2">
          <p className="text-sm text-gray-500">Description</p>

          <p className="mt-2 leading-7 text-gray-700">
            {order.description}
          </p>
        </div>

      </div>
    </section>
  );
};

export default OrderInfo;
