export const getGameName = (song) =>
  song.indexOf(" -") > 0 ? song.substring(0, song.indexOf(" -")) : song;

export const getSongName = (song) => song.substring(song.indexOf("- ") + 2);

export const getCoverLink = (gameName) =>
  `/covers/${gameName.replace("&", "and")}.png`;
