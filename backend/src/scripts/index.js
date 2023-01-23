import { createConnection } from 'mysql2'

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
})

export default async function CreateDB() {
  connection.query(`CREATE DATABASE my_new_db`, function (err, results) {
    if (err) {
      console.log(err)
    } else {
      console.log('Database created successfully!')
    }
    connection.end()
  })
}
