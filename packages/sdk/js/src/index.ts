export * from "./client.js"
export * from "./server.js"

import { createEncodeClient } from "./client.js"
import { createEncodeServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export async function createOpencode(options?: ServerOptions) {
  const server = await createEncodeServer({
    ...options,
  })

  const client = createEncodeClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
