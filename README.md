# Bitcoin Notifications

This is my submission for the bitcoin tracking exercise.

The project structure is as follows:
* scheduler - scheduled task that fetch the current bitcoin price every second
* backend - server-side logic, such as notification and configuration management
* web - web client

The project utilize Docker for isolating the different components. Communication between components is done via web socket.

Improvements and incomplete items:
* Web container configuration
* Web client implementation
* Better "domain" design
* Logging
* Testing
* Kafka for backend communication
* Better separation between the components and mongo
