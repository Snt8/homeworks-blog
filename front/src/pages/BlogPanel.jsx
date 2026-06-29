import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function BlogPanel() {
    const [searchParams] = useSearchParams()
    const courseId = searchParams.get('courseId')

    const [homeworks, setHomeworks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (courseId) {
            fetchHomeworks()
        }
    }, [courseId])

    const fetchHomeworks = async () => {
        try {
            setLoading(true)
            setError('')

            const url = `${API_ENDPOINTS.getCourseHomeworks}`.replace('{courseId}', courseId)
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Failed to fetch homeworks: ${response.status}`)
            }

            const data = await response.json()
            setHomeworks(data || [])
        } catch (err) {
            setError(err.message)
            console.error('Fetch homeworks error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!courseId) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
                {/* Header */}
                <header className="bg-slate-900 border-b border-slate-700 shadow-md">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between">
                        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">Blog</h1>
                        <Link to='/courses'>
                            <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition duration-200 text-xs sm:text-sm">
                                Back to Courses
                            </button>
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
                        <p className="text-slate-400">No course selected. Please select a course first.</p>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 shadow-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">Course Blog - Homeworks</h1>
                    <Link to='/courses'>
                        <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition duration-200 text-xs sm:text-sm">
                            Back to Courses
                        </button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-slate-400">Loading homeworks...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg mb-6">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {!loading && homeworks.length === 0 && (
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
                        <p className="text-slate-400">No homeworks in this course yet.</p>
                    </div>
                )}

                {!loading && homeworks.length > 0 && (
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-8">Homeworks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {homeworks.map(homework => (
                                <div
                                    key={homework.id}
                                    className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-emerald-500 transition duration-300 hover:shadow-lg hover:shadow-emerald-500/10 flex flex-col"
                                >
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-3">{homework.subject}</h3>
                                    <p className="text-slate-400 text-sm mb-4 flex-1">{homework.description}</p>
                                    <p className="text-slate-500 text-xs mb-6 font-semibold">
                                        Due: <span className="text-emerald-400">{new Date(homework.dueDate).toLocaleDateString()}</span>
                                    </p>
                                    <Link to={`/homework/${homework.id}`}>
                                        <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-emerald-500/50 text-sm">
                                            View Comments
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
