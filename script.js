fetch("https://raw.githubusercontent.com/UNKNOWN001F/valuesjson/main/mi.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("value-list");
    const searchBar = document.getElementById("search-bar");
    const pets = data.pets;

    document.getElementById("last-updated").textContent = data.last_updated;

    pets.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

    function renderList(filteredPets) {
      container.innerHTML = "";
      filteredPets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${pet.image}" alt="${pet.name}" class="pet-image" />
          <h2>${pet.name}</h2>
          <p class="value">Value - ${pet.value}</p>
          <p>Ranged Value - [${pet.ranged_value}]</p>
          <p>Stability - ${pet.stability}</p>
          <p>Demand - ${pet.demand}</p>
          <p>Origin - ${pet.origin}</p>
          <p>Last Change in Value - ${pet.last_change}</p>
        `;
        container.appendChild(card);
      });
    }

    renderList(pets);

    searchBar.addEventListener("input", () => {
      const keyword = searchBar.value.toLowerCase();
      const filtered = pets.filter(pet =>
        pet.name.toLowerCase().includes(keyword)
      );
      renderList(filtered);
    });
  })
  .catch(err => {
    document.getElementById("value-list").innerHTML = "<p>Failed to load data.</p>";
    console.error(err);
  });
