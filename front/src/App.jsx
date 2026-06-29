import { Link } from 'react-router-dom'

export default function App() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 shadow-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    {/* Logo & Description */}
                    <div className="mb-6 sm:mb-0 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent leading-tight">
                                Homeworks Blog
                            </h1>
                            <p className="text-slate-400 text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">
                                Collaborate on your school work
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 sm:gap-4">
                            <Link to='/login'>
                                <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-indigo-500/50 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                                    Login
                                </button>
                            </Link>
                            <Link to='/register'>
                                <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-emerald-500/50 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Hero Section */}
                <section className="text-center mb-14 sm:mb-16 lg:mb-20">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-slate-100 leading-tight">
                        Every homework
                        <span className="block text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text mt-2">
                            in one place
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
                        Connect with your classmates, share homeworks, and collaborate on assignments seamlessly
                    </p>
                </section>

                {/* Features Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-14">
                    {/* What's it */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 hover:border-indigo-500 transition duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">What's it?</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                            Homeworks Blog is a web solution where you can communicate with your classmates about your homeworks.
                            You can share the homeworks you know and receive responses or questions about the homework.
                            Just talk about your school responsibilities in one place.
                        </p>
                    </div>

                    {/* How to use it */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 hover:border-emerald-500 transition duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">How to use it?</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                            To use the Homeworks Blog, first you need to have an account. Once you have one,
                            you can start joining courses and read the homeworks in the blog panel. Share homeworks you know,
                            and let your comments solve questions or explain more about the work.
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-indigo-600/20 to-emerald-600/20 border border-slate-700 rounded-xl p-6 sm:p-8 lg:p-12 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2 sm:mb-4">Ready to get started?</h3>
                    <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
                        Join thousands of students collaborating on their homeworks
                    </p>
                    <Link to='/register'>
                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                            Create Account Now
                        </button>
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-700 bg-slate-900 mt-12 sm:mt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-slate-400 text-sm">
                    <p>&copy; 2026 Homeworks Blog. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
