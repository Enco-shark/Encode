import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const PULSE_INTERVAL = 150
const PULSE_SPEED = 0.03
const DOT_SPACING_X = 4
const DOT_SPACING_Y = 2
const PULSE_RADIUS = 12

export function DotsBackground() {
  const { theme } = useTheme()
  const [phase, setPhase] = createSignal(0)
  const [size, setSize] = createSignal({ w: 80, h: 24 })
  const [pulseX, setPulseX] = createSignal(40)
  const [pulseY, setPulseY] = createSignal(12)
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

      if (Math.random() < 0.02) {
        const { w, h } = size()
        setPulseX(Math.floor(Math.random() * w))
        setPulseY(Math.floor(Math.random() * h))
      }
    }, PULSE_INTERVAL)
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
    const px = pulseX()
    const py = pulseY()
    const chunks: TextChunk[] = []

    const dotColor = dark ? RGBA.fromInts(60, 80, 100) : RGBA.fromInts(180, 190, 200)
    const pulseColor = dark ? RGBA.fromInts(0, 150, 220) : RGBA.fromInts(0, 100, 160)

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (x % DOT_SPACING_X === 0 && y % DOT_SPACING_Y === 0) {
          const dist = Math.hypot(x - px, y - py)
          const pulse = Math.sin(p - dist * 0.3) * 0.5 + 0.5
          const influence = Math.max(0, 1 - dist / PULSE_RADIUS)

          const brightness = dark
            ? 0.15 + influence * pulse * 0.5
            : 0.3 + influence * pulse * 0.4

          const color = influence > 0.1
            ? tint(dotColor, pulseColor, influence * pulse)
            : tint(theme.background, dotColor, brightness)

          chunks.push({ __isChunk: true, text: "•", fg: color, attributes: 0 })
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
