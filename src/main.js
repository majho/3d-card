const rootEl = document.documentElement;
const items = document.querySelectorAll('.item');
let winW = window.innerWidth;
let winH = window.innerHeight;
let rect = null;
let tick = null;

function setProps(el, props = {}) {
    Object.entries(props).forEach(([key, value]) => {
        el.style.setProperty(key, value);
    });
}

function onMove(e) {
    cancelAnimationFrame(tick);

    if (rect == null) return;

    tick = requestAnimationFrame(() => {
        if (rect == null) return;

        const item = e.target.closest('.item');
        const dx = (e.clientX - rect.x) / rect.width;
        const dy = (e.clientY - rect.y) / rect.height;

        setProps(item, {
            '--mx': (dx * 2) - 1,
            '--my': (dy * 2) - 1,
        });
    });
}

function onEnter(e) {
    const item = e.target.closest('.item');
    rect = item.getBoundingClientRect();

    const px = (rect.x + (rect.width / 2)) / winW;
    const py = (rect.y + (rect.height / 2)) / winH;

    setProps(rootEl, { '--px': px, '--py': py });
}

function onLeave(e) {
    const item = e.target.closest('.item');
    rect = null;

    setProps(item, { '--mx': 0, '--my': 0 });
}

items.forEach((item) => {
    item.addEventListener('mouseenter', onEnter, { passive: true });
    item.addEventListener('mouseleave', onLeave, { passive: true });
});

document.addEventListener('mousemove', onMove, { passive: true });

window.addEventListener('resize', () => {
    winW = window.innerWidth;
    winH = window.innerHeight;
}, { passive: true });