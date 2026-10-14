(function () {
  var section = document.getElementById('trabalhos');
  if (!section) return;
  var track = section.querySelector('.gallery-grid');
  var links = Array.from(section.querySelectorAll('.bench-photo-link'));
  var dialog = section.querySelector('.bench-dialog');
  var expanded = dialog.querySelector('.bench-expanded');
  var caption = dialog.querySelector('.bench-caption');
  var counter = dialog.querySelector('.bench-counter');
  var previous = dialog.querySelector('.bench-dialog-prev');
  var next = dialog.querySelector('.bench-dialog-next');
  var index = 0;
  function show(n) {
    index = Math.max(0, Math.min(links.length - 1, n));
    expanded.src = links[index].href;
    expanded.alt = links[index].querySelector('img').alt;
    caption.textContent = links[index].parentElement.querySelector('figcaption').textContent;
    counter.textContent = (index + 1) + ' de ' + links.length;
    previous.disabled = index === 0;
    next.disabled = index === links.length - 1;
  }
  section.querySelector('.bench-controls').hidden = false;
  section.querySelector('.bench-prev').addEventListener('click', function () { track.scrollBy({left: -(track.firstElementChild.getBoundingClientRect().width + 14), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); });
  section.querySelector('.bench-next').addEventListener('click', function () { track.scrollBy({left: track.firstElementChild.getBoundingClientRect().width + 14, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); });
  if (typeof dialog.showModal !== 'function') return;
  links.forEach(function (link, i) { link.addEventListener('click', function (event) { event.preventDefault(); show(i); dialog.showModal(); document.body.classList.add('bench-modal-open'); }); });
  previous.addEventListener('click', function () { show(index - 1); });
  next.addEventListener('click', function () { show(index + 1); });
  dialog.querySelector('.bench-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
  });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) { var r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', function () { document.body.classList.remove('bench-modal-open'); links[index].focus(); });
})();