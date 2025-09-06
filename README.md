### REST APIs With Express

## Learning Objectives

- Describe the Representational State Transfer (REST) architecture.
- Summarize the six guiding principles of REST.
- Explain how REST is used to build Application Programming Interfaces (APIs).
- Differentiate between REST, HTTP, and CRUD.
- Identify which HTTP methods correspond to specific CRUD actions.
- Summarize the advantages and disadvantages of the REST architecture.
- Create a working RESTful API using Express.
- Create structured data for the API.
- Create and organize API routes.
- Create custom middleware.
- Use third-party middleware.
- Summarize popular Express database integrations

## Representational State Transfer(REST)

- Representational State Transfer (REST) is an architectural style for Application Programming Interfaces (APIs) that serves to provide guiding principles for building robust, scalable APIs.

# REST Guiding Principles

- Uniform Interface
    - Each resource must have a unique identifier (like a URL: /users/123).
    - The server’s internal resource ≠ the representation sent to the client
    - Clients interact with representations, not the server’s internal data format.

- Client-Server
    - Client = UI (browser, app).
    - Server = data + logic.
    - Separation lets them evolve independently.

- Stateless
    - Each request must contain all needed info.
    - Server does not remember previous requests.
    - Example: always send your auth token.

- Cacheable
    - Responses can be stored temporarily.
    - Saves time and reduces server load.
    - Example: caching user profile data.

- Layered System
    - Requests can pass through multiple layers (load balancers, auth, server).
    - Client doesn’t care about layers, just the final response.
    - Adds flexibility, security, and scalability.

- Code on Demand (optional)
    - Server can send executable code (e.g., JavaScript) to client.
    - Extends client functionality.
    - Not commonly used in most REST APIs.
