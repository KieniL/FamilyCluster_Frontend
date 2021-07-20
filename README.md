# frontend

Created with npx create-react-app frontend --template typescript

Create api.ts with content to get api configuration

Create api folder with generate.sh and run it

Added Dockerfile and nginx folder

Added Routing in App.tsx (npm i --save-dev @types/react-router-dom)
If there is any error in the api for babel just add declare to export namespace --> export declare namespace TokenVerifiyResponse


On local development export this: export REACT_APP_API_URL=https://frontend.kieni.at/api

In k8s there is no variable setting since it used from the relative path /api


## Logging

The logging is done with the default logging of spring boot (logback-spring) from the controller.
A logback-spring.xml is added and a new environment variable (ANSPAREN_LOG_LEVEL).


### Log Levels
Set this variable to see different loggings:
The hierarchy is as follows:
OFF
FATAL
ERROR
WARN
INFO
DEBUG
TRACE


This means that every line log all things from the levels above

### Log Fields:

I thought that these informations are interesting:

* timestamp
* level (message)
* thread
* message
* logger
* mdc
  * SYSTEM_LOG_LEVEL
  * REQUEST_ID

Based on owasp security logging (https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) I found that there are some additional information which are nice to have for logging:

* source ip
* User id
* HTTP status Code
* Reason for Status Code



So the final one is:

* timestamp
* level (message)
* thread
* message
* logger
* mdc
  * SYSTEM_LOG_LEVEL
  * REQUEST_ID
  * X-Real-IP
  * User id