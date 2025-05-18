const searchButton    = document.getElementById('search-button');
const searchInput     = document.getElementById('search-input');
const creatureNameEl  = document.getElementById('creature-name');
const creatureIdEl    = document.getElementById('creature-id');
const weightEl        = document.getElementById('weight');
const heightEl        = document.getElementById('height');
const typesContainer  = document.getElementById('types');
const hpEl            = document.getElementById('hp');
const attackEl        = document.getElementById('attack');
const defenseEl       = document.getElementById('defense');
const spAttackEl      = document.getElementById('special-attack');
const spDefenseEl     = document.getElementById('special-defense');
const speedEl         = document.getElementById('speed');

function clearUI() {
  creatureNameEl.textContent = '';
  creatureIdEl.textContent   = '';
  weightEl.textContent       = '';
  heightEl.textContent       = '';
  typesContainer.innerHTML   = '';
  hpEl.textContent           = '';
  attackEl.textContent       = '';
  defenseEl.textContent      = '';
  spAttackEl.textContent     = '';
  spDefenseEl.textContent    = '';
  speedEl.textContent        = '';
}

searchButton.addEventListener('click', async e => {
  e.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  clearUI();
  if (!query) return;

  try {
    const res = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`
    );
    if (!res.ok) throw new Error();

    const data = await res.json();

    creatureNameEl.textContent = data.name.toUpperCase();
    creatureIdEl.textContent   = `#${data.id}`;
    weightEl.textContent       = `Weight: ${data.weight}`;
    heightEl.textContent       = `Height: ${data.height}`;

    data.types.forEach(typeObj => {
      const span = document.createElement('span');
      span.textContent = typeObj.name.toUpperCase();
      typesContainer.appendChild(span);
    });

    data.stats.forEach(s => {
      const stat = s.name;
      const val  = s.base_stat;
      switch (stat) {
        case 'hp':             hpEl.textContent       = val; break;
        case 'attack':         attackEl.textContent   = val; break;
        case 'defense':        defenseEl.textContent  = val; break;
        case 'special-attack': spAttackEl.textContent  = val; break;
        case 'special-defense':spDefenseEl.textContent = val; break;
        case 'speed':          speedEl.textContent    = val; break;
      }
    });

  } catch {
    alert('Creature not found');
  }
});
