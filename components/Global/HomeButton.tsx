import { useRouter } from 'next/router'
import { Logo } from 'components/Global/Logo'

export const HomeButton = () => {
  const router = useRouter()

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault() // Prevent the default link behavior

    try {
      const response = await fetch('/api/logout', { method: 'POST' })

      if (response.ok) {
        router.push('/')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <a
      href="/"
      className="fixed left-20 top-21 z-[20] md:left-32 md:top-32"
      onClick={handleClick}
    >
      <Logo className="h-auto w-36 md:w-52" />
    </a>
  )
}
