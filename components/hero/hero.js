document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.hero-news').forEach((element) => {

    const card = element.querySelector('.hero__card');
    const image = element.querySelector('.hero__image');
    const card_body = element.querySelector('.hero__body');
    const card_links = element.querySelector('.hero__links');
    let reclaimedHeight = 20;
    if (card_body) {
      reclaimedHeight += card_body.offsetHeight;
    }
    if (card_links) {
      reclaimedHeight += card_links.offsetHeight;
    }

    // Function to check the card height against the image, and hide elements if needed
    const adjustCardHeight = function(){
      if (window.innerWidth > 768 && card.offsetHeight > image.offsetHeight) {
        card_body.style.display = 'none';
        card_links.style.display = 'none';
      }
      if (window.innerWidth <= 768 || card.offsetHeight + reclaimedHeight < image.offsetHeight) {
        card_body.style.display = '-webkit-box';
        card_links.style.display = 'flex';
      }
    };

    // Adjust card height at page load
    adjustCardHeight();

    // Adjust card height on resize
    const handleResize = debounce(adjustCardHeight, 100);
    window.addEventListener('resize', handleResize);
  });
});