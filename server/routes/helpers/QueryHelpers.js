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
        Clients.firstName AS firstName,
        Clients.lastName AS lastName,
        Clients.email AS email,
        Clients.phone AS phone,
        Clients.sold AS sold,
        Clients.firstContact AS firstContact,
        Clients.saleDate AS saleDate,
        clev.name AS level,
        co.name AS country,
        CONCAT( wo.firstName, ' ', wo.lastName) AS workerName
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
      filter && query ? `AND ${tableShortcut}.${filter} LIKE '%${query}%'` : ''
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

  static getClientsSumByLevel = async () => {
    const result = await sequelize.query(
      'SELECT level, COUNT(*) AS total FROM Clients GROUP BY level'
    )
    return result[0]
  }

  static getClientsSumByWorker = async levels => {
    const levelQuery = levels ? `AND clients.level IN (${levels}) ` : ''
    const result = await sequelize.query(
      `SELECT
         workers.firstName, 
         workers.lastName, 
         workers.id,
         COUNT(*) as total 
       FROM 
         Clients AS clients, 
         Workers AS workers 
       WHERE
         workers.id = clients.worker 
         ${levelQuery}
       GROUP BY 
         worker
       ORDER BY
         total DESC`
    )
    return result[0]
  }

  static getSalesSumByWorker = async () => {
    const result = await sequelize.query(
      `SELECT
         workers.firstName, 
         workers.lastName, 
         workers.id, 
         COUNT(*) AS total 
       FROM 
         Clients AS clients, 
         Workers AS workers 
       WHERE
         workers.id = clients.worker
       AND
         clients.sold = 1
       GROUP BY 
         worker
       ORDER BY
         total DESC`
    )
    return result[0]
  }
  static getSalesSumByCountry = async () => {
    const result = await sequelize.query(
      `SELECT
         countries.name, 
         countries.id, 
         COUNT(*) AS total 
       FROM 
         Clients AS clients, 
         Countries AS countries 
       WHERE
         countries.id = clients.country
       AND
         clients.sold = 1
       GROUP BY 
         country
       ORDER BY
         total DESC
       LIMIT 5`
    )
    return result[0]
  }

  static getSalesSumByDate = async () => {
    const result = await sequelize.query(
      `SELECT
         saleDate , 
         COUNT(*) AS total 
       FROM 
         Clients 
       WHERE
         sold = 1
       GROUP BY 
         saleDate
       ORDER BY
         saleDate DESC`
    )
    return result[0]
  }
  static getSalesSumByMonth = async () => {
    const result = await sequelize.query(
      `SELECT
         YEAR(saleDate) AS year,
         MONTH(saleDate) AS month, 
         COUNT(*) as total 
       FROM 
         Clients 
       WHERE
         sold = 1
       GROUP BY 
         YEAR(saleDate),
         MONTH(saleDate)
       ORDER BY
         YEAR(saleDate) DESC,
         MONTH(saleDate) DESC`
    )
    return result[0]
  }
  static getNewClientsSumByMonth = async () => {
    const result = await sequelize.query(
      `SELECT
         YEAR(firstContact) AS year,
         MONTH(firstContact) AS month, 
         COUNT(*) as total 
       FROM 
         Clients 
       GROUP BY 
         YEAR(firstContact),
         MONTH(firstContact)
       ORDER BY
         YEAR(firstContact) DESC,
         MONTH(firstContact) DESC`
    )
    return result[0]
  }
  static getByDateRange = async (field, from, until) => {
    const result = await sequelize.query(
      `SELECT
         ${field},
         COUNT(*) as total
       FROM 
         Clients 
       WHERE 
         ${field} BETWEEN '${from}' AND '${until}'
       GROUP BY
         ${field}
       ORDER BY
         ${field} DESC`
    )
    return result[0]
  }

  static getSalesDatesByWorker = async (field, from, until) => {
    const result = await sequelize.query(
      `SELECT
         COUNT(clients.${field}) AS total_${field},
         workers.firstName,
         workers.lastName,
         workers.id
       FROM 
         Clients AS clients,
         Workers AS workers
       WHERE 
         clients.${field} BETWEEN '${from}' AND '${until}'
       AND
         clients.worker = workers.id
       GROUP BY
         workers.id`
    )
    return result[0]
  }

  static getAllCountries = async () => {
    const result = await sequelize.query(
      `SELECT
         id, name, code
       FROM 
         Countries
       ORDER BY
         name`
    )
    return result[0]
  }

  static getAllLevels = async () => {
    const result = await sequelize.query(
      `SELECT
         id, name, email
       FROM 
        ClientLevels
       ORDER BY
         id`
    )
    return result[0]
  }
}

module.exports = QueryHelpers
