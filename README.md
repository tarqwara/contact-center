# Contact Center

## Usage

1. Clone the repository
    ```
    git clone git@github.com:tarqwara/contact-center.git
    ```
2. Install dependencies
    ```
    cd contact-center
    npm install
    ```
3. Build the application
    ```
    npm run build
    ```
4. Start the server
    ```
    npm run start
    ```
5. Go to <http://localhost:5000/>

## Demo
Working demo here: <https://dry-hamlet-63473.herokuapp.com/>

To leave a voice message, call the number **+1 424-888-5019**

## Architecture
##### Main frameworks and libraries:
- Backend:
    - [Express](<https://expressjs.com/>)
    - [node-postgres](<https://node-postgres.com/>)
- Frontend: 
    - [React](<https://reactjs.org/>)
    - [Bootstrap](<https://getbootstrap.com/>)
    - [Sass](<http://sass-lang.com/>)

Both the frontend and backend Javascript code is written in newest ECMAScript syntax, which is transpiled by [Babel](<https://babeljs.io/>) in part of the build and bundling process done by [Webpack](<https://webpack.js.org/>).

##### Project structure:
```
src
|
+---- app
|   |
|   +---- component
|   |
|   +---- util
|
+---- server
    |
    +---- api
    |
    +---- db
    |
    +---- routes
    |
    +---- service
```

`app` - Contains frontend/client files

`server` - Contains backend/server files

`app/component` - React components. Component directories consist of a component (`.jsx`) and its stylesheet (`.scss`).

`app/util` - Utility files.

`server/api` - Api layer. Contains setup of apis that are communicated with in service layer.

`server/db` - Database layer. Contains setup and helper functions for communication with the database.

`server/routes` - Backend routes and endpoints.

`server/service` - Service layer. Acts as a middleware for routes and database/apis, contains main business logic in backend.

## Technical solution

- When a call comes in, a `POST` request is made to `/api/voice` endpoint. It returns a Twiml response, which `Say`s _"Thank you for calling us, please leave a message after the beep"_. After the beep, the user can leave a message.
- When the call ends, a record `action` `POST` request is made to the `/api/voice/completed` endpoint. It stores the voice message to the database and sends an SMS message "_Thank you for contacting us, we will get back to you as shortly as we can_" to the incoming number.
- The stored voice messages are fetched from the database via a `GET` request to `/api/voice` endpoint and displayed in the `VoiceMessages` component.
- Voice message can be listened to via HTML5 `audio` element. When the voice message is played, an event is fired that makes a `POST` request to `/api/voice/listened` endpoint, which marks voice message as listened in database.
- Voice message can be deleted by clicking the delete icon, triggering an event that makes a `DELETE` request to `/api/voice` endpoint, which updates the `deleted` field of voice message in database.
- Voice message can be responded back via an SMS message by clicking the SMS icon. It triggers an event that makes a `POST` request to `/api/sms` endpoint, which sends the SMS to the incoming phone number of the voice message and stores the SMS message to the database.
- The stored SMS messages are fetched from the database via a `GET` request to `/api/sms` endpoint and displayed in the `SmsMessages` component.
- Calling back - _Not implemented_
