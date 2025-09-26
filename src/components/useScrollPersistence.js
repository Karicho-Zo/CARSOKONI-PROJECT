import { useEffect, useCallback } from 'react'

/**
 * Custom hook for scroll position persistence using sessionStorage
 * @param {string} pageKey - Unique key for the page/component
 * @returns {Object} - Object containing saveScrollPosition and restoreScrollPosition functions
 */
const useScrollPersistence = (pageKey) => {
  const saveScrollPosition = useCallback(() => {
    const scrollPosition = window.scrollY
    sessionStorage.setItem(`scrollPosition_${pageKey}`, scrollPosition.toString())
  }, [pageKey])

  const restoreScrollPosition = useCallback(() => {
    const savedPosition = sessionStorage.getItem(`scrollPosition_${pageKey}`)
    if (savedPosition) {
      const position = parseInt(savedPosition, 10)
      // Use requestAnimationFrame for smooth restoration
      requestAnimationFrame(() => {
        window.scrollTo({
          top: position,
          behavior: 'instant' // Use instant to avoid conflicts with loading states
        })
      })
      // Clear the saved position after restoration
      sessionStorage.removeItem(`scrollPosition_${pageKey}`)
    }
  }, [pageKey])

  useEffect(() => {
    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      saveScrollPosition()
    }

    // Save scroll position on navigation changes (debounced)
    const handleScroll = () => {
      // Debounce scroll saving to avoid excessive storage writes
      clearTimeout(window.scrollSaveTimeout)
      window.scrollSaveTimeout = setTimeout(saveScrollPosition, 100)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Restore scroll position on mount
    restoreScrollPosition()

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('scroll', handleScroll)
      if (window.scrollSaveTimeout) {
        clearTimeout(window.scrollSaveTimeout)
      }
    }
  }, [saveScrollPosition, restoreScrollPosition])

  return { saveScrollPosition, restoreScrollPosition }
}

export default useScrollPersistence