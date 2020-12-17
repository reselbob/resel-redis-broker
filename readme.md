# resel-redis-broker

This is a wrapper package for `redis`. It exposes two classes, `Publisher` and `Subscriber`.

**The project requires** that the following environment variables exist in the process that is
running the classes;

`REDIS_HOST` is the DNS or IP address of the `redis` host. This could be a local DNS entry or
one provided the a `redis` service provider.

`REDIS_PORT` the port where `redis` is listening. Defaults to port `6379`.

`REDIS_PWD` the password needed to access `redis`

## Installation

`npm install resel-redis-broker`

## Publisher

### Constructor

`Publisher(channel)`

WHERE

`channel` is the channel on `redis` to where messages wil be published.

### Properties

`Publisher.id`  A `uuid` that get assigned to the `Publisher` upon construction.

### Methods

`Publisher.ping()` Simple `ping` method that returns, `{response: 'PONG"'}`

`Publisher.publish(string)` Publishes a message to the channel defined in teh class's constructor

`Publisher.close()` Closes down the publisher connection

### Example

```javascript

const {Publisher, Subscriber} = require('resel-redis-broker');
const channel = 'testChannel';
const publisher = new Publisher(channel);

const rslt = await publisher.ping();
//result is PONG

```

## Subscriber

### Constructor

`Subscriber(channel, callback)`

WHERE

`channel`  is the channel on `redis` where the subscriber will listen for messages.

`callback(channel, message)` is the method that gets executed when a message is received from `redis`.

### Properties

`Subscriber.id`  A `uuid` that get assigned to the `Subscriber` upon construction.


### Methods

`await Subscriber.close()` Closes down the `Subscriber` connection

`await Subscriber.unsubscribe()` unsubscribes the `Subscriber` from the channel

### Example

```javascript
const channel = 'testChannel';

const onMessageReceived = async (channel, message) => {
    console.log(`[RECEIVED MESSAGE], ${message}  from channel, ${channel} at ${new Date()}`);
}

const subscriber = new Subscriber(channel, onMessageReceived);

```