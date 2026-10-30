/* Smart Solution — scroll reveal: text mask-rise (any text), excludes hero slider + footer.
   Card slide is handled per-section in each page's CSS. Reduced-motion safe. */
(function(){
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // never touch these regions
  var EXCLUDE = '.hero, header, nav, footer, .h-controls, .lightbox, .case, .mmenu, .mobile-menu, .marquee, .work-filters, .reveal-up';

  // inject styles once
  var css =
    '.rvtxt{overflow:hidden; padding-bottom:.16em; margin-bottom:-.16em;}' +
    '.rvtxt > .rv-i{display:block; transform:translateY(125%); transition:transform 1.5s cubic-bezier(.16,1,.3,1); will-change:transform;}' +
    '.rvtxt.rv-on > .rv-i{transform:none;}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // text targets: headings, eyebrows, kickers, sub/title lines, lead copy
  var SEL = 'h1,h2,h3,h4,.eyebrow,.kicker,[class$="-kicker"],[class$="-sub"],[class$="-title"],[class$="-lead"],.sec-sub,.lead';

  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('rv-on'); io.unobserve(e.target); } });
  }, {threshold:0.2, rootMargin:'0px 0px -6% 0px'});

  var nodes = [].slice.call(document.querySelectorAll(SEL)).filter(function(el){
    if (el.closest(EXCLUDE)) return false;
    if (el.hasAttribute('data-norv')) return false;
    if (!el.textContent.trim()) return false;
    if (el.querySelector('img,svg,picture,iframe,video,canvas')) return false;     // skip media
    if (el.querySelector('div,ul,ol,section,article,header,nav')) return false;     // skip containers
    return true;
  });

  nodes.forEach(function(el, idx){
    var inner = document.createElement('span');
    inner.className = 'rv-i';
    while (el.firstChild) inner.appendChild(el.firstChild);
    el.appendChild(inner);
    el.classList.add('rvtxt');
    io.observe(el);
  });
})();
