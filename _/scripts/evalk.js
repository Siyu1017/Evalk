function EVALK_META_DATA(name, t) { const metas = document.getElementsByTagName('meta'); for (let i = 0; i < metas.length; i++) { if (metas[i].getAttribute('name') === name) { return t ? metas[i].getAttribute(t) : metas[i].getAttribute('content'); } } return ''; };

var delay = (d) => {
    return new Promise((r) => setTimeout(r, d));
};
async function error(message, time) {
    var error = document.createElement("div");
    error.style = "pointer-events: none;transition: top .2s ease;position: fixed;top: -100vh;width: 100vw;display: flex;align-items: center;justify-content: center; z-index: 99999999";
    error.innerHTML = `<div style="z-index: 999999;padding: 1rem;display: flex;align-items: center;gap: 8px;background: #ff5555;border-radius: 4px;box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, .1);user-select: none;max-width: 80vw;overflow: hidden;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px;height: 24px;min-width: 24px;min-height: 24px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span style="color: #fff;">錯誤 : ${message}</span></div>`;
    document.body.appendChild(error);
    await delay(100);
    error.style.top = "2rem";
    setTimeout(async () => {
        error.style.top = `${Number.parseInt(error.style.top) + 56}px`;
        await delay(300);
        error.style.top = `-${error.scrollHeight + Number.parseInt(error.style.top)}px`;
        await delay(1000);
        error.remove();
    }, time || 5000);
}

window.onload = () => {
    document.getElementById("chat").style = "";
}
