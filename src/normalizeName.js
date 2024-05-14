function normalizeName(name) {
  if (typeof name !== 'string' || name.trim() === '') return "";  // Handle undefined, null or empty string

  const suffixes = ["Jr.", "Sr.", "II", "III", "IV"];
  const salutations = new Map([
    ["honorable", "Hon."], ["hon.", "Hon."],
    ["sir", "Sir"], ["madam", "Madam"],
    ["mrs.", "Mrs."], ["mr.", "Mr."],
    ["ms.", "Ms."], ["miss", "Miss"],
    ["mx.", "Mx."], ["doctor", "Dr."], ["dr.", "Dr."]
  ]);

  // Check for multiple commas
  if ((name.match(/,/g) || []).length > 1) throw new Error("Invalid name format with multiple commas.");

  name = name.replace(/\s+/g, ' ').trim(); // Normalize spaces
  let parts = name.split(',');
  let mainPart = parts[0].trim();
  let suffix = parts[1] ? parts[1].trim() : "";

  let names = mainPart.split(' ');
  let salutationIndex = salutations.has(names[0].toLowerCase()) ? 0 : -1;
  let salutation = salutationIndex === -1 ? "" : names.shift();
  if (salutation && salutation.toLowerCase() !== salutation && salutations.get(salutation.toLowerCase())) {
    salutation = salutations.get(salutation.toLowerCase());
  }

  let lastName = names.pop();
  let firstName = names.shift();
  let middleInitials = names.map(middleName => {
    if (middleName.length === 1) return middleName;  // Single-letter middle name, no period
    return middleName[0] + ".";
  }).join(" ");

  let normalized = [lastName, [salutation, firstName, middleInitials].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  if (suffix) normalized += `, ${suffix}`;

  return normalized;
}

export { normalizeName }