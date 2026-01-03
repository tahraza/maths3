'use client'

import katex from 'katex'
import { useMemo } from 'react'

interface KaTeXProps {
  math: string
  display?: boolean
  className?: string
}

export function KaTeX({ math, display = false, className = '' }: KaTeXProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      })
    } catch {
      return math
    }
  }, [math, display])

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function BlockMath({ math, className = '' }: { math: string; className?: string }) {
  return <KaTeX math={math} display={true} className={className} />
}

export function InlineMath({ math, className = '' }: { math: string; className?: string }) {
  return <KaTeX math={math} display={false} className={className} />
}
