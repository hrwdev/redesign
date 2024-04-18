document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.stats').forEach((element) => {
    // Add a class when the element scrolls into view.
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          // Add a class to the element
          entry.target.classList.add('is-seen');
          // Disable the observer
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.75});
    observer.observe(element);
  });
});