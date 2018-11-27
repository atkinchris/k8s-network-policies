const parsePorts = (ports = []) =>
  ports.length === 0
    ? [{ protocol: '<any>', port: '<any>' }]
    : ports.map(({ protocol = 'TCP', port }) => ({ protocol, port }))

const parseSource = source => (source.length === 0 ? [{ source: '<any>' }] : source)

const combinePortsAndSources = (ports, sources) => {
  const out = []

  ports.forEach(port => {
    sources.forEach(source => {
      out.push({ port, source })
    })
  })

  return out
}

export { parsePorts, parseSource, combinePortsAndSources }
