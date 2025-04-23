// useLenis.js
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;  // Кастомная функция easing
  smooth?: boolean;
}

const useLenis = () => {
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // необязательно, можешь свою функцию
      smooth: true,
    } as LenisOptions)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}

export default useLenis
