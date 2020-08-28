const sequelize = require('../../models/sequelize')

class QueryHelpers {
  static tables = {
    Clients: {
      selectionQuery: this.getUserSelectionQuery,
    },
    Workers: {
      selectionQuery: this.getWorkerSelectionQuery,
    },
  }
  static getUserSelectionQuery() {
    return `
      SELECT 
        Clients.id AS id,
        Clients.firstName AS first, 
        Clients.lastName AS last, 
        Clients.email AS email,
        Clients.phone AS phone,
        Clients.sold AS sold,
        clev.name AS level,
        co.name AS country,
        wo.firstName AS workerFirst, 
        wo.lastName As workerLast 
      FROM 
        Clients AS Clients, 
        Workers AS wo, 
        Countries AS co, 
        ClientLevels as clev 
      WHERE
        Clients.worker = wo.id 
      AND
        Clients.country = co.id 
      AND
        Clients.level = clev.id 
    `
  }

  static getWorkerSelectionQuery() {
    return `
      SELECT 
        id,
        firstName, 
        lastName, 
        email,
        phone,
        imageURL
      FROM 
        Workers 
    `
  }

  static queryParamsToSQL(queryObject, tableShortcut) {
    const { page, limit, filter, sort, sortType, query } = queryObject
    const limitQuery = limit ? `LIMIT ${limit}` : ''
    const offsetQuery = page && limit ? `OFFSET ${(page - 1) * 20}` : ``
    const sortQuery = sort ? `ORDER BY ${tableShortcut}.${sort}` : ''
    const sortTypeQuery = sortType || ''
    const searchQuery =
      filter && query ? `AND cl.${filter} LIKE '%${query}%'` : ''
    return `${searchQuery} ${sortQuery} ${sortTypeQuery} ${limitQuery} ${offsetQuery}`
  }

  static getTotalNumberOf = async tableName => {
    return await sequelize.query(`SELECT COUNT(*) AS total FROM ${tableName}`)
  }

  static getBySearchQuery = async (queryObject, tableName) => {
    console.log(tableName)
    console.log(this.tables[tableName])
    const selectionQuery = this.tables[tableName].selectionQuery()
    const result = await sequelize.query(
      `${selectionQuery}
       ${this.queryParamsToSQL(queryObject, tableName)} `
    )
    return result
  }

  static getWorkerById = async id => {
    const result = await sequelize.query(
      `SELECT
        id,
        firstName,
        lastName,
        email,
        phone,
        imageURL
      FROM
        Workers
      WHERE
        id = '${id}'`
    )
    return result[0][0]
  }

  static getClientById = async id => {
    const result = await sequelize.query(
      `SELECT
        cl.id AS id,
        cl.firstName AS firstName,
        cl.lastName AS lastName,
        cl.email AS email,
        cl.phone AS phone,
        cl.sold AS sold,
        clev.name AS level,
        co.name AS country,
        wo.firstName AS workerFirst,
        wo.lastName As workerLast
      FROM
        Clients AS cl,
        Workers AS wo,
        Countries AS co,
        ClientLevels as clev
      WHERE
        cl.worker = wo.id
      AND
        cl.country = co.id
      AND
        cl.level = clev.id
      AND cl.id = '${id}'`
    )
    return result[0][0]
  }

  static insertNewWorker = async clientObject => {
    const {
      firstName,
      lastName,
      email,
      phone,
      sold,
      level,
      country,
      worker,
    } = clientObject
    return await sequelize.query(
      `INSERT INTO Clients VALUES(null, '${firstName}', '${lastName}', '${email}', '${phone}', '${sold}', '${level}','${country}','${worker}' )`
    )
  }

  static insertNewClient = async clientObject => {
    const {
      firstName,
      lastName,
      email,
      phone,
      sold,
      level,
      country,
      worker,
    } = clientObject
    return await sequelize.query(
      `INSERT INTO Clients VALUES(null, '${firstName}', '${lastName}', '${email}', '${phone}', '${sold}', '${level}','${country}','${worker}' )`
    )
  }

  static getLastEnteredUser = async () => {
    const result = await sequelize.query(
      'SELECT * FROM Clients WHERE id = LAST_INSERT_ID()'
    )
    return result[0][0]
  }

  static deleteEntityByID = async (id, entity) => {
    return await sequelize.query(`DELETE FROM ${entity} WHERE id = '${id}'`)
  }

  static updateClientByID = async (id, updateObject) => {
    const setQuery = Object.entries(updateObject)
      .map(entry => [entry[0], `'${entry[1]}'`].join(' = '))
      .join(' , ')
    return await sequelize.query(
      `UPDATE Clients
         SET ${setQuery}
         WHERE id = '${id}'`
    )
  }

  static updateEntityByID = async (id, entity, updateObject) => {
    const setQuery = Object.entries(updateObject)
      .map(entry => [entry[0], `'${entry[1]}'`].join(' = '))
      .join(' , ')
    return await sequelize.query(
      `UPDATE ${entity}
         SET ${setQuery}
         WHERE id = '${id}'`
    )
  }
}

module.exports = QueryHelpers
