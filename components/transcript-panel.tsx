/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Q2xWQO0CoSv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export function TranscriptPanel({
  transcription_language,
  transcription,
  translation,
  translation_language,
}: {
  transcription?: string | null
  transcription_language?: string | null
  translation?: string | null
  translation_language?: string | null
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4 md:flex-row">
      <div className="flex h-full w-full flex-col rounded-lg bg-gray-100 dark:bg-gray-800 md:w-1/2">
        <div className="bg-gray-100 p-6 dark:bg-gray-800">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Transcribing - {transcription_language ?? 'English'}
          </h2>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
          <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl lg:text-2xl">
            {transcription ?? 'Not started...'}
          </p>
        </div>
      </div>
      <div className="flex h-full w-full flex-col rounded-lg bg-gray-100 dark:bg-gray-800 md:w-1/2">
        <div className="bg-gray-100 p-6 dark:bg-gray-800">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Translating - {translation_language ?? '中文'}
          </h2>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
          <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl lg:text-2xl">
            {translation ?? '沒有開始...'}
          </p>
        </div>
      </div>
    </div>
  )
}