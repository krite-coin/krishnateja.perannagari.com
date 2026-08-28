window.trackSiteEvent=function(name,params={}){if(typeof window.gtag==="function")window.gtag("event",name,params);};
document.addEventListener("click",event=>{const link=event.target.closest("[data-event]");if(link)window.trackSiteEvent(link.dataset.event,{link_url:link.href||""});});
