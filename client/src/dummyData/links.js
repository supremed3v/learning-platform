import { MdOutlineSpaceDashboard,MdOutlineAnalytics,MdOutlineIntegrationInstructions,MdPayment,MdOutlineMoreHoriz } from "react-icons/md";

export const adminLinks = [
    {
      name: "Dashboard",
      icon: (
        <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/dashboard",
    },
    {
      name: "Courses",
      icon: (
        <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/courses",
    },
    {
      name: "Integrations",
      icon: (
        <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/integrations",
    },
    {
      name: "Payments",
      icon: (
        <MdPayment className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/payments",
    },
    {
      name: "More",
      icon: (
        <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/more",
    },
  ];


  export const instructorLinks = [
    {
        name: "Dashboard",
        icon: (
            <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
        ),
        href: "/instructor/dashboard",
    },
    {
        name: "Courses",
        icon: (
            <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
        ),
        href: "/instructor/courses",
    },
    {
        name: "Earnings",
        icon: (
            <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
        ),
        href: "/instructor/earnings",
    }
  ]

    export const userLinks = [
        {
            name: "Dashboard",
            icon: (
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
            ),
            href: "/user/dashboard",
        },
        {
            name: "Courses",
            icon: (
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
            ),
            href: "/user/courses",
        },
        {
            name: "Purchases",
            icon: (
                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
            ),
            href: "/user/purchases",

        },
        {
            name: "Wishlist",
            icon: (
                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
            ),
            href: "/user/wishlist",
        }
    ]