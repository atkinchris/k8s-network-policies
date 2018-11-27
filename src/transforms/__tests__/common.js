import { parsePorts } from '../common'

describe('Common Parsers', () => {
  describe('ports', () => {
    it('returns an allow all if no ports are set', () => {
      const ports = parsePorts([])
      expect(ports).toEqual([{ port: '<any>', protocol: '<any>' }])
    })

    it('preserves the protocol if set', () => {
      const ports = parsePorts([{ port: 8080, protocol: 'UDP' }])
      expect(ports).toEqual([{ port: 8080, protocol: 'UDP' }])
    })

    it('defaults the protocol to "TCP" if not set', () => {
      const ports = parsePorts([{ port: 8080 }])
      expect(ports).toEqual([{ port: 8080, protocol: 'TCP' }])
    })

    it('handles multiple ports', () => {
      const ports = parsePorts([{ port: 8080 }, { port: 8081, protocol: 'UDP' }, { port: 3000, protocol: 'TCP' }])
      expect(ports).toEqual([
        { port: 8080, protocol: 'TCP' },
        { port: 8081, protocol: 'UDP' },
        { port: 3000, protocol: 'TCP' },
      ])
    })
  })

  describe('sources', () => {})
})
