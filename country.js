const countryName = new URLSearchParams(window.location.search).get('name')

const flagImage = document.querySelector('.country-details img')
const countryH1 = document.querySelector('.details-text-container h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then(res => res.json())
.then(([country])=>{
    // console.log({country})
    flagImage.src = country.flags.svg
    countryH1.innerHTML = country.name.common
    if(country.name.nativeName){
       nativeName.innerHTML = Object.values(country.name.nativeName)[0].common
    } else{
       nativeName.innerHTML = country.name.common
    }
    population.innerHTML = country.population.toLocaleString('en-IN')
    region.innerHTML = country.region
    if(country.subregion){
      subRegion.innerHTML = country.subregion
   }
   if(country.capital){
      capital.innerHTML = country.capital.join(', ')
   }
    domain.innerHTML = country.tld.join(', ')
    if(country.currencies){
      currencies.innerHTML = Object.values(country.currencies).map((currencies)=> currencies.name).join(', ')
    } 
    
    if(country.languages){
      languages.innerHTML = Object.values(country.languages).join(', ')
    }

    if (country.borders) {
      country.borders.forEach(border => {
         fetch(`https://restcountries.com/v3.1/alpha/${border}`)
         .then(res => res.json())
         .then(([borderCountry])=>{
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
            borderCountries.append(borderCountryTag)
         })
      });
    }

})


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
 