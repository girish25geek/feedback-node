document.addEventListener('DOMContentLoaded', () => {
  fetch('/feedbacks')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('feedback-list');
      data.reverse().forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
    });
});
