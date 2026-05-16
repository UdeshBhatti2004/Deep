// src/components/Navbar.jsx

import { Link, useLocation } from "react-router-dom"

function Navbar() {

    const location = useLocation()

    return (

        <div className="border-b border-slate-800 bg-[#020617]/80 backdrop-blur sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                <Link
                    to="/"
                    className="text-xl sm:text-2xl font-bold text-white"
                >
                    DeepQuantica
                </Link>

                <div className="flex items-center gap-3 sm:gap-5">

                    <Link
                        to="/"
                        className={`transition-all duration-300 font-medium ${
                            location.pathname === "/"
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/create"
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                            location.pathname === "/create"
                                ? "bg-blue-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
                        }`}
                    >
                        Create Job
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Navbar