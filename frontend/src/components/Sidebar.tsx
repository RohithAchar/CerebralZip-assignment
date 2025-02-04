"use client";
import {
  LayoutGrid,
  BarChart3,
  ArrowLeftRight,
  Share2,
  Users2,
  Settings,
  Users,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "#", icon: LayoutGrid, current: true },
  { name: "Campaigns", href: "#", icon: BarChart3, current: false },
  { name: "Flows", href: "#", icon: ArrowLeftRight, current: false },
  { name: "Integrations", href: "#", icon: Share2, current: false },
  { name: "Customers", href: "#", icon: Users2, current: false },
];

const teams = [
  { name: "Settings", href: "#", icon: Settings },
  { name: "Team", href: "#", icon: Users },
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-56 flex-col bg-[#F4F5F8]">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center px-4">
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-semibold text-gray-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Salesway
        </a>
      </div>

      <div className="flex flex-1 flex-col gap-y-7 px-3">
        {/* Teams section */}
        <div className="space-y-1">
          {teams.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center gap-x-3 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <item.icon className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
              {item.name}
            </a>
          ))}
        </div>

        {/* Navigation section */}
        <div>
          <p className="mb-2 px-2 text-xs font-semibold text-gray-400">MENU</p>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-x-3 rounded-lg px-2 py-2 text-sm font-medium ${
                  item.current
                    ? "bg-white text-[#0770F7]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 ${
                    item.current
                      ? "text-[#6366F1]"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer with avatar */}
      <div className="flex h-16 shrink-0 items-center px-4 pb-20">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-700">Tom Wang</span>
        </div>
      </div>
    </div>
  );
}
