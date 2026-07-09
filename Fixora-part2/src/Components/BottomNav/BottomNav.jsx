import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const navItems = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      id: 2,
      title: "Orders",
      path: "/orders",
      icon: "fa-solid fa-clipboard-list",
    },
    {
      id: 3,
      title: "Notifications",
      path: "/notifications",
      icon: "fa-solid fa-bell",
      badge: true,
    },
    {
      id: 4,
      title: "Profile",
      path: "/profile",
      icon: "fa-solid fa-user",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-6">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center transition ${
                isActive
                  ? "text-[#12376B]"
                  : "text-gray-400 hover:text-[#12376B]"
              }`
            }
          >
            <i className={`${item.icon} text-lg`}></i>

            {item.badge && (
              <span className="absolute right-1 top-0 h-2 w-2 rounded-full bg-red-500"></span>
            )}

            <span className="mt-1 text-[11px] font-medium">
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;