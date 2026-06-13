import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const FIREFLY_COUNT = 20
const FRAME_INTERVAL = 100
const GLOW_CHARS = ["·", "•", "●", "◉"]
const MAX_SPEED = 0.3
const GLOW_SPEED = 0.05

type Firefly = {
  x: number
  y: number
  vx: number
  vy: number
  glow: number
  glowDir: number
}

export function FirefliesBackground() {
  const { theme } = useTheme()
  const [fireflies, setFireflies] = createSignal<Firefly[]>([])
  const [size, setSize] = createSignal({ w: 80, h: 24 })
  const [, setFrame] = createSignal(0)
  let timer: ReturnType<typeof setInterval> | undefined
  let box: BoxRenderable | undefined
  let text: TextRenderable | undefined
  let mounted = false

  const sync = () => {
    if (!box) return
    const next = { w: box.width || 80, h: box.height || 24 }
    const cur = size()
    if (next.w === cur.w && next.h === cur.h) return
    setSize(next)
    initFireflies(next.w, next.h)
  }

  const initFireflies = (w: number, h: number) => {
    const flies: Firefly[] = []
    for (let i = 0; i < FIREFLY_COUNT; i++) {
      flies.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
        glow: Math.random(),
        glowDir: Math.random() > 0.5 ? 1 : -1,
      })
    }
    setFireflies(flies)
  }

  onMount(() => {
    mounted = true
    sync()
    box?.on("resize", sync)
    timer = setInterval(() => {
      if (!mounted) return
      const { w, h } = size()

      setFireflies((prev) =>
        prev.map((f) => {
          let { x, y, vx, vy, glow, glowDir } = f

          x += vx
          y += vy

          if (x < 0 || x >= w) vx = -vx
          if (y < 0 || y >= h) vy = -vy
          x = Math.max(0, Math.min(w - 1, x))
          y = Math.max(0, Math.min(h - 1, y))

          glow += glowDir * GLOW_SPEED
          if (glow >= 1) {
            glow = 1
            glowDir = -1
          }
          if (glow <= 0) {
            glow = 0
            glowDir = 1
          }

          if (Math.random() < 0.05) {
            vx += (Math.random() - 0.5) * 0.1
            vy += (Math.random() - 0.5) * 0.1
            vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vx))
            vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vy))
          }

          return { x, y, vx, vy, glow, glowDir }
        }),
      )

      setFrame((n) => n + 1)
    }, FRAME_INTERVAL)
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
    const flies = fireflies()
    const grid: (string | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))
    const colors: (RGBA | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))

    const flyColor = dark ? RGBA.fromInts(255, 220, 100) : RGBA.fromInts(200, 160, 40)

    for (const f of flies) {
      const x = Math.round(f.x)
      const y = Math.round(f.y)
      if (x < 0 || x >= w || y < 0 || y >= h) continue

      const charIdx = Math.floor(f.glow * (GLOW_CHARS.length - 1))
      grid[y][x] = GLOW_CHARS[charIdx]

      const brightness = dark ? f.glow * 0.7 : f.glow * 0.5
      colors[y][x] = tint(theme.background, flyColor, Math.max(0.1, brightness))
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
