import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const FRAME_INTERVAL = 100
const PARTICLE_COUNT = 30
const CONNECTION_DIST = 15
const MAX_SPEED = 0.4

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
}

export function ParticlesBackground() {
  const { theme } = useTheme()
  const [particles, setParticles] = createSignal<Particle[]>([])
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
    initParticles(next.w, next.h)
  }

  const initParticles = (w: number, h: number) => {
    const list: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      list.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      })
    }
    setParticles(list)
  }

  onMount(() => {
    mounted = true
    sync()
    box?.on("resize", sync)
    timer = setInterval(() => {
      if (!mounted) return
      const { w, h } = size()

      setParticles((prev) =>
        prev.map((p) => {
          let { x, y, vx, vy } = p
          x += vx
          y += vy
          if (x < 0 || x >= w) vx = -vx
          if (y < 0 || y >= h) vy = -vy
          x = Math.max(0, Math.min(w - 1, x))
          y = Math.max(0, Math.min(h - 1, y))
          if (Math.random() < 0.03) {
            vx += (Math.random() - 0.5) * 0.1
            vy += (Math.random() - 0.5) * 0.1
            vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vx))
            vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vy))
          }
          return { x, y, vx, vy }
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
    const pts = particles()
    const grid: (string | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))
    const colors: (RGBA | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))
    const dotColor = dark ? RGBA.fromInts(100, 180, 255) : RGBA.fromInts(40, 100, 180)
    const lineColor = dark ? RGBA.fromInts(40, 80, 130) : RGBA.fromInts(150, 170, 200)

    for (const p of pts) {
      const x = Math.round(p.x)
      const y = Math.round(p.y)
      if (x >= 0 && x < w && y >= 0 && y < h) {
        grid[y][x] = "●"
        colors[y][x] = tint(theme.background, dotColor, dark ? 0.7 : 0.5)
      }
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x
        const dy = pts[i].y - pts[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > CONNECTION_DIST) continue
        const steps = Math.floor(dist)
        for (let s = 0; s <= steps; s++) {
          const t = s / steps
          const x = Math.round(pts[i].x + dx * t)
          const y = Math.round(pts[i].y + dy * t)
          if (x >= 0 && x < w && y >= 0 && y < h && !grid[y][x]) {
            grid[y][x] = "·"
            const fade = 1 - dist / CONNECTION_DIST
            colors[y][x] = tint(theme.background, lineColor, Math.max(0.05, fade * 0.3))
          }
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
