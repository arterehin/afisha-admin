export const getURLLanguage = () => {
  const { pathname } = window.location;
  const parts = pathname.replace("/adm", "").split("/");

  return parts[1] ?? "ru";
}