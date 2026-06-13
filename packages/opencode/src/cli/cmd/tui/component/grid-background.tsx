import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const FRAME_INTERVAL = 200
const DENSITY = 0.02
const SHIMMER_SPEED = 0.03

export function GridBackground() {
  const { theme } = useTheme()
  const [phase, setPhase] = createSignal(0)
  const [size, setSize] = createSignal({ w: 80, h: 24 })
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
  }

  onMount(() => {
    mounted = true
    sync()
    box?.on("resize", sync)
    timer = setInterval(() => {
      if (!mounted) return
      setPhase((p) => p + SHIMMER_SPEED)
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
    const p = phase()
    const gridColor = dark ? RGBA.fromInts(30, 50, 70) : RGBA.fromInts(200, 210, 220)
    const highlightColor = dark ? RGBA.fromInts(0, 119, 182) : RGBA.fromInts(0, 80, 140)

    const chunks: TextChunk[] = []
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const isGrid = x % 6 === 0 || y % 3 === 0
        const isCross = x % 6 === 0 && y % 3 === 0

        if (!isGrid) {
          chunks.push({ __isChunk: true, text: " ", attributes: 0 })
          continue
        }

        const shimmer = Math.sin(x * 0.2 + y * 0.3 + p) * 0.5 + 0.5
        const wave = Math.sin(x * 0.1 - p * 0.5) * 0.5 + 0.5
        const brightness = dark
          ? 0.08 + shimmer * 0.15 + wave * 0.1
          : 0.2 + shimmer * 0.15 + wave * 0.1

        let color: RGBA
        if (isCross && shimmer > 0.7) {
          color = tint(theme.background, highlightColor, Math.min(0.5, brightness * 1.5))
        } else {
          color = tint(theme.background, gridColor, Math.max(0.05, brightness))
        }

        chunks.push({
          __isChunk: true,
          text: isCross ? "┼" : x % 6 === 0 ? "│" : "─",
          fg: color,
          attributes: 0,
        })
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
