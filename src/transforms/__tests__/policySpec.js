import { ALLOW_ALL_INGRESS, ALLOW_ALL_EGRESS, DENY_ALL_INGRESS, DENY_ALL_EGRESS } from '../constants'

import policySpec, { parseIngressEntry, parseEgressEntry } from '../policySpec'

describe('Parse Policy Spec', () => {
  describe('ingress', () => {
    it('parses an policy with no ingress entries as "Deny All Ingress"', () => {
      const policy = {
        ingress: [],
      }
      const rules = policySpec(policy)

      expect(rules).toContainEqual({ type: DENY_ALL_INGRESS })
    })

    it('parses an policy with no ingress key as "Deny All Ingress"', () => {
      const policy = {}
      const rules = policySpec(policy)

      expect(rules).toContainEqual({ type: DENY_ALL_INGRESS })
    })

    it('parses each spec ingress entry into a rule', () => {
      const policy = {
        ingress: [{}, {}, {}],
      }
      const rules = policySpec(policy)

      expect(rules.length).toBe(3 + 1)
    })
  })

  describe('ingress entry', () => {
    it('identifies an entry that allows all traffic (empty arrays)', () => {
      const entry = {
        ports: [],
        from: [],
      }
      const rules = parseIngressEntry(entry)

      expect(rules).toEqual([{ type: ALLOW_ALL_INGRESS }])
    })

    it('identifies an entry that allows all traffic (empty object)', () => {
      const entry = {}
      const rules = parseIngressEntry(entry)

      expect(rules).toEqual([{ type: ALLOW_ALL_INGRESS }])
    })

    it('produces a rule for each port and source defined', () => {
      const entry = {
        ports: [{}, {}],
        from: [{}, {}, {}],
      }
      const rules = parseIngressEntry(entry)

      expect(rules.length).toBe(6)
    })
  })

  describe('egress', () => {
    it('parses an policy with no egress entries as "Deny All Egress"', () => {
      const policy = {
        egress: [],
      }
      const rules = policySpec(policy)

      expect(rules).toContainEqual({ type: DENY_ALL_EGRESS })
    })

    it('parses an policy with no egress key as "Deny All Egress"', () => {
      const policy = {}
      const rules = policySpec(policy)

      expect(rules).toContainEqual({ type: DENY_ALL_EGRESS })
    })

    it('parses each spec egress entry into a rule', () => {
      const policy = {
        egress: [{}, {}, {}],
      }
      const rules = policySpec(policy)

      expect(rules.length).toBe(3 + 1)
    })
  })

  describe('egress entry', () => {
    it('identifies an entry that allows all traffic (empty arrays)', () => {
      const entry = {
        ports: [],
        from: [],
      }
      const rules = parseEgressEntry(entry)

      expect(rules).toEqual([{ type: ALLOW_ALL_EGRESS }])
    })

    it('identifies an entry that allows all traffic (empty object)', () => {
      const entry = {}
      const rules = parseEgressEntry(entry)

      expect(rules).toEqual([{ type: ALLOW_ALL_EGRESS }])
    })

    it('produces a rule for each port and source defined', () => {
      const entry = {
        ports: [{}, {}],
        to: [{}, {}, {}],
      }
      const rules = parseEgressEntry(entry)

      expect(rules.length).toBe(6)
    })
  })
})
