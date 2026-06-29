import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function Register() {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setError('')
            setSuccess(false)
            setLoading(true)

            const response = await fetch(API_ENDPOINTS.register, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastname, email, password })
            })

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.status}`)
            }

            const data = await response.json()
            setSuccess(true)
            setName('')
            setLastname('')
            setEmail('')
            setPassword('')

            setTimeout(() => window.location.href = '/login', 2000)
        } catch (err) {
            setError(err.message || 'Registration failed')
            console.error('Registration error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 shadow-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">Register</h1>
                    <Link to='/'>
                        <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition duration-200 text-xs sm:text-sm">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="w-full max-w-md">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 sm:p-10">
                        {success && (
                            <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-700 rounded-lg">
                                <p className="text-emerald-400 text-sm">Registration successful! Redirecting...</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='John'
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastname" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Last Name
                                </label>
                                <input
                                    id="lastname"
                                    type='text'
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder='Doe'
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='your@email.com'
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='••••••••'
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            <button
                                type='submit'
                                disabled={loading}
                                className="w-full px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>

                            <p className="text-center text-slate-400 text-sm">
                                Already have an account? <Link to='/login' className="text-indigo-400 hover:text-indigo-300 font-semibold">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
