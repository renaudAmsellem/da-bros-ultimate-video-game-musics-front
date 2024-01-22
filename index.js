var sound;

var play = () => {
  console.log('play')
  
  sound = new Howl({
    src: ['http://localhost:3000/music'],
    format: 'mp3',
    html5: true
  });
  sound.play()
}

var next = () => {
  console.log('next')
  sound.pause()
}