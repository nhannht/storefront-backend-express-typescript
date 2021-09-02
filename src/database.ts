import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    POSTGRES_PASSWORD,
} = process.env

let database: Pool = new Pool();


database = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_TEST_USER,
    password: POSTGRES_PASSWORD,
});
export default database
