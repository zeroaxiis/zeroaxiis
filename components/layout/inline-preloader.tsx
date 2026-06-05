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
  <div class="zx-pre__stage">
    <div class="zx-pre__ring">
      <svg viewBox="0 0 100 100" width="120" height="120" aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(245,241,232,0.08)" stroke-width="2"/>
        <circle cx="50" cy="50" r="44" fill="none" stroke="#c8ff00" stroke-width="2" stroke-linecap="round" stroke-dasharray="60 240" />
      </svg>
    </div>
    <div class="zx-pre__bar"><span></span></div>
    <p class="zx-pre__label">Loading</p>
  </div>
</div>
<style>
  #zx-pre{position:fixed;inset:0;z-index:99999;background:#0a0a0a;display:flex;align-items:center;justify-content:center;transition:opacity .45s ease}
  #zx-pre.zx-pre--out{opacity:0;pointer-events:none}
  .zx-pre__stage{display:flex;flex-direction:column;align-items:center;gap:28px}
  .zx-pre__ring svg{animation:zxSpin 1.05s linear infinite}
  .zx-pre__bar{position:relative;width:clamp(180px,22vw,280px);height:2px;background:rgba(245,241,232,0.08);overflow:hidden}
  .zx-pre__bar span{position:absolute;inset:0;background:#c8ff00;transform-origin:left;animation:zxSlide 1.4s cubic-bezier(.4,0,.2,1) infinite;box-shadow:0 0 12px rgba(200,255,0,0.55)}
  .zx-pre__label{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(245,241,232,0.5);margin:0}
  @keyframes zxSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes zxSlide{0%{transform:translateX(-100%) scaleX(.5)}50%{transform:translateX(0) scaleX(.85)}100%{transform:translateX(100%) scaleX(.5)}}
  @media (prefers-reduced-motion:reduce){.zx-pre__ring svg,.zx-pre__bar span{animation:none}}
  html.zx-locked,html.zx-locked body{overflow:hidden!important}
</style>
<script>
  (function(){
    document.documentElement.classList.add('zx-locked');
    function done(){
      var el=document.getElementById('zx-pre');
      if(!el) return;
      el.classList.add('zx-pre--out');
      document.documentElement.classList.remove('zx-locked');
      setTimeout(function(){el && el.parentNode && el.parentNode.removeChild(el)},480);
    }
    if(document.readyState==='complete'){done();return}
    window.addEventListener('load',done,{once:true});
    setTimeout(done,8000);
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
