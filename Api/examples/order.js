import { query } from "Utils/db/connection.js";
/*'use strict';
const aws = require('aws-sdk');
const s3 = new aws.S3(); // Pass in opts to S3 if necessary

const pg = require('pg')
const PGHOST = process.env.PGHOST;
const PGUSER = process.env.PGUSER;
const PGDATABASE = process.env.PGDATABASE;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = parseInt(process.env.PGPORT, 10);

const pool = new pg.Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT
})

async function query(q) {
  const client = await pool.connect()
  let res

  try {
    await client.query('BEGIN')
    try {

      res = await client.query(q)
      await client.query('COMMIT')

    } catch (err) {

      await client.query('ROLLBACK')
      throw err

    }
  } finally {

    client.release()
  }
  return res
}*/

module.exports.create = async (event, context, callback) => {
 
  console.log('event' + JSON.stringify(event))
  console.log('context' + JSON.stringify(context))
  try {

    const { rows } = await query("SELECT public.insertorders("+event.storerkey+","+event.externorderkey+","+event.c_company+","+event.ORDERDATE+","+event.c_address1+","+'1'+","+event.sku+","+event.originalqty+")")
    var response = {
      "statusCode": 200,
      "headers": {

        "Content-Type": "application/json"

      },
      "body": JSON.stringify(rows),
    "isBase64Encoded": false

    };

    callback(null, response);
  } catch (err) {

    //for test
    console.log('Database ' + err)
   //handling errors
    console.error('Database ' + err);
    //for more information, details
    console.info('Database ' + err)

    callback(null, 'Database ' + 'database error!!');
  }

 
};