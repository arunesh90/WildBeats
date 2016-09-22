var Commands = []
const Songs = require('./songs.json')
const DL = require('youtube-dl')
var list = {}

Commands.summon = Commands.voice = Commands['join-voice'] = {
  name: 'summon',
  help: 'Initiate me in a voice channel.',
  fn: function(msg, bot, suffix) {
    if (bot.VoiceConnections.length >= 1 && msg.guild.id !== bot.VoiceConnections[0].voiceConnection.guild.id) {
      for (var c of bot.VoiceConnections) {
        c.voiceConnection.disconnect()
      }
    }
    suffix = suffix.toLowerCase()
    var VC = msg.guild.voiceChannels.filter((r) => {
      return r.name.toLowerCase() === suffix
    })
    var GVC = msg.member.getVoiceChannel()
    if (!VC && !GVC) {
      join(msg.guild.voiceChannels[0], msg)
    } else if (!GVC) {
      join(VC, msg)
    } else {
      join(GVC, msg)
    }
  }
}

Commands.play = Commands.request = {
  name: 'play',
  help: 'Request for something to play.',
  fn: function(msg, bot, suffix) {
    if (bot.VoiceConnections.length === 0) {
      msg.channel.sendMessage('Not connected.')
    } else {
      DL.getInfo(suffix, function(err, info) {
        if (err) {
          msg.channel.sendMessage('That does not work.')
        } else if (info) {
          if (list.link === undefined) {
            list = {
              link: [info.url],
              requester: [msg.author.username],
              volume: 100,
              title: [info.title]
            }
            next(msg, bot)
          } else {
            list.link.push(info.url)
            list.requester.push(msg.author.username)
            list.title.push(info.title)
          }
        }
      })
    }
  }
}

Commands.skip = {
  name: 'skip',
  help: 'Skips a song.',
  fn: function(msg, bot) {
    if (list.link === undefined || list.link.length === 0) {
      shuffle(bot.VoiceConnections[0], msg)
    } else {
      list.link.shift()
      list.requester.shift()
      list.title.shift()
      next(msg, bot)
    }
  }
}

Commands.queue = Commands.playlist = Commands.list = {
  name: 'queue',
  help: 'Gets the playlist.',
  fn: function(msg) {
    if (list.title !== undefined) {
      var arr = []
      arr.push(`Now playing **${list.title[0]}** requested by *${list.requester[0]}*`)
      for (var i = 0; i < list.link.length; i++) {
        arr.push(`${i++}. ${list.title[i]} requested by ${list.requester[i]}`)
        if (i === 9) {
          arr.push(`${list.title.length - 10 > 0 ? 'And about ' + list.title.length - 10 + ' more songs.' : null}`)
          break
        }
      }
      msg.channel.sendMessage(arr.join('\n'))
    }
  }
}

exports.Commands = Commands

function next(msg, bot) {
  if (list.link === undefined || list.link.length === 0) {
    shuffle(bot.VoiceConnections[0], msg)
    return
  }
  var encoder = bot.VoiceConnections[0].voiceConnection.createExternalEncoder({
    type: 'ffmpeg',
    format: 'pcm',
    source: list.link[0]
  })
  encoder.play()
  var vol = (list.volume !== undefined) ? list.volume : 100
  bot.VoiceConnections[0].voiceConnection.getEncoder().setVolume(vol)
  msg.channel.sendMessage(`Now playing **${list.title[0]}**`)
  encoder.once('end', () => {
    list.link.shift()
    list.requester.shift()
    list.title.shift()
    if (list.link.length === 0) {
      list = {}
      shuffle(bot.VoiceConnections[0], msg)
    } else {
      next(msg, bot)
    }
  })
}

function join(VC, m) {
  VC.join().then((vc) => {
    m.channel.sendMessage(`Joining ${vc.voiceConnection.channel.name}`)
    shuffle(vc, m)
  })
}

function shuffle(con, m) {
  var randmus = Math.floor((Math.random() * Songs.length))
  DL.getInfo(Songs[randmus], ['--skip-download'], function(err, info) {
    if (err) {
      console.error(err)
    } else if (info) {
      var encoder = con.voiceConnection.createExternalEncoder({
        type: 'ffmpeg',
        format: 'pcm',
        source: info.url
      })
      encoder.play()
      m.channel.sendMessage(`Now playing **${info.title}**`)
      encoder.once('end', () => {
        if (list.link === undefined || list.link.length === 0) {
          shuffle(con, m)
        }
      })
    }
  })
}