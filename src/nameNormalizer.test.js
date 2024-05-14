import { normalizeName } from './normalizeName'

describe('normalizeName', () => {
  it('returns an empty string for undefined inputs', () => {
    expect(normalizeName(undefined)).toBe("")
  })

  it('returns the same name if only one word is provided', () => {
    expect(normalizeName("Plato")).toBe("Plato")
  })

  it('returns last name first for two names', () => {
    expect(normalizeName("Leonard Cohen")).toBe("Cohen, Leonard")
  })

  it('removes additional space characters', () => {
    expect(normalizeName("  Martha    Helen\t\r\n   Stewart")).toBe("Stewart, Martha H.")
  })

  it('returns an empty string for inputs that are only spaces', () => {
    expect(normalizeName("   ")).toBe("")
  })

  it('handles names with multiple middle names and initializes them', () => {
    expect(normalizeName("Samuel Leroy Jackson")).toBe("Jackson, Samuel L.")
    expect(normalizeName("Emma Azalia Smith Hackley")).toBe("Hackley, Emma A. S.")
  })

  it('does not initialize single-letter middle names', () => {
    expect(normalizeName("Harry S Truman")).toBe("Truman, Harry S")
  })

  it('appends suffixes correctly', () => {
    expect(normalizeName("Martin Luther King, Jr.")).toBe("King, Martin L., Jr.")
  })

  it('prepends valid salutations and handles suffixes', () => {
    expect(normalizeName("Sir Mackenzie Bowell, Jr.")).toBe("Bowell, Sir Mackenzie, Jr.")
  })

  it('throws an error when more than one comma is present', () => {
    expect(() => normalizeName("Thurston, Howell, III")).toThrow("Invalid name format with multiple commas.")
  })
})
