//import { query } from "../../Utils/db/connection"
'use strict';
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
}

module.exports.create = async (event, context, callback) => {
 
  var getParams = {
    Bucket: 'example-folder', // your bucket name,
    Key: 'jsonTest.json' // path to the object you're looking for
}

s3.getObject(getParams, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

  // No error happened
  // Convert Body from a Buffer to a String
  let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
  console.log("objectData: ", objectData);
});

};