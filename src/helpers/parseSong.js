export const getGameName = (song) => song.substring(0, song.indexOf(" -"));

export const getSongName = (song) => song.substring(song.indexOf("- ") + 2);

export const getCoverLink = (gameName) =>
  `/covers/${gameName.replace("&", "and")}.png`;
