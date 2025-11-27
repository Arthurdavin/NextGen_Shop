import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div>
            <div className="text-center h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
                <Image
                    src="https://png.pngtree.com/png-clipart/20220303/original/pngtree-error-404-under-construction-sign-3d-icon-website-banner-concept-png-image_7382631.png"
                    alt="404 Illustration"
                    className="mx-auto w-80 h-80"
                    unoptimized
                    width={300}
                    height={300}
                />
                <h1 className="text-7xl font-extrabold text-blue-700 mt-6">Looks Like You&apos;re Lost!</h1>
                <p className="text-xl text-gray-700 mt-2">We can&apos;t seem to find the page you&apos;re looking for.</p>
                <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700">Return Home</Link>
            </div>
        </div>
    )
}
