

## API 

### CLIENTS

- GET /api/clients/
  - query:
    - page - The result page number
    - limit - Number of results per page
    - filter - Search using this field
    - query - Search query
    - sort - Column to sort by
    - sortType - DESC\ASC
  - return:
    - clients: Clients list
    - total: Total number of all clients regardless of query  
  
- GET /api/clients/:id
  - param: Client id
  - return: Single client object

- POST /api/clients/new
  - body: Client fields
  - return: New client

- PUT /api/clients/:id
  - param: Client id
  - body: Fields to update
  - return: Updated client

- DELETE /api/clients/:id
  - param: Client id
  - return: 204

### WORKERS

- GET /api/workers/
  - query:
    - page - The result page number
    - limit - Number of results per page
    - filter - Search using this field
    - query - Search query
    - sort - Column to sort by
    - sortType - DESC\ASC
  - return:
    - clients: Workers list
    - total: Total number of all workers regardless of query  
  
- GET /api/workers/:id
  - param: Worker id
  - return: Single worker object

- POST /api/workers/new
  - body: Worker fields
  - return: New worker

- PUT /api/workers/:id
  - param: Worker id
  - body: Fields to update
  - return: Updated worker

- DELETE /api/workers/:id
  - param: Worker id
  - return: 204

### STATISTICS

- GET /api/stats/clients/sum/levels
  - return:
    - Clients grouped by client level

- GET /api/stats/clients/sum/workers
  - query:
    - levels - List of requires levels (1,2,3...)
  - return:
    - Number of clients per worker in query levels

- GET /api/stats/newclients/sum/month
  - return:
    - New clients grouped month

- GET /api/stats/sales/sum/workers
  - return:
    - Number of sales per worker

- GET /api/stats/daterange/sum/workers
  - query:
    - field - Required field (firstContact/saleDate)
    - from - From date (YYYY-MM-DD)
    - until - Until date (YYYY-MM-DD)
  - return:
    - Number of firstContact/saleDate per worker in given time frame

  
- GET /api/stats/sales/sum/countries
  - return:
    - Number of sales per country

- GET /api/stats/sales/sum/date
  - return:
    - Number of sales per date
  
- GET /api/stats/sales/sum/month
  - return:
    - Number of sales per month

- GET /api/stats/daterange/sum/
  - query:
    - field - Required field (firstContact/saleDate)
    - from - From date (YYYY-MM-DD)
    - until - Until date (YYYY-MM-DD)
  - return:
    - Number of firstContact/saleDate in given time frame
