declare global {
  const OPENCODE_VERSION: string
  const ENCODE_CHANNEL: string
}

export const InstallationVersion = typeof OPENCODE_VERSION === "string" ? OPENCODE_VERSION : "local"
export const InstallationChannel = typeof ENCODE_CHANNEL === "string" ? ENCODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
