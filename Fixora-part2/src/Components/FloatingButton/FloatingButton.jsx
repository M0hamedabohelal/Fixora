import { Link } from "react-router-dom";

const FloatingButton = () => {
  return (
    <Link
      to="/services"
      className="
        fixed
        bottom-20
        right-6
        z-50

        flex
        items-center
        gap-3

        rounded-full
        bg-[#12376B]
        px-6
        py-4

        text-white
        shadow-xl

        transition-all
        duration-300

        hover:-translate-y-1
        hover:bg-[#0F2F5A]
        hover:shadow-2xl

        active:scale-95
      "
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
        <i className="fa-solid fa-plus text-lg"></i>
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-white/70">
          Create
        </span>

        <span className="font-semibold">
          New Order
        </span>
      </div>
    </Link>
  );
};

export default FloatingButton;