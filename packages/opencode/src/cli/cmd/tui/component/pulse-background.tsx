import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const FRAME_INTERVAL = 100
const PULSE_SPEED = 0.08
const RING_COUNT = 4
const RING_SPACING = 8

const RING_CHARS = ["·", "•", "●", "◉", "○", "◌", "◦"]

export function PulseBackground() {
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
      setPhase((p) => p + PULSE_SPEED)
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
    const cx = w / 2
    const cy = h / 2
    const maxDist = Math.sqrt(cx * cx + cy * cy)
    const baseColor = dark ? RGBA.fromInts(0, 119, 182) : RGBA.fromInts(0, 80, 140)

    const chunks: TextChunk[] = []
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = x - cx
        const dy = (y - cy) * 2
        const dist = Math.sqrt(dx * dx + dy * dy)

        let value = 0
        for (let r = 0; r < RING_COUNT; r++) {
          const ringDist = ((p * RING_SPACING + r * (maxDist / RING_COUNT)) % maxDist)
          const diff = Math.abs(dist - ringDist)
          if (diff < 3) {
            value = Math.max(value, 1 - diff / 3)
          }
        }

        if (value < 0.05) {
          chunks.push({ __isChunk: true, text: " ", attributes: 0 })
        } else {
          const charIdx = Math.floor(value * (RING_CHARS.length - 1))
          const char = RING_CHARS[charIdx]
          const brightness = dark ? value * 0.6 : value * 0.45
          const color = tint(theme.background, baseColor, Math.max(0.08, brightness))
          chunks.push({ __isChunk: true, text: char, fg: color, attributes: 0 })
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
