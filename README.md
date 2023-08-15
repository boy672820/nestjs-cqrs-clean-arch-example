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

Refer to the README in each directory to learn how to build and run each microservice and the API gateway individually.

## Contributing

If you'd like to contribute to this project, fork this repository, create a new branch for your changes, and then submit a Pull Request. For more information on contributing, please refer to the CONTRIBUTING file.

## License

This project is distributed under the MIT license. For more details, see the LICENSE file.