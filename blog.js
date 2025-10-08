// Theme Toggle
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
  });
}

// Blog List Page
if (document.getElementById('blogList')) {
  fetch('assets/posts.json')
    .then(res => res.json())
    .then(posts => {
      const blogList = document.getElementById('blogList');
      blogList.innerHTML = '';
      posts.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `
          <h2>${post.title}</h2>
          <small>Published: ${post.date}</small>
          <p>${post.summary}</p>
          <a href="post.html?id=${post.id}" class="read-more">Read More →</a>
        `;
        blogList.appendChild(div);
      });

      // Search filter
      const searchInput = document.getElementById('searchInput');
      searchInput.addEventListener('keyup', () => {
        const query = searchInput.value.toLowerCase();
        const posts = document.querySelectorAll('.post');
        posts.forEach(p => {
          p.style.display = p.innerText.toLowerCase().includes(query) ? '' : 'none';
        });
      });
    });
}

// Single Post Page
if (document.getElementById('postDetail')) {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  fetch('assets/posts.json')
    .then(res => res.json())
    .then(posts => {
      const post = posts.find(p => p.id == postId);
      const postDetail = document.getElementById('postDetail');
      if (post) {
        postDetail.innerHTML = `
          <div class="post">
            <h2>${post.title}</h2>
            <small>Published: ${post.date}</small>
            <div class="content">${post.content}</div>
          </div>
        `;
      } else {
        postDetail.innerHTML = `<p>Post not found.</p>`;
      }
    });
}
