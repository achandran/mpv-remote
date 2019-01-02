document.addEventListener('DOMContentLoaded', () => {
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