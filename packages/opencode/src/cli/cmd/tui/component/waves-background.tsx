import { createEffect, createSignal, onCleanup, onMount, createMemo } from "solid-js"
import { RGBA, StyledText, type BoxRenderable, type TextChunk, type TextRenderable } from "@opentui/core"
import { useTheme, tint } from "@tui/context/theme"

const WAVE_CHARS = ["░", "▒", "▓", "█", "▓", "▒"]
const FRAME_INTERVAL = 120
const WAVE_COUNT = 3
const AMPLITUDE = 0.15
const FREQUENCY = 0.08
const PHASE_SPEED = 0.04

export function WavesBackground() {
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
      setPhase((p) => p + PHASE_SPEED)
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
    const chunks: TextChunk[] = []

    const baseColor = dark ? RGBA.fromInts(0, 119, 182) : RGBA.fromInts(0, 80, 130)

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let value = 0
        for (let i = 0; i < WAVE_COUNT; i++) {
          const wavePhase = p + i * 1.2
          const waveY = Math.sin(x * FREQUENCY + wavePhase) * AMPLITUDE * h
          const dist = Math.abs(y - h / 2 - waveY)
          const waveValue = Math.max(0, 1 - dist / (h * 0.3))
          value += waveValue * (0.6 + i * 0.2)
        }
        value = Math.min(1, value)

        if (value < 0.05) {
          chunks.push({ __isChunk: true, text: " ", attributes: 0 })
        } else {
          const charIdx = Math.floor(value * (WAVE_CHARS.length - 1))
          const char = WAVE_CHARS[charIdx]
          const brightness = dark ? value * 0.6 : value * 0.5
          const color = tint(theme.background, baseColor, Math.max(0.05, brightness))
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
