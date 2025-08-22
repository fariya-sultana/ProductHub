'use client'

import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPageWrapper() {
    return (
        <Suspense fallback={<p className="text-center py-12 text-gray-500 dark:text-gray-400">Loading...</p>}>
            <LoginForm />
        </Suspense>
    )
}
