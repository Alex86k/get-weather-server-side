import pgPromise from 'pg-promise'

const pgUri = 'Your PostgreSQL URI'
const pgp = pgPromise({})

export const db = pgp(pgUri)
