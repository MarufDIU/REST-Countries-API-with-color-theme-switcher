const flagCard = document.querySelector(".flag-card");
const filterRegion = document.querySelector(".filter-region");
const searchInput = document.querySelector(".search-bar input");
const themeChanger = document.querySelector(".theme-changer");

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  flagCard.innerHTML = "";
  data.forEach((country) => {
    // console.log(country)
    const countryCard = document.createElement("a");
    countryCard.classList.add("card");

    countryCard.href = `country.html?name=${country.name.common}`;

    countryCard.innerHTML = `<div class="card-header"><img class="country-img" src="${
      country.flags.svg
    }" alt="${country.name.common}"></div>
                <div class="card-content flex">
                    <h3 class="country-name">${country.name.common}</h3>
                    <p class="country-population"><b>Population:</b> ${country.population.toLocaleString(
                      "en-IN"
                    )}</p>
                    <p class="country-region"><b>Region:</b> ${
                      country.region
                    }</p>
                    <p class="country-capital"><b>Capital:</b> ${
                      country.capital
                    }</p>
                </div>`;

    flagCard.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value)
  const searchCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  // console.log(searchCountries)
  renderCountries(searchCountries);
});

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i> Light Mode`;
}

themeChanger.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');

  // Save the theme to localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Update the text and icon accordingly
  themeChanger.innerHTML = isDark ? `<i class="fa-regular fa-sun"></i> Light Mode`
    : `<i class="fa-regular fa-moon"></i> Dark Mode`;
});
