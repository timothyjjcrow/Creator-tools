"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 hover:text-blue-600"
              >
                Indie Creator Hub
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/tools"
                className="text-base font-medium text-gray-700 hover:text-gray-900"
              >
                Tools Directory
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setIsDropdownOpen(false)}
                  className="text-base font-medium text-gray-700 hover:text-gray-900 flex items-center"
                >
                  <span>Micro-Tools</span>
                  <svg
                    className="ml-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg"
                  >
                    <div className="py-1">
                      <Link
                        href="/tools/checklist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Creator's Checklist
                      </Link>
                      <Link
                        href="/tools/word-counter"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Word Counter
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="hidden md:flex items-center">
              <a
                href="https://coff.ee/timothycrowley"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600"
              >
                Support This Project
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/tools"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Tools Directory
              </Link>
              <Link
                href="/tools/checklist"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Creator's Checklist
              </Link>
              <Link
                href="/tools/word-counter"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Word Counter
              </Link>
              <a
                href="https://coff.ee/timothycrowley"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600"
              >
                Support This Project
              </a>
            </div>
          </div>
        )}
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Indie Creator Hub. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-400"
              >
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-400">
                Terms
              </Link>
              <a
                href="https://coff.ee/timothycrowley"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:text-yellow-400"
              >
                Support Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
