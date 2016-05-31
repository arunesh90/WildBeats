<p style="text-align:center;">
<img src="http://i.imgur.com/BFfymIP.png"></p>

<p align="center">
<a href="http://nodejs.org"><img src="https://img.shields.io/badge/Node.js-5.10.1-blue.svg" alt="Node JS"></a>
<a href="http://npmjs.com"><img src="https://img.shields.io/badge/npm-3.8.6-blue.svg" alt="npm"></a>
<a><img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version"></a>
<a href="https://discord.gg/0cFoiR5QVh5LZlQO"><img src="https://discordapp.com/api/servers/110462143152803840/widget.png" alt="Discord server"></a>
</p>

---

### WildBeats is in alpha, quality and/or fitness of the program is not guaranteed.

WildBeats is the music streaming module from [WildBeast](https://github.com/SteamingMutt/WildBeast), with added tweaks to make it function better as a private music bot.   
Check the [Wiki](https://github.com/SteamingMutt/WildBeats/wiki) for more info!

# Installation
First off, make sure you have Node.js installed, you can check by running this in your terminal:
```bash
node --version
```
This should return something like:
```bash
v5.10.1
```

### Use [Node.js 5.10.1](https://nodejs.org/download/release/v5.10.1/) for the best experience! Anything higher will not work properly!

<br></br>
If you haven't cloned/downloaded the files already, do that now.   
Then, open a command window in the folder you've copied the files to, (Windows users can do shift+right-click in any directory to quickly open a cmd window in that folder) and type:
```bash
npm install
```
This will install all the required modules for WildBeats, if you get any errors, you can safely ignore them, as long as you end with a view similar to:
```bash
WildBeats@1.0.0
+-- discordie@0.5.6  (git://github.com/qeled/discordie.git#6fce7e8e552bd64663541ffaf374e07cc5b8fd2d)
| `-- ws@0.8.1
|   `-- bufferutil@1.2.1
|     `-- nan@2.3.0
`-- nedb@1.8.0
```
<br></br>

Now, you should make a config file, take the config.example.json file as a base and edit it, save it as `config.json` and run:
```bash
node MusicBot.js
```
---
<p align="center">
  <a href="https://github.com/feross/standard"><img src="https://cdn.rawgit.com/feross/standard/master/badge.svg" alt="JavaScript Standard Code Style"></a>
  <a href="https://discord.gg/0cFoiR5QVh5LZlQO"><img src="https://discordapp.com/api/servers/110462143152803840/widget.png?style=banner2" alt="Discord server"></a>
</p>
