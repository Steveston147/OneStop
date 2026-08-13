import { describe, expect, it } from 'vitest';
import { createRequestId, isValidDate, validateEnquiry } from './enquiry';

function validForm(overrides: Record<string, string | string[]> = {}) {
  const values: Record<string, string | string[]> = {
    preferred_language: 'English',
    applicant_category: 'Faculty / Researcher / Guest',
    host_institution: 'Ritsumeikan University',
    full_name: 'Alex Example',
    email: 'alex@example.com',
    host_department: 'International Center',
    host_contact: 'Host Person',
    current_country: 'Canada',
    nationality: 'Canadian',
    planned_arrival_date: '2027-04-01',
    planned_departure_date: '2027-04-15',
    family_members: '1',
    requested_services: ['Accommodation support'],
    message: 'Initial enquiry',
    consent: 'on',
    company_website: '',
    ...overrides,
  };

  const form = new FormData();
  for (const [key, raw] of Object.entries(values)) {
    const entries = Array.isArray(raw) ? raw : [raw];
    for (const value of entries) form.append(key, value);
  }
  return form;
}

describe('validateEnquiry', () => {
  it('accepts a valid English enquiry', () => {
    const result = validateEnquiry(validForm());
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.lang).toBe('en');
      expect(result.data.email).toBe('alex@example.com');
    }
  });

  it('accepts a valid Japanese enquiry', () => {
    const result = validateEnquiry(validForm({ preferred_language: 'Japanese' }));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.lang).toBe('ja');
  });

  it.each([
    ['invalid role', { applicant_category: 'Administrator' }],
    ['invalid institution', { host_institution: 'Unknown University' }],
    ['invalid service', { requested_services: ['Delete all data'] }],
    ['malformed email', { email: 'not-an-email' }],
    ['reversed dates', { planned_arrival_date: '2027-04-15', planned_departure_date: '2027-04-01' }],
    ['too many family members', { family_members: '21' }],
    ['negative family members', { family_members: '-1' }],
    ['decimal family members', { family_members: '1.5' }],
    ['missing consent', { consent: '' }],
    ['honeypot filled', { company_website: 'https://spam.example' }],
    ['oversized message', { message: 'x'.repeat(4001) }],
  ])('rejects %s', (_label, overrides) => {
    expect(validateEnquiry(validForm(overrides)).ok).toBe(false);
  });

  it('requires an institution name when Other is selected', () => {
    const result = validateEnquiry(validForm({ host_institution: 'Other', host_department: '' }));
    expect(result.ok).toBe(false);
  });

  it('rejects duplicate services', () => {
    const result = validateEnquiry(validForm({ requested_services: ['Accommodation support', 'Accommodation support'] }));
    expect(result.ok).toBe(false);
  });
});

describe('date and request ID helpers', () => {
  it('validates real calendar dates', () => {
    expect(isValidDate('2028-02-29')).toBe(true);
    expect(isValidDate('2027-02-29')).toBe(false);
    expect(isValidDate('2027-13-01')).toBe(false);
  });

  it('creates request IDs in the documented format', () => {
    expect(createRequestId()).toMatch(/^CGW-\d{8}-[A-HJ-NP-Z2-9]{5}$/);
  });
});
