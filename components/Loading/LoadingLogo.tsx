import { useEffect, useState, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

const LETTER_SMALL = 0.2
const LETTER_FULL = 1
const TRANSITION = {
  duration: 1,
  ease: [0.82, 0.01, 0.02, 0.88],
}

export const LoadingLogo = () => {
  const { loading } = useSiteStore()
  const [letter, setLetter] = useState<'a' | 'm' | 'full'>('a')
  const intervalRef = useRef<any>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLetter((prev) => (prev === 'a' ? 'm' : 'a'))
    }, 1500)

    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (!loading) {
      clearInterval(intervalRef.current)
      setLetter('full')
    }
  }, [loading])

  return (
    <motion.svg
      className="h-full w-auto transform-gpu"
      width="1920"
      height="1920"
      viewBox="0 0 1920 1920"
      fill="none"
    >
      <motion.path
        key="1"
        d="M120 1601.4L270 1616.7L219 1699L221 1701L303.3 1650L318.6 1800H321.4L336.7 1650L419 1701L421 1699L370 1616.7L520 1601.4V1598.6L370 1583.3L421 1501L419 1499L336.7 1550L321.4 1400H318.6L303.3 1550L221 1499L219 1501L270 1583.3L120 1598.6V1601.4Z"
        fill="currentColor"
      />
      <motion.path
        key="2"
        className="not-a"
        initial={{ scale: letter === 'a' ? LETTER_SMALL : LETTER_FULL }}
        animate={{ scale: letter === 'a' ? LETTER_SMALL : LETTER_FULL }}
        exit={{ scale: 1 }}
        transition={TRANSITION}
        d="M760 1601.4L910 1616.7L859 1699L861 1701L943.3 1650L958.6 1800H961.4L976.7 1650L1059 1701L1061 1699L1010 1616.7L1160 1601.4V1598.6L1010 1583.3L1061 1501L1059 1499L976.7 1550L961.4 1400H958.6L943.3 1550L861 1499L859 1501L910 1583.3L760 1598.6V1601.4Z"
        fill="currentColor"
      />
      <motion.path
        key="3"
        className="not-m"
        initial={{ scale: letter === 'm' ? LETTER_SMALL : LETTER_FULL }}
        animate={{ scale: letter === 'm' ? LETTER_SMALL : LETTER_FULL }}
        exit={{ scale: 1 }}
        transition={TRANSITION}
        d="M961.4 520L976.7 370L1059 421L1061 419L1010 336.7L1160 321.4V318.6L1010 303.3L1061 221L1059 219L976.7 270L961.4 120H958.6L943.3 270L861 219L859 221L910 303.3L760 318.6V321.4L910 336.7L859 419L861 421L943.3 370L958.6 520H961.4Z"
        fill="currentColor"
      />
      <motion.path
        key="4"
        d="M1400 1601.4L1550 1616.7L1499 1699L1501 1701L1583.3 1650L1598.6 1800H1601.4L1616.7 1650L1699 1701L1701 1699L1650 1616.7L1800 1601.4V1598.6L1650 1583.3L1701 1501L1699 1499L1616.7 1550L1601.4 1400H1598.6L1583.3 1550L1501 1499L1499 1501L1550 1583.3L1400 1598.6V1601.4Z"
        fill="currentColor"
      />
      <motion.path
        key="5"
        className="not-a"
        initial={{ scale: letter === 'a' ? LETTER_SMALL : LETTER_FULL }}
        animate={{ scale: letter === 'a' ? LETTER_SMALL : LETTER_FULL }}
        exit={{ scale: 1 }}
        transition={TRANSITION}
        d="M1400 321.4L1550 336.7L1499 419L1501 421L1583.3 370L1598.6 520H1601.4L1616.7 370L1699 421L1701 419L1650 336.7L1800 321.4V318.6L1650 303.3L1701 221L1699 219L1616.7 270L1601.4 120H1598.6L1583.3 270L1501 219L1499 221L1550 303.3L1400 318.6V321.4Z"
        fill="currentColor"
      />
      <motion.path
        key="6"
        d="M440 961.4L590 976.7L539 1059L541 1061L623.3 1010L638.6 1160H641.4L656.7 1010L739 1061L741 1059L690 976.7L840 961.4V958.6L690 943.3L741 861L739 859L656.7 910L641.4 760H638.6L623.3 910L541 859L539 861L590 943.3L440 958.6V961.4Z"
        fill="currentColor"
      />
      <motion.path
        key="7"
        d="M1080 961.4L1230 976.7L1179 1059L1181 1061L1263.3 1010L1278.6 1160H1281.4L1296.7 1010L1379 1061L1381 1059L1330 976.7L1480 961.4V958.6L1330 943.3L1381 861L1379 859L1296.7 910L1281.4 760H1278.6L1263.3 910L1181 859L1179 861L1230 943.3L1080 958.6V961.4Z"
        fill="currentColor"
      />
      <motion.path
        key="8"
        initial={{ scale: letter === 'a' ? LETTER_SMALL : LETTER_FULL }}
        animate={{ scale: letter === 'a' ? LETTER_SMALL : LETTER_FULL }}
        exit={{ scale: 1 }}
        transition={TRANSITION}
        className="not-a"
        d="M120 321.4L270 336.7L219 419L221 421L303.3 370L318.6 520H321.4L336.7 370L419 421L421 419L370 336.7L520 321.4V318.6L370 303.3L421 221L419 219L336.7 270L321.4 120H318.6L303.3 270L221 219L219 221L270 303.3L120 318.6V321.4Z"
        fill="currentColor"
      />
    </motion.svg>
  )
}
