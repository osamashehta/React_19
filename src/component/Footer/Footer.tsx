export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="container max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">R</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">React 19</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Exploring modern React patterns, optimistic UI updates, and the latest features in React 19.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/onMutate" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    OnMutate Demo
                                </a>
                            </li>
                            <li>
                                <a href="/useOptimistic" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    UseOptimistic Demo
                                </a>
                            </li>
                            <li>
                                <a href="/activity" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    Activity Page
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Built With</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                React 19
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                Next.js
                            </span>
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                TypeScript
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                Tailwind CSS
                            </span>
                            <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                                React Query
                            </span>
                        </div>
                    </div>
                </div>


            </div>
        </footer>
    );
}
