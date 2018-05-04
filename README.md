wont# Bitcoin Notifications

This project isCreate an application that provides notifications for bitcoin price changes. Please choose one of the following:
* A single page application web application
* A traditional web application
* A service with a REST interface
  - A service with a GraphQL interface

Every time the price of bitcoin passes a threshold price in a given direction, a notification will be
sent. For web pages, this notification will be in the web page itself. For APIs it must be via email.
For example, if the price of Bitcoin goes from $1 to $2 and the threshold is set for $2,
notifications will be sent for “Up” and “Up or Down” alerts. Please choose how to present them.
Alerts need to persist when a user closes and reopens the web application or restarts the API. If
multiple users access the application, they should see the same set of alerts.


High level requirements:
* Create a backend service that monitor changes in bitcoin prices (https://api.cryptonator.com/api/full/btc-usd)
* Persist all of the changes
* In case the change cross a specific threshold, send a notification with the direction of the change

In order to save time, the project won't atone to the following:
* User specific session/configuration
  - All of the users will receive the same notification
* Actual scale (should prepare a scale-plan)
