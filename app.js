(function(){
  var mobile=matchMedia('(max-width:720px)');
  var prog=document.getElementById('progress'),top=document.getElementById('topBtn');
  var links=[].slice.call(document.querySelectorAll('.nav-links a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function onScroll(){
    var h=document.documentElement.scrollHeight-innerHeight,y=scrollY;
    prog.style.width=(h>0?Math.min(100,y/h*100):0)+'%';
    top.classList.toggle('show',y>innerHeight*1.2);
    var cur=-1;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<innerHeight*.35)cur=i});
    links.forEach(function(a,i){a.classList.toggle('on',i===cur)});
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  top.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});

  var menu=document.getElementById('menu'),mb=document.getElementById('menuBtn');
  function setMenu(o){menu.hidden=!o;mb.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
  mb.addEventListener('click',function(){setMenu(true)});
  document.getElementById('menuClose').addEventListener('click',function(){setMenu(false)});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)setMenu(false)});

  /* Linaje: acordeón en móvil, generaciones II–VII plegadas (Figma 213:1588) */
  var gens=[].slice.call(document.querySelectorAll('.gen'));
  function setGen(g,open){g.classList.toggle('closed',!open);g.querySelector('.gen-h').setAttribute('aria-expanded',open)}
  function layout(){
    gens.forEach(function(g,i){setGen(g,!mobile.matches||i===0)});
    [].forEach.call(document.querySelectorAll('.grupo'),function(d,i){d.open=!mobile.matches||i===0});
  }
  gens.forEach(function(g){g.querySelector('.gen-h').addEventListener('click',function(){if(mobile.matches)setGen(g,g.classList.contains('closed'))})});
  function openTarget(){var t=location.hash&&document.getElementById(location.hash.slice(1));if(t&&t.classList.contains('gen'))setGen(t,true)}
  document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#gen-"]');if(a){var g=document.querySelector(a.getAttribute('href'));if(g)setGen(g,true)}});
  addEventListener('hashchange',openTarget);
  (mobile.addEventListener?mobile.addEventListener('change',layout):mobile.addListener(layout));
  layout();openTarget();
  var mb2=document.getElementById('mailBtn'),addr=mb2.dataset.u+'@'+mb2.dataset.d;mb2.href='mailto:'+addr+'?subject='+encodeURIComponent('Archivo familiar Alvarado');document.getElementById('mail').textContent=addr;
  var cb=document.getElementById('copyMail');cb.hidden=false;cb.addEventListener('click',function(){var t=addr;function ok(){cb.textContent='Copiado'}function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('mail'));var g=getSelection();g.removeAllRanges();g.addRange(r)}try{navigator.clipboard.writeText(t).then(ok,sel)}catch(e){sel()}});
})();
