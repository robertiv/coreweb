"use client"

import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

type CursorTooltipProps = {
  content: React.ReactNode
  children: React.ReactElement
  offset?: [number, number]
  className?: string
  delay?: number
}

export default function CursorTooltip({
  content,
  children,
  offset = [12, 12],
  className,
  delay = 0,
}: CursorTooltipProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const timeoutRef = useRef<number | null>(null)

  function handleEnter(e: React.MouseEvent) {
    if (delay > 0) {
      timeoutRef.current = window.setTimeout(() => setOpen(true), delay)
    } else {
      setOpen(true)
    }
  }

  function handleLeave(e: React.MouseEvent) {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    setOpen(false)
  }

  function handleMove(e: React.MouseEvent) {
    setPos({ x: e.clientX, y: e.clientY })
  }

  const wrapped = React.cloneElement(children, {
    onMouseEnter(event: React.MouseEvent) {
      // call original if present
      // @ts-ignore
      children.props.onMouseEnter?.(event)
      handleEnter(event)
    },
    onMouseLeave(event: React.MouseEvent) {
      // @ts-ignore
      children.props.onMouseLeave?.(event)
      handleLeave(event)
    },
    onMouseMove(event: React.MouseEvent) {
      // @ts-ignore
      children.props.onMouseMove?.(event)
      handleMove(event)
    },
  })

  return (
    <>
      {wrapped}
      {open &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              left: pos.x + offset[0],
              top: pos.y + offset[1],
              pointerEvents: 'none',
            }}
            className={cn(
              'bg-foreground text-background rounded-md px-3 py-1.5 text-xs z-50 w-fit',
              className,
            )}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  )
}
