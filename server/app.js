const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

app.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    res.send(`
      <html>
        <head>
          <title>Willkommen</title>
        </head>
        <body>
          <h1>Verbindung erfolgreich! Zeitstempel: ${result.rows[0].now}</h1>
          <p><a href="/db-info">Hier klicken für Datenbank Informationen</a></p>
        </body>
      </html>
    `);
  } finally {
    client.release();
  }
});

app.get('/db-info', async (req, res) => {
  const client = await pool.connect();
  try {
    const dbSizeQuery = `
      SELECT
        d.datname as name,
        pg_size_pretty(pg_database_size(d.datname)) as size
      FROM
        pg_database d
      WHERE
        d.datistemplate = false;
    `;

    const queryStats = `
      SELECT
        COUNT(*) FILTER (WHERE query_start >= NOW() - INTERVAL '30 seconds') AS queries_last_30_seconds,
        COUNT(*) FILTER (WHERE query_start >= NOW() - INTERVAL '5 minutes') AS queries_last_5_minutes,
        COUNT(*) FILTER (WHERE query_start >= NOW() - INTERVAL '1 hour') AS queries_last_1_hour
      FROM
        pg_stat_activity
      WHERE
        state = 'active';
    `;

    const dbSizesResult = await client.query(dbSizeQuery);
    const queryStatsResult = await client.query(queryStats);

    const dbSizes = dbSizesResult.rows;
    const stats = queryStatsResult.rows[0];

    const response = {
      databases: dbSizes.map(db => ({
        name: db.name,
        size: db.size,
      })),
      query_stats: {
        queries_last_30_seconds: stats.queries_last_30_seconds,
        queries_last_5_minutes: stats.queries_last_5_minutes,
        queries_last_1_hour: stats.queries_last_1_hour,
      }
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: Datenbankinformationen konnten nicht abgerufen werden');
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
