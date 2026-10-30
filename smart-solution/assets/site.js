(function(){
var h=document.getElementById('header');if(h){var l=0;addEventListener('scroll',function(){var y=scrollY;h.classList.toggle('scrolled',y>60);if(y>l&&y>innerHeight*.9)h.classList.add('hide');else h.classList.remove('hide');l=y},{passive:true})}
var m=document.getElementById('mMenu'),b=document.getElementById('burger'),c=document.getElementById('mClose');
if(m&&b){b.onclick=function(){m.classList.add('open')};if(c)c.onclick=function(){m.classList.remove('open')};m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open')})})}
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.14});
document.querySelectorAll('.reveal-up,.cta-band,.sp-caps').forEach(function(e){io.observe(e)});
document.querySelectorAll('.ft-year').forEach(function(e){e.textContent=new Date().getFullYear()});
var f=document.getElementById('ssForm');
if(f){f.addEventListener('submit',function(ev){ev.preventDefault();var d=new FormData(f),s=f.querySelector('.cf-status');
var t='Hello Smart Solution,\nName: '+(d.get('name')||'')+'\nPhone: '+(d.get('phone')||'')+'\n\n'+(d.get('message')||'');
if(!d.get('name')||!d.get('message')){s.textContent='please add your name and message.';return}
(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).catch(function(){}).then(function(){s.textContent='message copied. paste it in the Telegram chat that just opened.';window.open('https://t.me/smart_solution_et?text='+encodeURIComponent(t),'_blank')})})}
})();