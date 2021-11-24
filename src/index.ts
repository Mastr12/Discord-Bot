const path = require("path")
import { createReadStream } from "fs";
import { createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnection, StreamType } from '@discordjs/voice'
import DiscordJS, { Client, GuildMember, Intents, Message, MessageSelectMenu, MessageEmbedOptions, CollectorFilter, MessageReaction, Collection, User, ReactionCollectorOptions, Snowflake, VoiceChannel, Guild} from 'discord.js'
import { MessageTypes } from 'discord.js/typings/enums'
import dotenv from 'dotenv';
import { DisTube } from 'distube'
dotenv.config()


const client = new DiscordJS.Client({
intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INVITES
]
})

let gamingserver: Guild
let alpacaloungeConnection: VoiceConnection

// Listen for when the bot is ready
client.on('ready', () => {
  console.log('The bot is ready!')
})

// Listen for new messages
client.on('messageCreate', (msg) => {
  // Was the message "ping"?
  if (msg.content === 'ping') {
    // Reply with "pong"
    msg.reply({
      content: 'pong',
    })
  }

  if (msg.content === 'pls leave')
    join();

  // Was the message "wer ist dumm?"?
  if (msg.content === 'wer ist dumm?') {
    // Reply with "Miguel"
    msg.reply({
      content: 'Miguel'
    })
  }

  //Listen for new message to play audio
  if (msg.content === 'pls slap') {
    //Reply
   playsound("slap1.mp4", msg.author.id, 3)
  }

  if (msg.content === 'pls tutel') {
    //Reply
   playsound("tutel.mp3", msg.author.id, 16)
      msg.reply({
        content: 'Sound wird für dich abgespielt'
      })
  }

    //Listen for new message to play audio
    if (msg.content === 'pls 12') {
      //Reply
     playsound("Shesaidshewas12.mp3", msg.author.id, 2)
    }

    //Listen for new message to play audio
    if (msg.content === 'pls jebaited') {
      //Reply
      playsound("jebaited.mp3", msg.author.id, 38)
    }

    //Listen for new message to play audio
    if (msg.content === 'pls nutten') {
    //Reply
    playsound("DiesesNuttenSpiel.mp3", msg.author.id, 7)
  }

    //Listen for new message to play audio
    if (msg.content === 'pls brennen') {
      //Reply
      playsound("carsten.mp3", msg.author.id, 33)
    }

    //Listen for new message to play audio
    if (msg.content === 'pls adopted') {
      //Reply
      playsound("adopted.mp3", msg.author.id, 4)
    }

    //Listen for new message to play audio
    if (msg.content === 'pls stop') {
      //Reply
      playsound("stop1.mp3", msg.author.id, 5)
    }

})

client.on("ready", () => {
  join()
});

client.login(process.env.TOKEN)

function join(){
  // Audio Player
  let alpacalounge = client.channels!.cache!.get("817100639632228432")! as VoiceChannel;
  alpacaloungeConnection = joinVoiceChannel({
    channelId: alpacalounge.id,
    guildId: alpacalounge.guild.id,
    adapterCreator: alpacalounge.guild.voiceAdapterCreator,
  });
  gamingserver = client.guilds.cache.get("817098082587902042")!;
  gamingserver!.members.cache.get("905899545953722378")!.voice.setMute(false);
}

function playsound(file: string, id: string, length: number){
  var voice = gamingserver.members.cache.get(id)!.voice;

  if(typeof voice !== "undefined" && voice.channelId){
      let channel = client.channels.cache.get(voice.channelId) as VoiceChannel;
      if(typeof channel !== "undefined" && channel.joinable){

          const slapconnection = joinVoiceChannel({
              channelId: channel.id,
              guildId: channel.guild.id,
              adapterCreator: channel.guild.voiceAdapterCreator,
          });

          const player = createAudioPlayer();

          const resource = createAudioResource(createReadStream(path.join(process.cwd(),"res",file), {
            //@ts-ignore
            inputType: StreamType.WebmOpus,
            inlineVolume: true,
        }));

          player.play(resource);

          //Wait 500ms before playing the sound
          setTimeout(() => {
              slapconnection.subscribe(player);
              setTimeout(() => {
                  player.stop();
                  console.log('Finished playing, rejoining Alpacalounge!'); 
                  
                  join();
              
                }, length*1000+1000);
          }, 350);
      }
  }
}