// 自动播放,受浏览器策略的影响,
// 为了避免用户突然进入了一个陌生站点发出声音吓住用户,影响用户体验
// 所以浏览器的自动播放不是你可以随意设置的,它需要满足一定的策略
// 一般静音下可以随意自动播放,然后就是达到浏览器的信任阈值,就是用户经常刷的网页
{/* <script> */}
  const vdo = document.querySelector('video');// 播放控件
  const modal = document.querySelector('.modal'); // 一个蒙层
  const btn = document.querySelector('.btn');

// </script>
function play = () {
  vdo.muted = true;// 静音播放
  vdo.play();
  const ctx = new AudioContext();
  const canAutoPlay = ctx.state === 'running';
  ctx.close();
  if(canAutoPlay) {
    vdo.muted = false;
    modal.style.display = 'none';
    btn.removeEventListener('click', play)
  }else {
    modal.style.display = 'flex';
    btn.addEventListener('click', play)
  }
}
// play()
