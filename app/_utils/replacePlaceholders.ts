export const replacePlaceholders = (text: string): string => {
  return text
    .replace(/<COMPANY>/g, process.env.NEXT_PUBLIC_COMPANY_NAME || "")
    .replace(/<COMPANY contact email>/g, process.env.NEXT_PUBLIC_COMPANY_EMAIL || "")
    .replace(/<COMPANY registered address>/g, process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "")
    .replace(/<COMPANY website URL>/g, process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "")
    .replace(
      /<COMPANY registration number>/g,
      process.env.NEXT_PUBLIC_COMPANY_REGISTRATION_NUMBER || ""
    )
    .replace(/<COMPANY country of registration>/g, process.env.NEXT_PUBLIC_COMPANY_COUNTRY || "")
    .replace(/<COMPANY legal entity>/g, process.env.NEXT_PUBLIC_COMPANY_LEGAL_ENTITY || "");
};
