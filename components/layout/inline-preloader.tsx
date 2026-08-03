// Inline preloader — parsed by the browser before any JS executes. Removes
// itself the moment `window.load` fires (or 8s safety timeout). Total payload
// ≈ 1.4KB. No React state, no rAF, no client component. Animation is pure
// CSS keyframes so it renders immediately on first paint.
//
// Lock is on <html> (not <body>) because the root layout already passes
// `suppressHydrationWarning` on <html>, so React won't flag the className
// change the inline script makes before hydration.

const PRELOADER_HTML = `
<div id="zx-pre" aria-hidden="true">
  <div class="zx-pre__logo">
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-12 50 50)">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#c8ff00" stroke-width="3" />
        <path d="M 50 4 L 50 96" fill="none" stroke="#c8ff00" stroke-width="3" />
        <ellipse cx="50" cy="50" rx="22" ry="46" fill="none" stroke="#c8ff00" stroke-width="3" />
        <path d="M 10 26 Q 50 10 90 26" fill="none" stroke="#c8ff00" stroke-width="3" stroke-linecap="round" />
        <path d="M 4 50 Q 50 35 96 50" fill="none" stroke="#c8ff00" stroke-width="3" stroke-linecap="round" />
        <path d="M 10 74 Q 50 60 90 74" fill="none" stroke="#c8ff00" stroke-width="3" stroke-linecap="round" />
      </g>
    </svg>
  </div>
</div>
<style>
  #zx-pre {
    position: fixed; inset: 0; z-index: 99999; background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.6s ease;
  }
  #zx-pre.zx-pre--out {
    opacity: 0; pointer-events: none;
  }
  .zx-pre__logo {
    width: 120px; height: 120px;
    transition: transform 0.5s cubic-bezier(0.8, 0, 0.2, 1), opacity 0.5s ease;
  }
  #zx-pre.zx-pre--out .zx-pre__logo {
    transform: scale(0.1);
    opacity: 0;
  }
  .zx-pre__logo svg {
    animation: morphGlobe 3s infinite cubic-bezier(0.68, -0.2, 0.265, 1.2);
    filter: drop-shadow(0 0 4px rgba(200, 255, 0, 0.4));
  }
  .zx-pre__logo svg path,
  .zx-pre__logo svg circle,
  .zx-pre__logo svg ellipse {
    stroke-dasharray: 400;
    animation: traceLoop 3s infinite ease-in-out;
  }
  @keyframes traceLoop {
    0% { stroke-dashoffset: 400; }
    50% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -400; }
  }
  @keyframes morphGlobe {
    0% { transform: rotate(0deg) scale(0.4, 1); filter: drop-shadow(0 0 2px rgba(200, 255, 0, 0.2)); }
    40% { transform: rotate(180deg) scale(1, 1); filter: drop-shadow(0 0 12px rgba(200, 255, 0, 0.8)); }
    60% { transform: rotate(180deg) scale(1, 1); filter: drop-shadow(0 0 12px rgba(200, 255, 0, 0.8)); }
    100% { transform: rotate(360deg) scale(0.4, 1); filter: drop-shadow(0 0 2px rgba(200, 255, 0, 0.2)); }
  }
  @media (prefers-reduced-motion: reduce) {
    .zx-pre__logo svg path, .zx-pre__logo svg circle, .zx-pre__logo svg ellipse {
      animation: none; stroke-dashoffset: 0;
    }
    .zx-pre__logo svg { animation: none; transform: scale(1, 1); }
  }
  html.zx-locked, html.zx-locked body { overflow: hidden !important; }
</style>
<script>
  (function(){
    document.documentElement.classList.add('zx-locked');
    var minTime = false;
    var loaded = document.readyState === 'complete';
    
    function hide(){
      var el=document.getElementById('zx-pre');
      if(!el) return;
      el.classList.add('zx-pre--out');
      document.documentElement.classList.remove('zx-locked');
      setTimeout(function(){el && el.parentNode && el.parentNode.removeChild(el)},600);
    }
    
    function check(){
      if(minTime && loaded) hide();
    }
    
    setTimeout(function(){ minTime = true; check(); }, 1500);
    
    if(!loaded){
      window.addEventListener('load', function(){
        loaded = true;
        check();
      }, {once:true});
    }
    
    setTimeout(hide, 8000);
  })();
</script>
`;

export function InlinePreloader() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: PRELOADER_HTML }}
    />
  );
}

