// paginate.js
document.addEventListener("DOMContentLoaded", () => {
  const posts = [...document.querySelectorAll(".post")];
  const perPage = 3;
  const totalPages = Math.ceil(posts.length / perPage);
  const controls = document.getElementById("paginationControls");

  let currentPage = 1;

  function formatDates() {
    const dateElements = document.querySelectorAll(".date");
    dateElements.forEach(el => {
      const raw = el.textContent.trim();
      const parsed = new Date(raw);

      if (!isNaN(parsed)) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        el.textContent = parsed.toLocaleDateString(undefined, options);
      }
    });
  }

  function renderPage(page) {
    currentPage = page;
    posts.forEach((post, i) => {
      post.style.display = i >= (page - 1) * perPage && i < page * perPage ? "" : "none";
    });

    controls.innerHTML = "";

    if (page > 1) {
      const prev = document.createElement("button");
      prev.textContent = "← Previous";
      prev.onclick = () => renderPage(page - 1);
      controls.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === page) btn.disabled = true;
      btn.onclick = () => renderPage(i);
      controls.appendChild(btn);
    }

    if (page < totalPages) {
      const next = document.createElement("button");
      next.textContent = "Next →";
      next.onclick = () => renderPage(page + 1);
      controls.appendChild(next);
    }
  }

  renderPage(1);
});