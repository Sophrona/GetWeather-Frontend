const getCountryName = (id) => {
  const displayName = new Intl.DisplayNames(["en"], { type: "region" });
  return displayName.of(id);
};

export default getCountryName;
