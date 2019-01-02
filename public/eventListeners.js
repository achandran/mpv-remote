document.addEventListener('DOMContentLoaded', () => {
  const commands = ['play-pause', 'go-back'];
  const commandElements = commands
    .reduce((lookup, id) => ({
      ...lookup,
      [id]: document.getElementById(id),
    }), {});

  commands.forEach(command => {
    const control = commandElements[command];
    control.addEventListener('click', async () => {
      const response = await fetch(`/${command}`);
      console.log(response);
    });
    control.addEventListener('touchstart', () => control.classList.add('highlight'));
    control.addEventListener('touchend', () => control.classList.remove('highlight'));
    control.addEventListener('touchcancel', () => control.classList.remove('highlight'));
  });
});
  /*

['click', 'touchstart'].forEach(eventType => )
document.getElementById('play-pause')
.addEventListener('click', async () => {
const response = await fetch('/play-pause');
console.log(response);
});

document.getElementById('go-back')
.addEventListener('click', async () => {
const response = await fetch('/go-back');
console.log(response);
});
});
*/