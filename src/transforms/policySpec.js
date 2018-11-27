import { DENY_ALL_INGRESS, DENY_ALL_EGRESS, ALLOW_ALL_INGRESS, ALLOW_ALL_EGRESS } from './constants'
import { parsePorts, parseSource, combinePortsAndSources } from './common'

const parseIngressEntry = ({ from = [], ports = [] }) => {
  // TODO: Remove this special type from an <any>:<any> rule
  if (from.length === 0 && ports.length === 0) {
    return [{ type: ALLOW_ALL_INGRESS }]
  }

  const parsedPorts = parsePorts(ports)
  const parsedFrom = parseSource(from)

  return combinePortsAndSources(parsedPorts, parsedFrom)
}

const parseEgressEntry = ({ to = [], ports = [] }) => {
  if (to.length === 0 && ports.length === 0) {
    return [{ type: ALLOW_ALL_EGRESS }]
  }

  const parsedPorts = parsePorts(ports)
  const parsedFrom = parseSource(to)

  return combinePortsAndSources(parsedPorts, parsedFrom)
}

const parseIngressRules = ({ ingress = [] }) => {
  if (ingress.length === 0) {
    return [{ type: DENY_ALL_INGRESS }]
  }

  return ingress.reduce((out, entry) => out.concat(parseIngressEntry(entry)), [])
}

const parseEgressRules = ({ egress = [] }) => {
  if (egress.length === 0) {
    return [{ type: DENY_ALL_EGRESS }]
  }

  return egress.reduce((out, entry) => out.concat(parseEgressEntry(entry)), [])
}

const parsePolicySpec = policySpec => [...parseIngressRules(policySpec), ...parseEgressRules(policySpec)]

export default parsePolicySpec
export { parseIngressEntry, parseEgressEntry }
