// Blog functionality
document.addEventListener('DOMContentLoaded', () => {
  const blogPosts = document.getElementById('blogPosts');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const searchInput = document.getElementById('blogSearch');
  
  // Example blog posts data - In production, this would come from a CMS or API
  const posts = [
    {
      title: 'Getting Started with Studio Monitoring',
      excerpt: 'Learn about the essential aspects of setting up proper studio monitoring...',
      category: 'studio',
      date: '2025-09-15',
      readTime: 5,
      image: '/assets/images/blog/monitoring.jpg',
      slug: 'studio-monitoring-setup'
    },
    // Add more posts here
  ];

  // Search functionality
  let currentCategory = 'all';
  let searchQuery = '';

  function filterPosts(category, query) {
    let filteredPosts = posts;
    
    // Filter by category
    if (category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    // Filter by search query
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredPosts = filteredPosts.filter(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
        return searchTerms.every(term => searchText.includes(term));
      });
    }
    
    renderPosts(filteredPosts, query);
  }

  function highlightText(text, query) {
    if (!query) return text;
    
    const searchTerms = query.toLowerCase().split(' ');
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    });
    
    return highlightedText;
  }

  // Render posts to the grid
  function renderPosts(postsToRender, query) {
    if (postsToRender.length === 0) {
      blogPosts.innerHTML = `
        <div class="no-results">
          <h3>No posts found</h3>
          <p>Try adjusting your search or browse all posts</p>
        </div>
      `;
      return;
    }

    blogPosts.innerHTML = postsToRender.map(post => `
      <article class="blog-card">
        <img src="${post.image}" alt="${post.title}">
        <div class="blog-card-content">
          <span class="category">${highlightText(post.category, query)}</span>
          <h3>${highlightText(post.title, query)}</h3>
          <p>${highlightText(post.excerpt, query)}</p>
          <div class="meta">
            <time datetime="${post.date}">${formatDate(post.date)}</time>
            <span>${post.readTime} min read</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Format date
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Social share functionality
  window.share = function(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
    };

    window.open(urls[platform], '_blank');
  };

  // Event listeners
  searchInput.addEventListener('input', debounce(function(e) {
    searchQuery = e.target.value;
    filterPosts(currentCategory, searchQuery);
  }, 300));

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.dataset.category;
      filterPosts(currentCategory, searchQuery);
    });
  });

  // Debounce function for search input
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initial render
  filterPosts('all');
});
