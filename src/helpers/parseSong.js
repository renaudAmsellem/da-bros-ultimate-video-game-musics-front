export const getGameName = (song) =>
  song.indexOf(" -") > 0 ? song.substring(0, song.indexOf(" -")) : song;

export const getSongName = (song) => song.substring(song.indexOf("- ") + 2);

export const sanitizePath = (path) =>
  path.normalize("NFD").replace(/\p{Diacritic}/gu, "");

export const getCoverLink = (gameName) =>
  `/covers/${sanitizePath(gameName)}.png`;
