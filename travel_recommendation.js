function searchTemplesAndBeaches(data, term) {
    const termLower = term.toLowerCase();
    const results = [];
  
    // Универсальная проверка: если term содержит название раздела
    const matchTemplesSection = "temples".includes(termLower);
    const matchBeachesSection = "beaches".includes(termLower);
  
    const checkMatch = (item) =>
      item.name.toLowerCase().includes(termLower) ||
      item.description.toLowerCase().includes(termLower);
  
    // 🔍 Temples
    data.temples?.forEach(item => {
      if (matchTemplesSection || checkMatch(item)) {
        results.push({
          name: item.name,
          imageUrl: item.imageUrl,
          description: item.description
        });
      }
    });
  
    // 🔍 Beaches
    data.beaches?.forEach(item => {
      if (matchBeachesSection || checkMatch(item)) {
        results.push({
          name: item.name,
          imageUrl: item.imageUrl,
          description: item.description
        });
      }
    });
  
    return results;
  }
  
  function searchCountriesAndCities(data, term) {
    const termLower = term.toLowerCase();
    const results = [];
  
    // Универсальная проверка по названию раздела
    const matchCountriesSection = "countries".includes(termLower);
    const matchCitiesSection = "cities".includes(termLower);
  
    data.countries?.forEach(country => {
      const countryMatch = country.name.toLowerCase().includes(termLower);
  
      country.cities?.forEach(city => {
        const cityMatch =
          city.name.toLowerCase().includes(termLower) ||
          city.description.toLowerCase().includes(termLower);
  
        if (countryMatch || cityMatch || matchCountriesSection || matchCitiesSection) {
          results.push({
            name: city.name,
            imageUrl: city.imageUrl,
            description: city.description
          });
        }
      });
    });
  
    return results;
  }
  
  function fullSearch(data, term) {
    const part1 = searchTemplesAndBeaches(data, term);
    const part2 = searchCountriesAndCities(data, term);
    return [...part1, ...part2];
  }

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const cards = document.getElementById('cards');
    cards.innerHTML = '';

    // const card = document.getElementById('card');

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);

        // const foundItems = searchJSON(data, input);
        const foundItems = fullSearch(data, input);
console.log(foundItems);

        //  let foundItems;
        // for (const key of Object.keys(data)) {
        //     if (key.toLowerCase().includes(input)) {
        //         if (key === 'countries') {

        //         } else
        //         foundItems = data[key];


        //     }
        // }

        console.log(foundItems);
        if (foundItems) {
            for (const item of foundItems) {
                let card = document.createElement("div");
                card.style.background = "rgba(235, 233, 233, 0.4)";
                card.style.width = "90%";
                card.style.marginTop = "15px";
                card.style.marginLeft = "15px";
                card.style.borderRadius = "10px";
                card.style.border = "none";
                card.style.color = "black";

                card.innerHTML = '';
                card.innerHTML += `<img style="width: 100%" src="./images/${item.imageUrl}" alt="${item.name}">`;
                card.innerHTML += `<p style="margin: 10px"><strong>${item.name}</strong></p>`;
                card.innerHTML += `<p style="padding: 10px">${item.description}</p>`;

                cards.append(card);
            }
        } else {
            let card = document.createElement("div");
            card.innerHTML = '<p>Condition not found.</p>';
            cards.append(card);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        cards.innerHTML = 'An error occurred while fetching data.';
      });
  }

    const btnSearch = document.getElementById('searchBtn');
    btnSearch.addEventListener('click', searchCondition);