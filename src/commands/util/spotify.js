const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "spotify",
  category: "fun",
  aliases: ["spot"],
  description: "Shows status of users",
  usage: " ",
  execute(bot, message, args) {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    user.presence.activities.forEach((activity) => {
      if (
        activity.type === "LISTENING" &&
        activity.name === "Spotify" &&
        activity.assets !== null
      ) {
        const trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(
          8
        )}`;
        const trackURL = `https://open.spotify.com/track/${activity.syncID}`;
        const trackName = activity.details;
        const trackAuthor = activity.state?.replace(/;/g, ",");
        const trackAlbum = activity.assets.largeText;

        const embed = new MessageEmbed()
          .setAuthor(
            "Spotify Track Info",
            "https://cdn.discordapp.com/icons/760910276190273556/cd34eeb402f5613fc18b97e37c54a028.webp"
          )
          .setColor("GREEN")
          .setThumbnail(trackIMG)
          .addField("Song Name", trackName, true)
          .addField("Album", trackAlbum, true)
          .addField("Author", trackAuthor, false)
          .addField("Listen to Track", `${trackURL}`, false)
          .setFooter(
            user.displayName,
            user.user.displayAvatarURL({ dynamic: true }),
            "Developed by Team Sarte"
          )
          .setTimestamp();
        message.channel.send(embed);
      }
    });
  },
};
