(function () {
    const EVALK_MODAL_VERSION = "1.0.0";
    var delay = (d) => {
        return new Promise((r) => setTimeout(r, d));
    };
    const EVALK_MODAL_DEFAULT_SETTINGS = {
        title: "Settings",
        close: {
            show: true
        },
        body: "Settings",
        footer: [{
            "theme": "primary",
            "title": "Close"
        },
        {
            "theme": "primary",
            "title": "Save"
        }]
    }
    function EVALK_MODULES_ELEMENT(tag, attrs) {
        var element = document.createElement(tag);
        Object.keys(attrs).forEach((attr, i) => {
            element.setAttribute(attr, Object.values(attrs)[i]);
        })
        return element;
    }
    function EVALK_MODAL_GENERATOR(data = {}) {
        var modal_mask = EVALK_MODULES_ELEMENT("div", { "class": "evalk-modal-mask", "style": "opacity: 0;" });
        var modal = EVALK_MODULES_ELEMENT("div", { "class": "evalk-modal", "style": "scale: 1.5;" });
        var title = EVALK_MODULES_ELEMENT("div", { "class": "evalk-modal-title" });
        var body = EVALK_MODULES_ELEMENT("div", { "class": "evalk-modal-body" });
        var footer = EVALK_MODULES_ELEMENT("div", { "class": "evalk-modal-footer" });
        var contents = {
            title: data.title || EVALK_MODAL_DEFAULT_SETTINGS.title,
            close: data.close || EVALK_MODAL_DEFAULT_SETTINGS.close,
            body: data.body || EVALK_MODAL_DEFAULT_SETTINGS.body,
            footer: data.footer || EVALK_MODAL_DEFAULT_SETTINGS.footer
        }
        var title_content = EVALK_MODULES_ELEMENT("div", { "class": "evalk-modal-title-content" });
        title_content.innerText = contents.title;
        title.appendChild(title_content);
        async function close() {
            modal_mask.style.opacity = "0";
            modal.style.scale = "1.5";
            await delay(100);
            modal_mask.remove();
        }
        if (contents.close.show == true) {
            title_content.style.maxWidth = "calc(100% - 36px)"
            var close_element = EVALK_MODULES_ELEMENT("div", { "class": "evalk-modal-close" });
            close_element.addEventListener("click", (e) => {
                if (contents.close.callback) {
                    contents.close.callback();
                } else {
                    close()
                }          
            })
            title.appendChild(close_element);
        }
        var btns = [];
        contents.footer.forEach(item => {
            var btn = EVALK_MODULES_ELEMENT("div", { "class": `btn btn-${item.theme}`, "style": item.style });
            btn.innerText = item.title;
            btn.addEventListener("click", function (e) {
                if (item.close != false) {
                    close();
                }
                if (item.callback) {
                    item.callback(e);
                }
            })
            footer.appendChild(btn);
            btns.push(btn);
        })
        body.innerHTML = contents.body;
        document.body.appendChild(modal_mask);
        modal_mask.appendChild(modal);
        modal.appendChild(title);
        modal.appendChild(body);
        modal.appendChild(footer);
        (async function () {
            await delay(100);
            modal_mask.style.opacity = "1";
            modal.style.scale = "1";
        })()
        return {
            close: close,
            elements: [body, btns],
            then: function (fn) { try { fn(); } catch (e) { return false; } }
        }
    }

    window.EVALK_MODAL_GENERATOR = EVALK_MODAL_GENERATOR;
    window.EVALK_MODAL_VERSION = EVALK_MODAL_VERSION;
})();