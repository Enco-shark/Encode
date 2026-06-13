declare global {
  const ENCODE_VERSION: string
  const ENCODE_CHANNEL: string
}

export const InstallationVersion = typeof ENCODE_VERSION === "string" ? ENCODE_VERSION : "local"
export const InstallationChannel = typeof ENCODE_CHANNEL === "string" ? ENCODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
