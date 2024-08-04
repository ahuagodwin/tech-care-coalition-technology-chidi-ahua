

export const getInitials = (fullName: string) => {
    const nameParts = fullName?.split(' ');
    if (nameParts.length === 1) {
      // If there's only one part, use the first letter of that part
      return nameParts[0]?.charAt(0)?.toUpperCase();
    }
    // Otherwise, use the first letter of the first and last names
    const initials = nameParts?.map(part => part.charAt(0)).join('.');
    return initials.toUpperCase();
  };