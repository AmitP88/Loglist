import WebSocket from 'isomorphic-ws'

// i need terminal and server shared

// Connect to the socket server. (This is the address to use.)
const ws = new WebSocket('wss://rtjson-rhfdmrlzgx.now.sh/');

// We are going to need to store the UID given to us.
const storage = {
  uid: '',
  subscriptions: []
}

// This is just a utility to simply sending message to my socket server.

const sendMessage = (message) => {
  if (typeof message === 'string') {
    return ws.send(message)
  }

  return ws.send(JSON.stringify({ uid: storage.uid, ...message }))
}

// What to do when the socket connection is made.

ws.onopen = () => {
  console.log('Opened connection. Sending "something".')
}

// What to do when your app receives a message from the socket server.
ws.onmessage = (event) => {
  console.log('Got a message from the socket server.')

  // The data is stringified. We need to parse it.
  const message = JSON.parse(event.data)

  // If messageType is uid, that means we have been issued a uid
  // by the rtjson socket server. This is how it will tell us apart
  // from other connections when we talk to it.
  if (message.messageType === 'uid') {
    console.log(`Connected with uid ${message.uid}`)
    // Store our uid for later use. We will need it in any message
    // we send to the socket server.
    storage.uid = message.uid

    // Now that we have the uid stored, we can start communicating
    // with the rtjson socket server. We are going to send the uid
    // with every message so that it knows who we are.
  }

  if (message.messageType === 'update') {
    console.log(`Update for username ${message.user} / collection ${message.name}`)
    console.log({ message })
    storage.subscriptions.forEach(fn => fn(message))
  }
}

export const subscribe = (userName, collectionName, callback) => {
  storage.subscriptions.push(callback)
    // Here, we want to subscribe to the collection called "my-collection"
    // belonging to the user "amit-patel". By subscribing, we will be added
    // to the list of clients to get updates when this collection is modified.
    return sendMessage({
      subscribeTo: {
        user: userName,
        name: collectionName,
      },
    })
}

// This is an example of how you could add logs to the
// "my-collection" collection that belongs to "amit-patel".
export const addLogToCollection = () => {
  sendMessage({
    user: 'amit-patel',
    name: 'my-collection',
    additions: [
      {
        type: 'log',
        messages: ['rorororor', 'bbb', '222'],
      },
      {
        type: 'error',
        messages: ['hehe', 'qa3ym,,', '111'],
      },
      {
        type: 'warn',
        messages: ['q3gaedg', 'srgrs', '998699'],
      },
    ],
  })
}

export { sendMessage }
export default ws