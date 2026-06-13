import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const MATRIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~`" +
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "eißðđŋħĸłøþæœµ∆∑∏π√∞≈≠≤≥±×÷"
const DROP_INTERVAL = 60
const DENSITY = 0.12
const TRAIL_MIN = 10
const TRAIL_MAX = 28
const SPAWN_RATE = 0.6

type Drop = {
  x: number
  y: number
  speed: number
  trail: number
  chars: string[]
  age: number
}

export function MatrixBackground() {
  const { theme } = useTheme()
  const [drops, setDrops] = createSignal<Drop[]>([])
  const [size, setSize] = createSignal({ w: 80, h: 24 })
  const [, setFrame] = createSignal(0)
  let timer: ReturnType<typeof setInterval> | undefined
  let box: BoxRenderable | undefined
  let text: TextRenderable | undefined
  let mounted = false

  const randomChar = () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]

  const sync = () => {
    if (!box) return
    const next = { w: box.width || 80, h: box.height || 24 }
    const cur = size()
    if (next.w === cur.w && next.h === cur.h) return
    setSize(next)
    setDrops([])
  }

  onMount(() => {
    mounted = true
    sync()
    box?.on("resize", sync)
    timer = setInterval(() => {
      if (!mounted) return
      const { w, h } = size()

      setDrops((prev) => {
        const next: Drop[] = []

        for (const d of prev) {
          const newY = d.y + d.speed
          if (newY - d.trail > h) continue
          const newChars = [...d.chars]
          if (Math.random() < 0.3) {
            newChars[0] = randomChar()
          }
          next.push({
            ...d,
            y: newY,
            chars: newChars,
            age: d.age + 1,
          })
        }

        if (Math.random() < SPAWN_RATE) {
          const trail = TRAIL_MIN + Math.floor(Math.random() * (TRAIL_MAX - TRAIL_MIN))
          const chars = Array.from({ length: trail }, () => randomChar())
          next.push({
            x: Math.floor(Math.random() * w),
            y: 0,
            speed: 0.5 + Math.random() * 1.5,
            trail,
            chars,
            age: 0,
          })
        }

        if (Math.random() < SPAWN_RATE * 0.5) {
          const trail = TRAIL_MIN + Math.floor(Math.random() * (TRAIL_MAX - TRAIL_MIN))
          const chars = Array.from({ length: trail }, () => randomChar())
          next.push({
            x: Math.floor(Math.random() * w),
            y: -Math.floor(Math.random() * 5),
            speed: 0.3 + Math.random() * 1.2,
            trail,
            chars,
            age: 0,
          })
        }

        return next
      })

      setFrame((n) => n + 1)
    }, DROP_INTERVAL)
  })

  onCleanup(() => {
    mounted = false
    box?.off("resize", sync)
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
  })

  const isDark = createMemo(() => {
    const bg = theme.background
    return (bg.r ?? 0) + (bg.g ?? 0) + (bg.b ?? 0) < 384
  })

  const content = createMemo(() => {
    const { w, h } = size()
    const dark = isDark()
    const grid: (string | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))
    const colors: (RGBA | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))

    for (const d of drops()) {
      const headY = Math.floor(d.y)
      for (let i = 0; i < d.trail; i++) {
        const y = headY - i
        if (y < 0 || y >= h) continue
        const x = d.x
        if (x < 0 || x >= w) continue

        const fade = i / d.trail
        const char = d.chars[i] ?? randomChar()
        grid[y][x] = char

        if (i === 0) {
          colors[y][x] = dark ? RGBA.fromInts(180, 220, 255) : RGBA.fromInts(0, 60, 120)
        } else {
          const brightness = dark ? 1 - fade * 0.85 : 0.6 - fade * 0.5
          colors[y][x] = dark
            ? tint(theme.background, RGBA.fromInts(0, 119, 182), Math.max(0.05, brightness))
            : tint(theme.background, RGBA.fromInts(0, 80, 140), Math.max(0.1, brightness))
        }
      }
    }

    const chunks: TextChunk[] = []
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const char = grid[y][x]
        const color = colors[y][x]
        if (char && color) {
          chunks.push({ __isChunk: true, text: char, fg: color, attributes: 0 })
        } else {
          chunks.push({ __isChunk: true, text: " ", attributes: 0 })
        }
      }
      if (y < h - 1) chunks.push({ __isChunk: true, text: "\n", attributes: 0 })
    }
    return new StyledText(chunks)
  })

  createEffect(() => {
    if (!text) return
    text.content = content()
  })

  return (
    <box
      ref={(item: BoxRenderable) => (box = item)}
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={0}
    >
      <text
        ref={(item: TextRenderable) => {
          text = item
          item.content = content()
        }}
        width="100%"
        height="100%"
        wrapMode="none"
        selectable={false}
      />
    </box>
  )
}
