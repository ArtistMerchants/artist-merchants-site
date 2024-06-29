import { useState, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { motion } from 'framer-motion'

export const ArchiveForm = () => {
  const [error, setError] = useState<string | null>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { setUnlocked } = useSiteStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const password = passwordRef.current?.value

    if (!password) {
      setError('Incorrect password')
      return
    }

    try {
      const res = await fetch(`/api/auth?password=${password}`, {
        method: 'POST',
      })

      if (!res.ok) {
        throw new Error('Incorrect password')
      }

      setUnlocked(true)
    } catch (error) {
      setError('Incorrect password')
    }
  }

  return (
    <motion.div
      className="col-span-2 flex flex-col gap-8"
      key="archive-locked"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <form
        className={`flex w-full flex-col gap-6 ${error ? 'animate-shake' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className="flex w-full items-start items-center gap-6">
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            type="password"
            className="w-full max-w-[240px] border-b-1 border-solid border-white bg-transparent focus:outline-none"
            ref={passwordRef}
          />
        </div>
        <button
          className="pt-8 text-left underline underline-offset-4"
          type="submit"
        >
          Submit
        </button>
        {error ? (
          <p className="text-[11px] uppercase" aria-live="polite">
            {error}
          </p>
        ) : null}
      </form>
    </motion.div>
  )
}
