# Nest.js Banking System Example for Microservices

This repository covers the implementation of a microservices architecture using Nest.js, focusing on the account transfer feature of a banking system. Through this example, you'll learn about Domain-Driven Design (DDD), applying Clean Architecture principles, and implementing the Command Query Responsibility Segregation (CQRS) pattern.

## Project Structure

The project is composed of the following components:

- `account-service`: A microservice responsible for handling account-related business logic.
- `transaction-service`: A microservice responsible for transaction processing and history management.
- `api-gateway`: An API gateway that manages communication between clients and services.

## Key Learning Points

This example will help you grasp the following key topics:

### 1. Domain-Driven Design (DDD)

DDD is a methodology for modeling and designing complex domains. In this example, core domain concepts such as accounts and transactions are modeled and implemented effectively.

### 2. Applying Clean Architecture

Clean Architecture is an approach that divides software into isolated layers, separating concerns. This project manages the internal structure of each microservice and minimizes coupling with external dependencies.

### 3. Command Query Responsibility Segregation (CQRS) Pattern

The CQRS pattern separates the responsibility of commands and queries to enhance performance and scalability. In this example, account transfer requests and account queries are separated for efficient processing.

## Getting Started

The Getting Started section provides guidance on how to get started with the project. In this section, you will find information on what is required to run the project and how to execute it.

To run this project, you will need the following:

- Node.js (v19 or later)
- Yarn (v1.22 or later)
- PostgreSQL (v15 or later)

If you have all of the above installed, you can follow these steps to run the project:

1. Clone this repository.
2. Open the <a href="https://github.com/boy672820/nestjs-cqrs-clean-arch-example/blob/main/.env">.env</a> file and modify the database connection information.
3. Run the `yarn install` command to install the dependency packages for the project.
4. Run the `yarn db:migrate` command to perform database migration.
5. Run the `yarn dev` command to start the server.
6. You can now access the API at <a href="http://localhost:3000">http://localhost:3000</a>.

```shell
$ git clone https://github.com/boy672820/nestjs-cqrs-clean-arch-example # Clone the repository
Cloning into 'nestjs-cqrs-clean-arch-example'...
remote: Enumerating objects: 614, done.
remote: Counting objects: 100% (614/614), done.
remote: Compressing objects: 100% (407/407), done.
remote: Total 614 (delta 245), reused 524 (delta 155), pack-reused 0
Receiving objects: 100% (614/614), 454.45 KiB | 6.22 MiB/s, done.
Resolving deltas: 100% (245/245), done.

$ yarn install # Install the dependency packages
yarn install v1.22.19
[##--------------------------------------------------------------------] 16/71
...

$ yarn db:migrate # Migrate database
$ mikro-orm migration:create
Migration20231006172440.ts successfully created
✨  Done in 7.59s.

$ yarn dev # Start the server
yarn run v1.22.19
$ nest start --watch
...
Enjoy!
```

Also swagger ui address is <a href="http://localhost:3000/api">http://localhost:3000/api</a>

You can use the <a href="https://github.com/boy672820/nestjs-cqrs-clean-arch-example/blob/main/nest-cqrs-clean-arch-example.postman_collection.json">nest-cqrs-clean-arch-example.postman_collection.json</a> file to test the API in Postman. The ERD image (.png) file shows the project's database structure.

![erd](./erd.png)

Follow the above steps to run the project.

## Tests

```shell
$ yarn test # Run unit test
```

## Contributing

If you'd like to contribute to this project, fork this repository, create a new branch for your changes, and then submit a Pull Request. For more information on contributing, please refer to the CONTRIBUTING file.

## License

This project is distributed under the MIT license. For more details, see the LICENSE file.
