window.trackSiteEvent=function(name,params={}){if(typeof window.gtag==="function")window.gtag("event",name,params);};
document.addEventListener("click",event=>{const link=event.target.closest("[data-event]");if(link)window.trackSiteEvent(link.dataset.event,{link_url:link.href||""});});
(function(){
  const widget=document.getElementById("floating-socials");
  if(!widget)return;
  const heading=widget.querySelector(".social-heading");
  if(!heading)return;
  function toggle(e){
    e.stopPropagation();
    const open=widget.classList.toggle("is-open");
    heading.setAttribute("aria-expanded",open?"true":"false");
  }
  heading.addEventListener("click",toggle);
  heading.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle(e);}});
  document.addEventListener("click",e=>{
    if(!widget.contains(e.target)&&widget.classList.contains("is-open")){
      widget.classList.remove("is-open");
      heading.setAttribute("aria-expanded","false");
    }
  });
})();

