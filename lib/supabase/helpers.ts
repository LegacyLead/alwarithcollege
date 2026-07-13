/**
 * Supabase Auth accounts always need an email address, but our students and
 * staff log in with a simple ID (e.g. "AWC-STU-0001"). Accounts are created
 * with an email built from that same ID, so login can convert the entered ID
 * to the matching email under the hood — nobody ever needs to remember an
 * actual email address.
 *
 * Convention: lowercase the ID, strip anything that isn't a letter/number,
 * and append @portal.alwarithcollege.local
 *
 * IMPORTANT: whoever creates accounts (in the Supabase dashboard, under
 * Authentication → Users) must use this exact same conversion when setting
 * the account's email, or logins won't match.
 */
export function idToPortalEmail(id: string): string {
  const cleaned = id.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleaned}@portal.alwarithcollege.local`;
}

export const roleLabels: Record<string, string> = {
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Admin',
  proprietress: 'Proprietress',
};
