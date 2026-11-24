'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/dataLayer'

const DEPTH_THRESHOLDS = [25, 50, 75, 90, 100]

export default function ScrollTracker() {
  const tracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

      DEPTH_THRESHOLDS.forEach((threshold) => {
        if (scrollPercent >= threshold && !tracked.current.has(threshold)) {
          tracked.current.add(threshold)
          trackScrollDepth(threshold)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
