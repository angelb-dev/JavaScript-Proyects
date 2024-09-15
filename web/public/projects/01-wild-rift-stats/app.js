document.addEventListener("DOMContentLoaded", () => {
  const championData = [
    { nombre: "Ziggs (No Rework)", picks: 0, bans: 1, victorias: 0, derrotas: 0, kda: 0, tiempoPromedio: 10, farmeoPorMinuto: 2, danioPorMinuto: 0, aguantePorMinuto: 0, diferenciaDeFarming: 0 },
    { nombre: "Orn", picks: 1, bans: 4, victorias: 0, derrotas: 0, kda: 0, tiempoPromedio: 1, farmeoPorMinuto: 0, danioPorMinuto: 10, aguantePorMinuto: 0, diferenciaDeFarming: 0 },
  ];

  const app = document.createElement('div');
  app.id = 'app';
  app.innerHTML = `
    <h1>Estadísticas de Campeones de Wild Rift Competitivo (WRL2)</h1>
    <table id="champion-table">
      <thead>
        <tr>${['Campeón', 'Picks', 'Bans', 'Presencia', 'Victorias', 'Derrotas', 'Win Ratio', 'KDA', 'Tiempo Promedio', 'Farmeo/Min', 'Daño/Min', 'Aguante/Min', 'Diferencia Farmeo']
          .map(header => `<th>${header}</th>`).join('')}</tr>
      </thead>
      <tbody id="champion-list"></tbody>
    </table>
    <div id="additional-text">
      <h2>Sub titulo</h2>
      <p>Buenas noches familia!</p>
    </div>
  `;
  document.body.appendChild(app);

  const championList = document.getElementById("champion-list");
  
  const totalGames = championData.reduce((sum, c) => sum + c.picks + c.bans, 0) / 10;

  const calculatePresence = (champion) => ((champion.picks + champion.bans) / totalGames * 100).toFixed(2);

  const renderChampionTable = (data) => {
    championList.innerHTML = data.map(champion => {
      const totalGames = champion.victorias + champion.derrotas;
      const winRatio = totalGames ? (champion.victorias / totalGames * 100).toFixed(2) : '0.00';
      return `
        <tr>${[champion.nombre, champion.picks, champion.bans, `${calculatePresence(champion)}%`, champion.victorias, champion.derrotas, `${winRatio}%`, champion.kda.toFixed(2), champion.tiempoPromedio, champion.farmeoPorMinuto.toFixed(2), champion.danioPorMinuto.toFixed(2), champion.aguantePorMinuto.toFixed(2), champion.diferenciaDeFarming.toFixed(2)]
          .map(value => `<td>${value}</td>`).join('')}</tr>
      `;
    }).join('');
  };

  const createSortHandler = (key, isNumeric = true) => {
    let sortDirection = 1;
    return () => {
      championData.sort((a, b) => {
        const aValue = key === 'presencia' ? Number(calculatePresence(a)) : isNumeric ? a[key] : a[key].toString();
        const bValue = key === 'presencia' ? Number(calculatePresence(b)) : isNumeric ? b[key] : b[key].toString();
        return isNumeric ? (aValue - bValue) * sortDirection : aValue.localeCompare(bValue) * sortDirection;
      });
      renderChampionTable(championData);
      sortDirection *= -1;
    };
  };

  ['nombre', 'picks', 'bans', 'presencia', 'victorias', 'derrotas', 'winRatio', 'kda', 'tiempoPromedio', 'farmeoPorMinuto', 'danioPorMinuto', 'aguantePorMinuto', 'diferenciaDeFarming']
    .forEach((key, index) => {
      document.querySelector(`#champion-table thead th:nth-child(${index + 1})`)
        .addEventListener("click", createSortHandler(key, key !== 'nombre'));
    });

  renderChampionTable(championData);

  const statsContainer = document.createElement("div");
  statsContainer.id = "stats-container";
  statsContainer.innerHTML = `
    <h2>Estadísticas de Partida</h2>
    <table id="game-stats-table">
      ${['Primera Sangre', 'Primera Torre', 'Heraldo', 'Primer Dragón', 'Segundo Dragón', 'Alma de Dragón', 'Primer Nashor', 'Primer Dragón Ancestral']
        .map(stat => `<tr><td>${stat}</td><td>${Math.floor(Math.random() * 2) + 60}%</td></tr>`).join('')}
    </table>
  `;
  document.body.appendChild(statsContainer);
});