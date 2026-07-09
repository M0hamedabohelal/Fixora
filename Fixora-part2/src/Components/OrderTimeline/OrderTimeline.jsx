const OrderTimeline = ({ order }) => {
  const timeline = order.timeline || [];

  if (timeline.length === 0) return null;

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#12376B]/10">
          <i className="fa-solid fa-clock-rotate-left text-xl text-[#12376B]"></i>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Order Timeline
          </h2>

          <p className="text-sm text-gray-500">
            Track every stage of your order.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {timeline.map((step, index) => {
          const isLast = index === timeline.length - 1;

          return (
            <div key={step.id} className="relative flex gap-5">

              {/* Line & Circle */}
              <div className="flex flex-col items-center">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full
                  ${
                    step.completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <i
                    className={
                      step.completed
                        ? "fa-solid fa-check"
                        : "fa-solid fa-clock"
                    }
                  ></i>
                </div>

                {!isLast && (
                  <div
                    className={`mt-2 w-[2px] flex-1
                    ${
                      step.completed
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {step.time}
                  </span>

                </div>

                {step.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {step.description}
                  </p>
                )}

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OrderTimeline;