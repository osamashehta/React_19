"use client";
import { Activity, useState } from "react";

export default function page() {
    const [state, setState] = useState<"first" | "second">("first");


    return (
        <div className="container w-[95%] mx-auto my-12 ">
            <div className="tap mb-4">
                <button
                    className={`px-4 py-2 mr-2 rounded-lg ${state === "first" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setState("first")}
                >
                    First Tab
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-lg ${state === "second" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setState("second")}
                >
                    Second Tab
                </button>
            </div>
            <Activity mode={state === "first" ? "visible" : "hidden"}>
                <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    type="text"
                    placeholder="Enter first text..."

                />
            </Activity>
            <Activity mode={state === "second" ? "visible" : "hidden"}>
                <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    type="text"
                    placeholder="Enter second text..."

                />
            </Activity>
            <div className="my-10">
                without Activity component
            </div>

            {state === "first" && (

                <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    type="text"
                    placeholder="Enter first text..."

                />
            )}

            {state === "second" && (

                <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    type="text"
                    placeholder="Enter second text..."

                />
            )}

        </div>
    );
}
