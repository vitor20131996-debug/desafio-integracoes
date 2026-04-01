const { fetchUsers } = require("./services/apiService");
const { upsertUser } = require("./repositories/userRepository");
const { createReport } = require("./utils/report");

async function main() {
  const stats = {
    total: 0,
    inserted: 0,
    updated: 0,
    ignored: 0,
    errors: 0,
  };

  try {
    const users = await fetchUsers();

    for (const user of users) {
      stats.total++;

      if (user.dob.age < 18) {
        stats.ignored++;
        continue;
      }

      try {
        const result = await upsertUser(user);

        if (result === "inserted") stats.inserted++;
        else stats.updated++;
      } catch (err) {
        console.error("Erro ao salvar usuário:", err.message);
        stats.errors++;
      }
    }

    console.log(createReport(stats));
  } catch (err) {
    console.error("Erro geral:", err.message);
  }
}

main();
