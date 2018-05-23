export default class MusicPlayer {
  constructor(element, audioPath, songName, artist) {
    this.audio = new Audio(audioPath);
    this.play = this.play.bind(this);
    this.playBtn = element.querySelector('#play');
    this.playBtn.addEventListener('click', this.play);
    this.controlPanel = element.querySelector('#control-panel');
    this.infoBar = element.querySelector('#info');
    this.progressBar = this.infoBar.querySelector('.bar');
    this.isPlaying = false;

    this.infoBar.querySelector('.artist').innerHTML = artist;
    this.infoBar.querySelector('.name').innerHTML = songName;

    this.audio.loop = true;
    this.audio.addEventListener('ended', () => {
        this.currentTime = 0;
        this.play();
    }, false);
    this.audio.addEventListener('timeupdate', (e) => {
      const percentage = this.audio.currentTime / this.audio.duration * 100;
      this.progressBar.style.width = `${percentage}%`;
    });
  }

  play() {
    let controlPanelObj = this.controlPanel,
      infoBarObj = this.infoBar;

    Array.from(controlPanelObj.classList).find(function(element){
      return element !== 'active' ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
    });

    Array.from(infoBarObj.classList).find(function(element){
      return element !== 'active' ? infoBarObj.classList.add('active') : infoBarObj.classList.remove('active');
    });

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
