function createReport(stats) {
  return `
===== RELATÓRIO =====

Total processados: ${stats.total}
Inseridos: ${stats.inserted}
Atualizados: ${stats.updated}
Ignorados: ${stats.ignored}
Erros: ${stats.errors}

=====================
`;
}

module.exports = { createReport };
