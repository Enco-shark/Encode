import { describe, expect, test } from "bun:test"
import path from "path"
import { resolveENCODEHome } from "@encode-ai/shared/global"

describe("resolveENCODEHome", () => {
  test("with ENCODE_HOME set, resolves 4 subdirs under root", () => {
    const result = resolveENCODEHome({
      ENCODE_HOME: "/tmp/profile-a",
    })
    expect(result.mode).toBe("ENCODE_home")
    expect(result.root).toBe("/tmp/profile-a")
    expect(result.config).toBe(path.join("/tmp/profile-a", "config"))
    expect(result.data).toBe(path.join("/tmp/profile-a", "data"))
    expect(result.state).toBe(path.join("/tmp/profile-a", "state"))
    expect(result.cache).toBe(path.join("/tmp/profile-a", "cache"))
  })

  test("without ENCODE_HOME, falls through to xdg mode", () => {
    const result = resolveENCODEHome({})
    expect(result.mode).toBe("xdg")
    expect(result.root).toBeUndefined()
    // xdg paths end with "/ENCODE"
    expect(result.config.endsWith(path.join("", "ENCODE"))).toBe(true)
    expect(result.data.endsWith(path.join("", "ENCODE"))).toBe(true)
    expect(result.state.endsWith(path.join("", "ENCODE"))).toBe(true)
    expect(result.cache.endsWith(path.join("", "ENCODE"))).toBe(true)
  })

  test("empty ENCODE_HOME string is treated as unset (xdg mode)", () => {
    const result = resolveENCODEHome({ ENCODE_HOME: "" })
    expect(result.mode).toBe("xdg")
  })

  test("relative ENCODE_HOME path throws with clear error", () => {
    expect(() => resolveENCODEHome({ ENCODE_HOME: "./foo" })).toThrow(
      /ENCODE_HOME must be an absolute path/,
    )
    expect(() => resolveENCODEHome({ ENCODE_HOME: "foo/bar" })).toThrow(
      /ENCODE_HOME must be an absolute path/,
    )
  })

  test("tilde-prefixed ENCODE_HOME throws (not treated as absolute)", () => {
    expect(() => resolveENCODEHome({ ENCODE_HOME: "~/profiles/a" })).toThrow(
      /ENCODE_HOME must be an absolute path/,
    )
  })

  test("error message includes the offending value", () => {
    expect(() => resolveENCODEHome({ ENCODE_HOME: "./relative" })).toThrow(
      /\.\/relative/,
    )
  })
})
