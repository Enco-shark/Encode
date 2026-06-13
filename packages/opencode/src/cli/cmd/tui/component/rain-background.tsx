import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const FRAME_INTERVAL = 80
const DROPS_PER_FRAME = 3
const MAX_DROPS = 120

type RainDrop = {
  x: number
  y: number
  speed: number
  length: number
  char: string
}

const RAIN_CHARS = ["|", "│", "┃", "┆", "┇", "┊", "┋"]

export function RainBackground() {
  const { theme } = useTheme()
  const [drops, setDrops] = createSignal<RainDrop[]>([])
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
        const next: RainDrop[] = []
        for (const d of prev) {
          if (d.y - d.length < h + 5) {
            next.push({ ...d, y: d.y + d.speed })
          }
        }
        for (let i = 0; i < DROPS_PER_FRAME; i++) {
          if (next.length < MAX_DROPS) {
            next.push({
              x: Math.floor(Math.random() * w),
              y: 0,
              speed: 1.5 + Math.random() * 2.5,
              length: 2 + Math.floor(Math.random() * 4),
              char: RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)],
            })
          }
        }
        return next
      })
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
    const grid: (string | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))
    const colors: (RGBA | null)[][] = Array.from({ length: h }, () => Array(w).fill(null))
    const baseColor = dark ? RGBA.fromInts(100, 160, 220) : RGBA.fromInts(40, 80, 140)

    for (const d of drops()) {
      const headY = Math.floor(d.y)
      for (let i = 0; i < d.length; i++) {
        const y = headY - i
        if (y < 0 || y >= h) continue
        if (d.x < 0 || d.x >= w) continue
        grid[y][d.x] = d.char
        const fade = i / d.length
        const brightness = dark ? 0.9 - fade * 0.7 : 0.6 - fade * 0.4
        colors[y][d.x] = tint(theme.background, baseColor, Math.max(0.1, brightness))
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
