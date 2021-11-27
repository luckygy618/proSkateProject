const debug = require("debug")("database:pool");
const Pool = require("pg").Pool;

/*
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
*/

const pool = new Pool({
  user: 'xemvdtxdrgcxyo',
  host: 'ec2-52-22-81-147.compute-1.amazonaws.com',
  database: 'd46s05aqql2mon',
  password: 'a405396684070ff90762b1b373dbb3e4737dab3cd1fd0b8ce4b64e64d2962bce',
  port: '5432',
  ssl: {
    rejectUnauthorized: false,
  },
});


pool.on("connect", (client) => {});

pool.on("remove", (client) => {});

pool.on("acquire", (client) => {});

pool.on("error", (err, client) => {
  debug(err);
});

module.exports = pool;
