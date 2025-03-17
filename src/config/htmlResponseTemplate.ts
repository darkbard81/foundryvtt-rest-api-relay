export function returnHtmlTemplate(responseUuid: string, html: string, css: string, gameSystemId: string, darkModeEnabled: boolean, includeInteractiveJS: boolean, activeTabIndex: number, initialScale: number, pending: any): string {
    // Create a complete HTML document with the CSS embedded
    const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🎲</text></svg>">
    <title>Actor Sheet - ${responseUuid}</title>
    
    <!-- Include Font Awesome from CDN (both CSS and font files) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    <style>
    /* Reset some browser defaults */
    * {
    box-sizing: border-box;
    }
    
    /* Base styles for the document */
    body {
    margin: 0;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #191813;
    font-family: "Signika", sans-serif;
    }
    
    /* Center the sheet on the page */
    body {
    display: flex;
    justify-content: center !important;
    align-items: center;
    min-height: 100vh;
    }
    
    /* Responsive sheet container */
    .sheet-container {
    width: 100%;
    max-width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: top center;
    }
    
    /* Foundry window styles to make sheet look natural */
    .app {
    border-radius: 5px;
    box-shadow: 0 0 20px #000;
    width: 100%;
    height: auto;
    max-width: 800px; /* Base size for standard screens */
    min-width: 320px;
    position: relative;
    transition: transform 0.2s ease;
    transform-origin: center;
    ${initialScale ? `transform: scale(${initialScale}) translate(${((1-initialScale)/(2*initialScale))*100}%, ${((1-initialScale)/(2*initialScale))*100}%);` : ''}
    }
    
    ${!initialScale ? `
    /* Responsive scaling for different screen sizes */
    @media (max-width: 900px) {
    .app {
    transform: scale(0.8) translate(12.5%, 12.5%);
    max-width: 95vw;
    }
    }
    
    @media (max-width: 768px) {
    .app {
    transform: scale(0.6) translate(33.33%, 33.33%);
    max-width: 95vw;
    }
    }
    
    @media (max-width: 576px) {
    .app {
    transform: scale(0.4) translate(75%, 75%);
    max-width: 100vw;
    }
    }` : ''}
    
    /* Ensure content within the app scales properly */
    .window-content {
    height: auto !important;
    overflow-y: auto;
    max-height: calc(100vh - 50px);
    }
    
    /* Include captured CSS from Foundry - with asset URLs fixed to use proxy 
    AND override Font Awesome font file references */
    ${css.replace(/url\(['"]?(.*?)['"]?\)/g, (match: string, url: string): string => {
    // Skip data URLs
    if (url.startsWith('data:')) return match;
    
    // Skip CDN URLs
    if (url.startsWith('http')) return match;
    
    // Skip fontawesome webfont references - we'll handle those separately
    if (url.includes('fa-') && (url.endsWith('.woff') || url.endsWith('.woff2') || url.endsWith('.ttf') || url.endsWith('.eot') || url.endsWith('.svg'))) {
    return match; // These will be overridden by our CDN
    }
    
    // Proxy all other assets
    if (url.startsWith('/')) return `url('/proxy-asset${url}?clientId=${pending.clientId}')`;
    return `url('/proxy-asset/${url}?clientId=${pending.clientId}')`;
    })}
    
    /* Fix any specific issues with the extracted sheet */
    img {
    max-width: 100%;
    height: auto;
    }
    
    /* Override any problematic styles */
    .window-app {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    }
    
    /* Fix Font Awesome icons - override any local @font-face declarations */
    @font-face {
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
    font-weight: 900;
    src: url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-solid-900.woff2") format("woff2"),
        url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-solid-900.ttf") format("truetype");
    }
    
    @font-face {
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
    font-weight: 400;
    src: url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-regular-400.woff2") format("woff2"),
        url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-regular-400.ttf") format("truetype");
    }
    
    @font-face {
    font-family: 'Font Awesome 5 Brands';
    font-style: normal;
    font-weight: 400;
    src: url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-brands-400.woff2") format("woff2"),
        url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-brands-400.ttf") format("truetype");
    }
    
    /* Additional support for Font Awesome 6 Pro (which Foundry might be using) */
    .fa, .fas, .fa-solid, .far, .fa-regular, .fal, .fa-light, .fat, .fa-thin, .fad, .fa-duotone, .fab, .fa-brands {
    font-family: 'Font Awesome 5 Free' !important;
    font-weight: 900 !important;
    }
    
    .far, .fa-regular {
    font-weight: 400 !important;
    }
    
    .fab, .fa-brands {
    font-family: 'Font Awesome 5 Brands' !important;
    font-weight: 400 !important;
    }
    
    /* Add web font definitions for common Foundry fonts */
    @font-face {
    font-family: 'Signika';
    src: url('/proxy-asset/fonts/signika/signika-regular.woff2?clientId=${pending.clientId}') format('woff2');
    font-weight: 400;
    font-style: normal;
    }
    
    @font-face {
    font-family: 'Modesto Condensed';
    src: url('/proxy-asset/fonts/modesto-condensed/modesto-condensed-bold.woff2?clientId=${pending.clientId}') format('woff2');
    font-weight: 700;
    font-style: normal;
    }
    
    /* Fix for badges */
    .ac-badge {
    background-image: url("https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/ac-badge.webp") !important;
    }
    
    .cr-badge {
    background-image: url("https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/cr-badge.webp") !important;
    }
    
    .dnd5e2.sheet.actor.npc .sheet-header .legendary .legact .pip.filled {
    background-image: url("https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/legact-active.webp") !important;
    }
    
    .dnd5e2.sheet.actor.npc .sheet-header .legendary .legact .pip.empty {
    background-image: url("https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/legact-inactive.webp") !important;
    }
    
    .dnd5e2.sheet.actor.npc .window-content::before, .dnd5e2.sheet.actor.npc.dnd5e-theme-dark .window-content::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 300px;
    border-radius: 5px 5px 0 0;
    opacity: 0.2;
    background: url("https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/official/banner-npc-dark.webp") no-repeat top center / cover !important;
    -webkit-mask-image: linear-gradient(to bottom, black, transparent);
    mask-image: linear-gradient(to bottom, black, transparent);
    }
    
    .window-content {
    max-height: unset !important;
    }
    
    /* Zoom controls for manual scaling */
    .zoom-controls {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    z-index: 1000;
    }
    
    .zoom-controls button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
    
    .zoom-controls button:hover {
    background: rgba(0, 0, 0, 0.9);
    }
    </style>
    </head>
    <body class="vtt game system-${gameSystemId} ${darkModeEnabled ? ` theme-dark ${gameSystemId}-theme-dark` : ''}">
    <div class="sheet-container">
    ${html.replace(/src="([^"]+)"/g, (match: string, src: string) => {
    if (src.startsWith('data:')) return match;
    if (src.startsWith('http')) return match;
    if (src.startsWith('/')) return `src="/proxy-asset${src}?clientId=${pending.clientId}"`;
    return `src="/proxy-asset/${src}?clientId=${pending.clientId}"`;
    })}
    </div>
    
    ${includeInteractiveJS ? `
    <div class="zoom-controls">
    <button id="zoom-in" title="Zoom In">+</button>
    <button id="zoom-out" title="Zoom Out">-</button>
    <button id="zoom-reset" title="Reset Zoom">↺</button>
    </div>` : ''}
    
    <!-- Add a simple script to fix any remaining icons that might be added dynamically -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
    // Check if Font Awesome is loaded
    const cssLoaded = Array.from(document.styleSheets).some(sheet => 
    sheet.href && sheet.href.includes('font-awesome')
    );
    
    if (!cssLoaded) {
    console.warn('Font Awesome stylesheet not detected, adding fallback');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(link);
    }
    
    // Fix common textures that might be loaded dynamically
    const addImageFallback = (selector, fallbackUrl) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        if (window.getComputedStyle(el).backgroundImage === 'none' || 
        window.getComputedStyle(el).backgroundImage.includes('texture')) {
        el.style.backgroundImage = 'url(' + fallbackUrl + ')';
        }
    });
    };
    
    // Apply fallbacks for commonly used textures
    addImageFallback('.window-content', 'https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/parchment.jpg');
    addImageFallback('.ac-badge', 'https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/ac-badge.svg');
    addImageFallback('.cr-badge', 'https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/cr-badge.svg');
    
    ${includeInteractiveJS ? `
    // Implement sheet scaling functionality
    let currentScale = 1;
    const app = document.querySelector('.app');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const zoomReset = document.getElementById('zoom-reset');
    
    function updateScale() {
        if (app) {
        // Calculate translation percentage based on scale
        // Formula: translate = ((1-scale) / (2*scale)) * 100%
        const translatePct = ((1 - currentScale) / (2 * currentScale)) * 100;
        app.style.transform = \`scale(\${currentScale}) translate(\${translatePct}%, \${translatePct}%)\`;
        }
    }
    
    if (zoomIn) {
    zoomIn.addEventListener('click', () => {
        if (currentScale < 1.5) {
        currentScale += 0.1;
        updateScale();
        }
    });
    }
    
    if (zoomOut) {
    zoomOut.addEventListener('click', () => {
        if (currentScale > 0.5) {
        currentScale -= 0.1;
        updateScale();
        }
    });
    }
    
    if (zoomReset) {
    zoomReset.addEventListener('click', () => {
        currentScale = 1;
        updateScale();
    });
    }
    
    // Implement responsive behavior for window resizing
    function handleResize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Reset scale when resizing to get proper measurements
    app.style.transform = 'scale(1)';
    
    // Get actual dimensions
    const sheetWidth = app.offsetWidth;
    const sheetHeight = app.offsetHeight;
    
    // Calculate max scale that would fit in viewport
    const maxScaleWidth = (viewportWidth * 0.95) / sheetWidth;
    const maxScaleHeight = (viewportHeight * 0.95) / sheetHeight;
    
    // Use the smaller of the two scales to ensure full visibility
    const optimalScale = Math.min(maxScaleWidth, maxScaleHeight, 1);
    
    // Apply only if significantly different than current scale
    if (Math.abs(currentScale - optimalScale) > 0.05) {
        currentScale = optimalScale;
        updateScale();
    }
    }
    
    // Initial sizing and resize event
    window.addEventListener('resize', handleResize);
    handleResize();` : ''}
    });
    ${includeInteractiveJS ? `</script>
    
    <!-- Tab functionality -->
    <script>
    // Tab functionality
    function activateActorSheetTab(tabsElement, tabName) {
    // Get all tab items and tab content elements
    const tabs = tabsElement.querySelectorAll('.item');
    const contents = tabsElement.closest('.sheet').querySelectorAll('.tab');
    
    // Hide all tab content and deactivate tab items
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    // Find the tab item with matching data-tab and activate it
    const activeTab = tabsElement.querySelector(\`.item[data-tab="\${tabName}"]\`);
    if (activeTab) activeTab.classList.add('active');
    
    // Find the tab content with matching data-tab and activate it
    const activeContent = tabsElement.closest('.sheet').querySelector(\`.tab[data-tab="\${tabName}"]\`);
    if (activeContent) activeContent.classList.add('active');
    }
    
    // Set up tab click handlers
    document.addEventListener('DOMContentLoaded', function() {
    // Find all tabs in the sheet
    const tabsElements = document.querySelectorAll('nav.tabs, .tabs');
    
    ${activeTabIndex ? `
    // Activate the specified tab
    tabsElements.forEach(tabsElement => {
        activateActorSheetTab(tabsElement, "${activeTabIndex}");
    });` : `
    // Set up click handlers for tabs and activate first tabs
    tabsElements.forEach(tabsElement => {
        // Add click event listeners to each tab
        const tabItems = tabsElement.querySelectorAll('.item');
        
        tabItems.forEach(tab => {
        tab.addEventListener('click', function(event) {
        event.preventDefault();
        const tabName = this.dataset.tab;
        if (tabName) {
            activateActorSheetTab(tabsElement, tabName);
        }
        });
        });
        
        // Activate the first tab by default if none is active
        if (!tabsElement.querySelector('.item.active')) {
        const firstTab = tabsElement.querySelector('.item');
        if (firstTab) {
            const tabName = firstTab.dataset.tab;
            if (tabName) {
            activateActorSheetTab(tabsElement, tabName);
            }
        }
        }
    });`}
    });
    </script>` : ''}
    </body>
    </html>`;

    return fullHtml;
}