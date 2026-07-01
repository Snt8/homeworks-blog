import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function BlogPanel() {
    const [searchParams] = useSearchParams()
    const courseId = searchParams.get('courseId')

    const [homeworks, setHomeworks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [homeworkCreation, setHomeworkCreation] = useState(false)
    const [homeworkSubject, setHomeworkSubject] = useState('')
    const [homeworkDescription, setHomeworkDescription] = useState('')
    const [homeworkDueDate, setHomeworkDueDate] = useState()

    useEffect(() => {
        if (courseId) {
            fetchHomeworks()
        }
    }, [courseId])

    const fetchHomeworks = async () => {
        try {
            setLoading(true)
            setError('')

            const url = `${API_ENDPOINTS.getCourseHomeworks}?courseId=${courseId}`
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

    const createHomework = async (e) => {
        e.preventDefault()
        try {
            setError('')
            const response = await fetch(API_ENDPOINTS.createHomework, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    'subject': homeworkSubject, 
                    'description': homeworkDescription, 
                    'dueDate': homeworkDueDate,
                    'courseId': Number(courseId)
                })
            })

            if (!response.ok) {
                throw new Error(`Course creation failed: ${response.status}`)
            }

            const data = await response.json()
            setHomeworkSubject('')
            setHomeworkDescription('')
            setHomeworkDueDate(null)
            setHomeworkCreation(false)
            await fetchHomeworks()
        } catch (err) {
            setError(err.message || 'Course creation failed')
            console.error('Create course error:', err)
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
                <div className="mb-8">
                    <button
                        onClick={() => setHomeworkCreation(!homeworkCreation)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-emerald-500/50 text-sm"
                    >
                        {homeworkCreation ? 'Cancel' : '+ Create Homework'}
                    </button>
                </div>

                {homeworkCreation && (
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-8">
                        <h2 className="text-lg font-bold text-slate-100 mb-4">New Homework</h2>
                        <form onSubmit={(e) => createHomework(e)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Homework subject</label>
                                <input
                                    type='text'
                                    value={homeworkSubject}
                                    placeholder='math'
                                    onChange={(e) => setHomeworkSubject(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Homework description</label>
                                <input
                                    type='text'
                                    value={homeworkDescription}
                                    placeholder='homework instructions'
                                    onChange={(e) => setHomeworkDescription(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Homework due date</label>
                                <input
                                    type='date'
                                    value={homeworkDueDate}
                                    onChange={(e) => setHomeworkDueDate(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-sm [color-scheme:dark]"
                                />
                            </div>
                            <button
                                type='submit'
                                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-emerald-500/50 text-sm"
                            >
                                Create
                            </button>
                        </form>
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
