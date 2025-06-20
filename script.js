fetch("https://raw.githubusercontent.com/UNKNOWN001F/valuesjson/main/mi.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("value-list");
    const searchBar = document.getElementById("search-bar");
    const pets = data.pets;

    document.getElementById("last-updated").textContent = data.last_updated;

    pets.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

    function getTier(value) {
      value = parseFloat(value);
      if (value >= 10) return "Tier 3";
      if (value >= 5) return "Tier 2";
      if (value >= 1) return "Tier 1";
      return "Tier 0";
    }

    const tierColors = {
      "Tier 3": "#ff4d88",
      "Tier 2": "#ff85b3",
      "Tier 1": "#ffaacc",
      "Tier 0": "#cccccc"
    };

    function renderList(filteredPets) {
      container.innerHTML = "";

      const grouped = {
        "Tier 3": [],
        "Tier 2": [],
        "Tier 1": [],
        "Tier 0": []
      };

      filteredPets.forEach(pet => {
        const tier = getTier(pet.value);
        grouped[tier].push(pet);
      });

      Object.entries(grouped).forEach(([tier, pets]) => {
        if (pets.length === 0) return;

        const heading = document.createElement("h2");
        heading.textContent = tier;
        heading.style.color = tierColors[tier];
        heading.style.fontFamily = "'Poppins', 'Segoe UI', sans-serif";
        heading.style.fontWeight = "900";
        heading.style.fontSize = "2rem";
        heading.style.marginTop = "2rem";
        heading.style.marginBottom = "1rem";
        heading.style.textAlign = "center";

        container.appendChild(heading);

        const tierGrid = document.createElement("div");
        tierGrid.style.display = "grid";
        tierGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
        tierGrid.style.gap = "1rem";
        tierGrid.style.marginBottom = "2rem";

        pets.forEach(pet => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image" />
            <h3>${pet.name}</h3>
            <p class="value">Value - ${pet.value}</p>
            <p>Ranged Value - [${pet.ranged_value}]</p>
            <p>Stability - ${pet.stability}</p>
            <p>Demand - ${pet.demand}</p>
            <p>Origin - ${pet.origin}</p>
            <p>Last Change in Value - ${pet.last_change}</p>
          `;
          tierGrid.appendChild(card);
        });

        container.appendChild(tierGrid);
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
