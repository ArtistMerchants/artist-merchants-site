import { useRef, useState } from 'react'
import { HeaderTab } from 'components/Global/HeaderTab'
import { useSiteStore } from 'hooks/useSiteStore'
import { AnimatePresence, motion } from 'framer-motion'

export const ArchiveTab = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const { unlocked, setUnlocked } = useSiteStore()
  const [error, setError] = useState<string | null>(null)

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
    <HeaderTab className="col-span-2">
      <AnimatePresence initial={false} mode="wait">
        {unlocked ? (
          <motion.div
            className="md:grid md:grid-cols-2"
            key="archive-unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="flex flex-col md:col-start-2">Archive</div>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-8"
            key="archive-locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <form
              className={`flex w-full items-center gap-4 ${
                error ? 'animate-shake' : ''
              }`}
              onSubmit={handleSubmit}
            >
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                className="w-full max-w-[240px] border-b-1 border-solid border-white bg-transparent focus:outline-none"
                ref={passwordRef}
              />
            </form>
            {error && (
              <p className="text-[11px] uppercase" aria-live="polite">
                {error}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </HeaderTab>
  )
}
