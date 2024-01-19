import { Environment } from 'vitest'
// run folder: prisma npm link
// run folder: ./ npm link vitest-environment-prisma
export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Inicou')

    return {
      teardown() {
        console.log('Terminou')
      },
    }
  },
}
