document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackText = document.getElementById('feedback-text');
  const charCount = document.getElementById('char-count');
  const feedbackList = document.getElementById('feedback-list');

  const updateList = () => {
    fetch('/feedbacks')
      .then(res => res.json())
      .then(data => {
        feedbackList.innerHTML = '';
        data.reverse().forEach(entry => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${entry.text}</strong>
            <div class="timestamp">${entry.time}</div>
          `;
          feedbackList.appendChild(li);
        });
      });
  };

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `feedback=${encodeURIComponent(feedbackText.value)}`
    }).then(() => {
      feedbackText.value = '';
      charCount.textContent = '0 / 250';
      updateList();
    });
  });

  feedbackText.addEventListener('input', () => {
    charCount.textContent = `${feedbackText.value.length} / 250`;
  });

  updateList();
});
