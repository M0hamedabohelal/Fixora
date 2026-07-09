const Gallery = ({ order }) => {
  const { gallery } = order;

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Service Gallery
        </h2>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
          {gallery.length} Photos
        </span>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((photo) => (
          <div
            key={photo.id}
            className="group overflow-hidden rounded-2xl"
          >
            <img
              src={photo.image}
              alt={`Gallery ${photo.id}`}
              loading="lazy"
              className="
                h-52
                w-full
                object-cover
                transition
                duration-300
                group-hover:scale-110
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;