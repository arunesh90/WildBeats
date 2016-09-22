process.title = 'WildBeats'
const Discordie = require('discordie')
const Commands = require('./runtime/commands.js').Commands
const Config = require('./config.json')
const Event = Discordie.Events
const client = new Discordie({
  messageCacheLimit: 100,
  autoReconnect: true
})

client.Dispatcher.on(Event.MESSAGE_CREATE, (c) => {
  var msg = c.message
  var chunks = msg.content.split(' ')
  var cmd = chunks[0].substr(Config.prefix.length)
  var suffix = chunks.slice(1, chunks.length).join(' ')
  if (msg.content.indexOf(Config.prefix) === 0) {
    if (Commands[cmd]) {
      Commands[cmd].fn(msg, client, suffix)
    }
  }
})

client.Dispatcher.on(Event.GATEWAY_READY, () => {
  console.log('READY!')
})

client.Dispatcher.on(Event.DISCONNECTED, () => {
  console.log('Disconnected, trying to reconnect...')
})

if (Config.bot) {
  client.connect({
    token: Config.token
  })
} else {
  client.connect({
    email: Config.email,
    password: Config.password
  })
}
