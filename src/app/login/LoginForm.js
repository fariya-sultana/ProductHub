'use client'

import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams?.get('callbackUrl') || '/products'
    const error = searchParams?.get('error')

    // Show toast for errors
    useEffect(() => {
        if (!error) return
        switch (error) {
            case 'CredentialsSignin':
                toast.error('Invalid email or password')
                break
            case 'AccessDenied':
                toast.error('Access denied')
                break
            default:
                toast.error('An error occurred during sign in')
        }
    }, [error])

    // Redirect if logged in
    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            if (session) router.push(callbackUrl)
        }
        checkSession()
    }, [router, callbackUrl])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCredentialsLogin = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) return toast.error('Please fill in all fields')
        setIsLoading(true)
        try {
            const result = await signIn('credentials', { email: formData.email, password: formData.password, redirect: false, callbackUrl })
            if (result?.error) toast.error('Login failed')
            else if (result?.ok) {
                toast.success('Login successful!')
                router.push(callbackUrl)
            }
        } catch (err) {
            toast.error('Login failed')
            console.error(err)
        } finally { setIsLoading(false) }
    }

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true)
        try {
            const result = await signIn('google', { callbackUrl, redirect: false })
            if (result?.error) toast.error('Google login failed')
        } catch (err) {
            toast.error('Google login failed')
            console.error(err)
        } finally { setIsGoogleLoading(false) }
    }

    const fillDemoCredentials = () => {
        setFormData({ email: 'test@test.com', password: '123456' })
        toast.success('Demo credentials filled!')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Demo credentials */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Demo Account</h3>
                        <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">Use demo credentials to test the login</p>
                    </div>
                    <button
                        type="button"
                        onClick={fillDemoCredentials}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
                    >
                        Fill Demo
                    </button>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleCredentialsLogin}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Signing in...' : (
                            <div className="flex items-center">
                                Sign in
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        )}
                    </button>

                    {/* Google login */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
                    </button>
                </form>

                {/* Sign up / Home */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don’t have an account?{' '}
                        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            Sign up here
                        </Link>
                    </p>
                    <Link href="/" className="inline-block mt-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}
