import React from 'react';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pt-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Transform Your Content with</span>
                <span className="block text-indigo-600">
                  AI-Powered Video Editing
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Create viral-worthy clips in minutes. Our AI technology helps
                you identify key moments, add captions, and optimize for every
                social platform.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Creating
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-gradient-to-b from-white"></div>
          <div className="flex-1 w-full bg-gradient-to-t from-indigo-50"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6"></div>
      </div>
    </div>
  );
}
