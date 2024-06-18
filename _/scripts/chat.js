"use strict";

(async function () {
    const EVALK_CODE_MODE = "product";
    const EVALK_THEMES_LIST = ["system", "light", "dark", "evalk-theme-sun", "evalk-theme-cloud", "evalk-theme-candy"];
    const EVALK_PRIVATE_ROOM_CODE = "Privalk"; // ":pri-code-evk";
    const EVALK_SERVER_LIST = {
        'http': ['http://tw01.host.asteroid.tw:25571'],
        'https': ['https://evalk.is-a.dev']
    };
    const EVALK_DEFAULT_SERVER = Object.values(EVALK_SERVER_LIST).includes(location.origin) ? location.origin : location.protocol.indexOf("https") > -1 ? EVALK_SERVER_LIST['https'][0] : EVALK_SERVER_LIST['http'][0];
    var EVALK_SERVER = EVALK_DEFAULT_SERVER; // location.host;
    var EVALK_THEME = localStorage.getItem("evalk.theme") ? EVALK_THEMES_LIST.indexOf(localStorage.getItem("evalk.theme")) > -1 ? localStorage.getItem("evalk.theme") : "system" : "system";
    var EVALK_WINDOW_BLUR = false;
    var UNREAD_MESSAGE_COUNT = 0;
    document.body.className = EVALK_THEME;
    /* For Develop -- Start */
    var DEV_RANDOM_ID = (n, c) => {
        var c =
            c || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            r = "",
            l = c.length;
        for (let i = 0; i < n; i++) {
            r += c.charAt(Math.floor(Math.random() * l));
        }
        return r;
    };
    var EVALK_USER_NAME = "Anonymous User [ " + DEV_RANDOM_ID(8, "abcdefghijklmnopqrstuvwxyz01234567890123456789") + " ]";
    var ROOM_CODE = "dev-code-evk";
    const EVALK_USER_ID = DEV_RANDOM_ID(144);
    const EVALK_LOCAL_ROOMS = [
        {
            name: "Privalk",
            avatar: "./favicon.ico",
            code: EVALK_PRIVATE_ROOM_CODE,
            active: true,
            defaultMessages: [
                {
                    username: "Privalk",
                    id: DEV_RANDOM_ID(96),
                    avatar: "./favicon.ico",
                    time: Date.now(),
                    code: EVALK_PRIVATE_ROOM_CODE,
                    message: encode(
                        `🎉 歡迎來到 Privalk! 🎉\n此 Evalk 只有你能看到，並且這當中的內容完全不會被傳送至伺服器`, EVALK_PRIVATE_ROOM_CODE),
                    bot: true
                }
            ]
        }
    ]
    const EVALK_GLOBAL_ROOMS = [
        {
            name: "Global",
            avatar: "./favicon.ico",
            code: "dev-code-evk",
            active: false,
            defaultMessages: [
                {
                    username: "Evalk",
                    id: DEV_RANDOM_ID(96),
                    avatar: "./favicon.ico",
                    time: Date.now(),
                    code: "dev-code-evk",
                    message: encode(
                        `🎉 歡迎來到 Evalk! 🎉\n💡 你可以於聊天中使用以下的 Markdown 語法
<div style="display: inline-flex;align-items: center;"># Heading1 : <h1 style="margin: 0;">Heading1</h1></div>
<div style="display: inline-flex;align-items: center;">## Heading2 : <h2 style="margin: 0;">Heading2</h2></div>
<div style="display: inline-flex;align-items: center;">### Heading3 : <h3 style="margin: 0;">Heading3</h3></div>
<div style="display: inline-flex;align-items: center;">~~Deleted Text~~ : <s>Deleted Text</s></div>
<div style="display: inline-flex;align-items: center;">_Italic Text_ : <i>Italic Text</i></div>
<div style="display: inline-flex;align-items: center;">**Bold Text** : <b>Bold Text</b></div>
<div style="display: inline-flex;align-items: center;">\`Inline Code\` : <code class="inline">Inline Code</code></div>
<div>\`\`\`Code\`\`\` : <code>Code</code></div>`, "dev-code-evk"),
                    bot: true
                }
            ]
        }
    ]
    var DEFAULT_MESSAGES = [
        /*
        {
            username: "Evalk",
            id: DEV_RANDOM_ID(96),
            avatar: "./favicon.ico",
            time: Date.now(),
            code: "dev-code-evk",
            message: encode(
                `<div>🎉 歡迎來到 Evalk! 🎉</div><div>💡 你可以使用邀請代碼來邀請你的好友</div><div>⬇️ 不過請遵守以下規則</div><div>1️⃣ 不傳送色情、暴力或血腥等訊息</div><div>2️⃣ 不以言語攻擊他人</div><div>3️⃣ 不做出對於伺服器有害之行為</div><div>4️⃣ 不任意散播謠言</div><div>🎉 祝您在 Evalk 有美好的一天~ 🎉</div><div style="text-align: right;">Evalk 團隊敬上</div>`, "dev-code-evk"),
            bot: true
        }
            */
    ];
    /* For Develop -- End */

    var EVALK = {
        roomCode: "dev-code-evk",
        userInfo: {
            id: DEV_RANDOM_ID(144),
            name: "Anonymous User [ " + DEV_RANDOM_ID(8, "abcdefghijklmnopqrstuvwxyz01234567890123456789") + " ]",
            avatar: "./favicon.ico"
        },
        rooms: [
            {
                name: "Evalk",
                avatar: "./favicon.ico",
                code: "dev-code-evk",
                active: true,
                messages: [
                    {
                        username: "Evalk",
                        id: DEV_RANDOM_ID(96),
                        avatar: "./favicon.ico",
                        time: Date.now(),
                        message: encode(
                            `<div>🎉 歡迎來到 Evalk! 🎉</div><div>💡 你可以使用邀請代碼來邀請你的好友</div><div>⬇️ 不過請遵守以下規則</div><div>1️⃣ 不傳送色情、暴力或血腥等訊息</div><div>2️⃣ 不以言語攻擊他人</div><div>3️⃣ 不做出對於伺服器有害之行為</div><div>4️⃣ 不任意散播謠言</div><div>🎉 祝您在 Evalk 有美好的一天~ 🎉</div><div style="text-align: right;">Evalk 團隊敬上</div>`, "dev-code-evk"),
                        bot: true
                    }
                ]
            }
        ],
        status: {
            typing: false
        },
        message: {
            content: '',
            attachments: []
        }
    }

    /**
     *
     * @param {*} s
     * @param {*} a
     * @returns {HTMLElement}
     */

    var $ = (s, a) => {
        return a == true ? document.querySelectorAll(s) : document.querySelector(s);
    };

    var EVALK_MESSAGE_WITH_REPLY = false;
    var EVALK_MESSAGE_REPLY_USER_ID = null;
    var EVALK_MESSAGE_REPLY_CONTENT = null;
    var EVALK_MESSAGE_REPLY_MESSAGE_ID = null;

    function encode(f, j) { f = btoa(escape(f)); var l = ""; for (var c = 0; c < j.length; c++) { l += j.charCodeAt(c).toString() } var g = Math.floor(l.length / 5); var b = parseInt(l.charAt(g) + l.charAt(g * 2) + l.charAt(g * 3) + l.charAt(g * 4) + l.charAt(g * 5)); var a = Math.ceil(j.length / 2); var h = Math.pow(2, 31) - 1; var d = Math.round(Math.random() * 1000000000) % 100000000; l += d; while (l.length > 10) { l = (parseInt(l.substring(0, 10)) + parseInt(l.substring(10, l.length))).toString() } l = (b * l + a) % h; var e = ""; var k = ""; for (c = 0; c < f.length; c++) { e = parseInt(f.charCodeAt(c) ^ Math.floor((l / h) * 255)); if (e < 16) { k += "0" + e.toString(16) } else { k += e.toString(16) } l = (b * l + a) % h } d = d.toString(16); while (d.length < 8) { d = "0" + d } k += d; return k };
    function decode(f, j) { try { var l = ""; for (var c = 0; c < j.length; c++) { l += j.charCodeAt(c).toString() } var g = Math.floor(l.length / 5); var b = parseInt(l.charAt(g) + l.charAt(g * 2) + l.charAt(g * 3) + l.charAt(g * 4) + l.charAt(g * 5)); var a = Math.round(j.length / 2); var h = Math.pow(2, 31) - 1; var d = parseInt(f.substring(f.length - 8, f.length), 16); f = f.substring(0, f.length - 8); l += d; while (l.length > 10) { l = (parseInt(l.substring(0, 10)) + parseInt(l.substring(10, l.length))).toString() } l = (b * l + a) % h; var e = ""; var k = ""; for (c = 0; c < f.length; c += 2) { e = parseInt(parseInt(f.substring(c, c + 2), 16) ^ Math.floor((l / h) * 255)); k += String.fromCharCode(e); l = (b * l + a) % h } return unescape(atob(k)); } catch (e) { return console.warn("Decoding failed.") } };

    window.onblur = () => {
        EVALK_WINDOW_BLUR = true;
    };
    window.onfocus = () => {
        EVALK_WINDOW_BLUR = false;
    };

    $(".message-go-bottom").addEventListener("click", () => {
        $(`[data-room="${ROOM_CODE}"]`).scrollTo({ 'behavior': 'smooth', 'top': $(`[data-room="${ROOM_CODE}"]`).scrollHeight })
    })

    $(".reply-cancel").addEventListener("click", () => {
        $(".reply").classList.remove("active");
        EVALK_MESSAGE_WITH_REPLY = false;
        EVALK_MESSAGE_REPLY_MESSAGE_ID = null;
        EVALK_MESSAGE_REPLY_USER_ID = null;
        EVALK_MESSAGE_REPLY_CONTENT = null;
    })

    var createItem = (data, region = 'web') => {
        var unread = 0;
        var item = document.createElement("div");
        item.className = data.active == true ? "item active" : "item";
        item.innerHTML = `<img class="item-icon" src="${data.avatar}"><div class="item-title">${data.name}</div><div class="item-unread" data-item="${data.code}"></div>`;
        var messages = document.createElement("div");
        messages.className = data.active == true ? "messages active" : "messages";
        messages.setAttribute("data-room", data.code);
        $("#message-box").appendChild(messages);
        messages.addEventListener("scroll", () => {
            if (messages.scrollTop + messages.offsetHeight < messages.scrollHeight - messages.offsetHeight) {
                $(".message-go-bottom").classList.add("active");
            } else {
                $(".message-go-bottom").classList.remove("active");
                $(`[data-item="${data.code}"]`).classList.remove("active");
                UNREAD_MESSAGE_COUNT -= unread;
                unread = 0;
                document.title = UNREAD_MESSAGE_COUNT > 0 ? `(${UNREAD_MESSAGE_COUNT}) EVALK [ ${ROOM_CODE} ]` : `Evalk [ ${ROOM_CODE} ]`;
            }
        });
        function change() {
            ROOM_CODE = data.code;
            $("#room-icon").src = data.avatar;
            $("#room-title").innerText = data.name;
            var event = new CustomEvent("code_change", { detail: ROOM_CODE });
            $(".item.active", true).forEach((a) => {
                a.classList.remove("active");
            });
            $(".messages.active", true).forEach((a) => {
                a.classList.remove("active");
            });
            $(`[data-room="${ROOM_CODE}"]`).classList.add("active");
            $(".message-go-bottom").classList.remove("active");
            item.classList.add("active");
            document.dispatchEvent(event);
            $(`[data-room="${ROOM_CODE}"]`).scrollTop = $(`[data-room="${ROOM_CODE}"]`).scrollHeight;
            UNREAD_MESSAGE_COUNT -= unread;
            $(`[data-item="${data.code}"]`).classList.remove("active");
            unread = 0;
            document.title = UNREAD_MESSAGE_COUNT > 0 ? `(${UNREAD_MESSAGE_COUNT}) EVALK [ ${ROOM_CODE} ]` : `Evalk [ ${ROOM_CODE} ]`;
        }
        if (region == 'web') {
            socket.on(data.code, (data) => {
                if (data.EVALK_USER_ID != EVALK_USER_ID && data.code != ROOM_CODE || $(`[data-room="${data.code}"]`).scrollTop + $(`[data-room="${data.code}"]`).offsetHeight < $(`[data-room="${data.code}"]`).scrollHeight - $(`[data-room="${data.code}"]`).offsetHeight) {
                    unread++;
                    UNREAD_MESSAGE_COUNT++;
                    document.title = `(${UNREAD_MESSAGE_COUNT}) EVALK [ ${ROOM_CODE} ]`;
                }
                if (data.EVALK_USER_ID == EVALK_USER_ID) {
                    return createMessage(data, true, data.id);
                } else {
                    createMessage(data);
                    if ($(`[data-room="${data.code}"]`).classList.contains("active") && EVALK_WINDOW_BLUR == false) {
                        if ($(`[data-room="${data.code}"]`).scrollTop + $(`[data-room="${data.code}"]`).offsetHeight > $(`[data-room="${data.code}"]`).scrollHeight - $(`[data-room="${data.code}"]`).offsetHeight) {
                            $(`[data-room="${data.code}"]`).scrollTo({ 'behavior': 'smooth', 'top': $(`[data-room="${data.code}"]`).scrollHeight });
                            $(`[data-item="${data.code}"]`).classList.remove("active");
                            unread = 0;
                        }
                    }
                    if (unread == 0) {
                        $(`[data-item="${data.code}"]`).classList.remove("active");
                    } else {
                        $(`[data-item="${data.code}"]`).classList.add("active");
                    }
                    $(`[data-item="${data.code}"]`).innerHTML = unread > 9 ? '9+' : unread <= 0 ? "" : unread;
                }
            })
        }

        document.getElementById("items").appendChild(item);

        item.onclick = () => {
            change();
        };
        if (data.active == true) {
            change();
        }
    };
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
    Date.prototype.format = function (fmt) { var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); } for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); } } return fmt; }

    var urlify = function (text, original) {
        var urlRegex = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[^ ])/ig;
        var list = [];
        text.replaceAll(urlRegex, function (url) {
            if (original === true) return list.push(url);
            return '<a href="' + url + '" target="_blank">' + url + "</a>"
        })
        return original == true ? list : text
    };

    var contentFormat = (content, mention) => {
        var urls = urlify(content, true);

        content = content.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

        var replaced_urls = urlify(content, true);
        var replaced_list = [];
        replaced_urls.forEach((url, i) => {
            if (replaced_list.includes(url)) return;
            replaced_list.push(url);
            content = content.replaceAll(url, `<span><a target="_blank" href="${urls[i]}" class="message-link">${url}</a></span>`);
        });
        content = content.replaceAll(/@(\w+)/g, `<span class="message-mention">$&</span>`);

        content = markdownToHTML(content);

        if (mention != false) {
            content = `<span class="message-mention">@${mention}</span> ${content}`;
        }
        return content;
    }

    var createMessage = async (data, mine = false, id) => {
        try {
            if ($(`[evalk-id="${id}"]`) !== null) {
                return $(`[evalk-id="${id}"]`).classList.remove("unloaded")
            }
            var bot = data.bot || false;
            var content = decode(data.message, data.code);
            var avatar = data.avatar;
            var time = new Date(data.time).format("yyyy/MM/dd hh:mm:ss");
            var messageID = data.id;
            var username = data.username;
            var message = document.createElement("div");
            var userID = data.EVALK_USER_ID;
            var replyContent = data.EVALK_MESSAGE_REPLY_CONTENT == null ? "" : data.EVALK_MESSAGE_REPLY_CONTENT;
            var replyUserId = data.EVALK_MESSAGE_REPLY_USER_ID == null ? "" : data.EVALK_MESSAGE_REPLY_USER_ID;
            var replyMessageId = data.EVALK_MESSAGE_REPLY_MESSAGE_ID == null ? "" : data.EVALK_MESSAGE_REPLY_MESSAGE_ID;
            message.className = mine == true ? "message-box me unloaded" : "message-box";
            message.setAttribute("evalk-id", messageID);
            var loading = mine == true ? '<div class="loading"><div class="spinner" role="spinner"><div class="spinner-icon"></div></div></div>' : ' ';
            var origin_content = content;
            content = mine == "default" ? content : contentFormat(content, data.mention);
            var reply_content = data.mention && data.mention != false ? `<div class="message-reply"><div class="message-reply-mask"><div class="message-reply-user">@${data.mention}</div><div class="message-reply-content">${contentFormat(replyContent, false)}</div></div></div>` : "";
            var bot_tag = bot == true ? '<span class="bot-verifier"><span class="bot-verifier-success"><svg width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg>BOT</span></span>' : " ";
            var Uncompleted = true;
            message.innerHTML = `${loading}<div class="message">${Uncompleted == true ? "" : reply_content}<div class="message-operates"><div class="message-operate" data-operate="reply"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="message-operate-icon"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg></div></div><div class="user-avatar"><img src="${avatar}"></div><div class="content"><div class="message-info"><div class="user-name">${username}</div>${bot_tag}<div class="time">${time}</div></div><div class="message-text">${content}</div></div></div>`;
            $(`[data-room="${data.code}"]`).appendChild(message);
            if (message.querySelector(".message-reply")) {
                message.querySelector(".message-reply").addEventListener("click", () => {
                    console.log(replyMessageId);
                    $(`[data-room="${data.code}"]`).querySelectorAll(".message-highlight").forEach(i => {
                        i.classList.remove("message-highlight");
                    });
                    $(`[data-room="${data.code}"]`).querySelector(`[evalk-id="${replyMessageId}"]`).classList.add("message-highlight");
                })
            }
            var reply = message.querySelector('[data-operate="reply"]');
            reply.addEventListener("click", () => {
                EVALK_MESSAGE_WITH_REPLY = username;
                EVALK_MESSAGE_REPLY_USER_ID = userID;
                EVALK_MESSAGE_REPLY_MESSAGE_ID = messageID;
                EVALK_MESSAGE_REPLY_CONTENT = origin_content;
                $("#reply-user").innerHTML = username.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                $(".reply").classList.add("active");
            })
            if ($(`[data-room="${data.code}"]`).classList.contains("active")) {
                if ($(`[data-room="${data.code}"]`).scrollTop + $(`[data-room="${data.code}"]`).offsetHeight < $(`[data-room="${data.code}"]`).scrollHeight - $(`[data-room="${data.code}"]`).offsetHeight) {
                    $(".message-go-bottom").classList.add("active");
                } else {
                    $(".message-go-bottom").classList.remove("active");
                }
            }
        } catch (e) {
            if (EVALK_CODE_MODE == "dev") {
                error("無法建立訊息" + e.message);
            }
        }
    };
    var sendMessage = () => {
        var room = ROOM_CODE;
        var message = $("#input-text").value;
        var EVALK_MESSAGE_ID = DEV_RANDOM_ID(96);
        function clear() {
            $("#input-text").innerHTML = "";
            $(".input-text").style.height = "34px";
        }
        CL("EVALK_MESSAGE_MANAGER", `傳送中...`);
        var bot = message.trim().indexOf("@bot") > -1 ? true : false;
        var mention = false;
        var mention_id = null;
        if (EVALK_MESSAGE_WITH_REPLY != false) {
            mention = EVALK_MESSAGE_WITH_REPLY;
            EVALK_MESSAGE_WITH_REPLY = false;
            $(".reply").classList.remove("active");
        }
        var datas = {
            username: EVALK_USER_NAME,
            id: EVALK_MESSAGE_ID,
            avatar: "./favicon.ico",
            time: Date.now(),
            code: room,
            message: encode(message, room),
            bot: bot,
            mention: mention,
            mention_id: mention_id,
            EVALK_USER_ID: EVALK_USER_ID,
            EVALK_MESSAGE_REPLY_CONTENT: EVALK_MESSAGE_REPLY_CONTENT,
            EVALK_MESSAGE_REPLY_MESSAGE_ID: EVALK_MESSAGE_REPLY_MESSAGE_ID,
            EVALK_MESSAGE_REPLY_USER_ID: EVALK_MESSAGE_REPLY_USER_ID,
        }
        createMessage(datas, true);

        if (room != EVALK_PRIVATE_ROOM_CODE) {
            socket.timeout(10000).emit(room, datas, (err, res) => {
                if (err) {
                    if (EVALK_CODE_MODE == "dev") {
                        error("無法傳送訊息至伺服器", 3000);
                    }
                    $(`[evalk-id="${EVALK_MESSAGE_ID}"]`).classList.remove("unloaded");
                    $(`[evalk-id="${EVALK_MESSAGE_ID}"]`).classList.add("error");
                    CL("EVALK_MESSAGE_MANAGER", `無法傳送訊息`);
                } else {
                    CL("EVALK_MESSAGE_MANAGER", `已傳送`);
                    $(`[evalk-id="${EVALK_MESSAGE_ID}"]`).classList.remove("unloaded");
                }
            });
        } else {
            $(`[evalk-id="${EVALK_MESSAGE_ID}"]`).classList.remove("unloaded");
        }
        clear();
        $("#input-text").value = "";
        $("#input-text").style.height = "34px";
        $(".message-go-bottom").classList.remove("active");
        $(".submit").classList.remove("active");
        $(`[data-room="${room}"]`).scrollTo({ 'behavior': 'smooth', 'top': $(`[data-room="${room}"]`).scrollHeight })
    };

    /*$("#input-text").addEventListener("input", (e) => {
          $(".inputs").style.height = `calc(24px + ${$("#input-text").scrollHeight}px)`;
          $("#input-text").style.height = `calc(${$(".inputs").clientHeight}px - 24px)`;
          //$(".messages").style.maxHeight = `calc(100vh - 50px - ${$(".inputs").offsetHeight}px)`;
      })*/

    $("#input-text").addEventListener("input", async function (e) {
        var scroll = $(".input-mask").scrollTop;
        $("#input-text").style.height = "34px";
        $("#input-text").style.height = `${$("#input-text").scrollHeight}px`;
        $(".input-mask").scrollTop = scroll;
        if (this.value.trim() != "") {
            $(".submit").classList.add("active");
        } else {
            $(".submit").classList.remove("active");
        }
    });

    window.onresize = () => {
        var scroll = $(".input-mask").scrollTop;
        $("#input-text").style.height = "34px";
        $("#input-text").style.height = `${$("#input-text").scrollHeight}px`;
        $(".input-mask").scrollTop = scroll;
        if ($("#input-text").value.length != 0) {
            $(".submit").classList.add("active");
        } else {
            $(".submit").classList.remove("active");
        }
    };

    $(".submit").addEventListener("click", (e) => {
        if ($("#input-text").value.trim() != "") {
            sendMessage();
        }
    })

    var DIV_INPUT_ELEMENT = $("#input-text");

    /**
     * 
     * @param {HTMLElement} input 
     */

    function SET_DIV_INPUT(input) {
        $(".input-text").style.height = "34px";

        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                if (e.shiftKey) {
                    return;
                }
                if (e.target.value.trim() == "") {
                    return e.preventDefault();
                }
                sendMessage();
                e.preventDefault();
            }
        });

        return;
    }

    var EVALK_INPUT = SET_DIV_INPUT(DIV_INPUT_ELEMENT);

    /*$("#input-text").style.height = "34px";
    $("#input-text").style.height = `${$("#input-text").scrollHeight}px`;*/
    if ($("#input-text").value.length != 0) {
        $(".submit").classList.add("active");
    } else {
        $(".submit").classList.remove("active");
    }

    $(".chat-back").addEventListener("click", () => {
        $('.chat').style.display = "none";
        $('.list').style = 'display: flex !important;';
    })

    var Requset = async (e, t, n, o, a, i, s) => {
        try {
            var r = new XMLHttpRequest;
            return r.open(e, t, n),
                1 == Array.isArray(o) && o.forEach((e => {
                    r.setRequestHeader(e[0], e[1])
                }
                )),
                r.send(a),
                i && "[object Function]" === {}.toString.call(i) && (r.onreadystatechange = i(r)),
                s && "[object Function]" === {}.toString.call(s) && (r.onload = () => {
                    s(r)
                }
                ),
                this
        } catch (e) {
            return console.log("An error occurred while executing : ", e)
        }
    }

    $(".setting").addEventListener("click", function () {
        var org = document.body.className;
        var setting = EVALK_MODAL_GENERATOR({
            title: "設定",
            close: {
                show: true,
                callback: function (e) {
                    if (document.body.className != org) {
                        document.body.className = org;
                        EVALK_THEME = org;
                    }
                    setting.close();
                }
            },
            footer: [{
                "title": "關閉",
                "theme": "secondary",
                "callback": function (e) {
                    if (document.body.className != org) {
                        document.body.className = org
                        EVALK_THEME = org;
                    }
                }
            }, {
                "theme": "primary",
                "title": "儲存",
                "callback": function (e) {
                    e.target.classList.add("loading");
                    e.target.innerHTML = '<div class="spinner" role="spinner"><div class="spinner-icon"></div></div>';
                    localStorage.setItem("evalk.theme", EVALK_THEME)
                    NProgress.start();
                    /*
                    if (setting.elements[0].querySelector("#server-address").value != EVALK_SERVER && setting.elements[0].querySelector("#server-address").value.trim() != '') {
                        localStorage.setItem("evalk.server", setting.elements[0].querySelector("#server-address").value);
                        location.reload();
                    }
                    */
                    if (setting.elements[0].querySelector("#dev-mode").checked == true && EVALK_CODE_MODE != "dev") {
                        location.href = `https://dev-${EVALK_SERVER}`;
                    }
                    setTimeout(function () {
                        setting.close();
                        NProgress.done();
                    }, 150 + Math.random() * 350)
                },
                "close": false
            }],
            body: `${EVALK_CELEBRATE_MODE != true ? `<div class="settings-item"><span style="display: flex;align-items: center;">主題<span class="testing">測試版</span></span><div class="select" data-select id="themes" >
            <div class="select-default">請選擇...</div>
            <div class="select-popup">
                <div class="select-group">
                    <div class="select-item" value="system">系統</div>
                    <div class="select-item" value="light">明亮</div>
                    <div class="select-item" value="dark">灰暗</div>
                </div>
                <div class="select-separation">Separation</div>
                <div class="select-group">
                    <div class="select-item" value="evalk-theme-sun">耀眼陽光</div>
                    <div class="select-item" value="evalk-theme-cloud">輕飄雨雲</div>
                    <div class="select-item" value="evalk-theme-candy">棉花糖</div>
                </div>
            </div>
        </div></div>` : ""}<div class="settings-item"><span>測試版</span><label class="switch" ${EVALK_CODE_MODE == "dev" ? "disabled" : " "}>
        <input type="checkbox" id="dev-mode" ${EVALK_CODE_MODE == "dev" ? "checked" : " "}>
        <span class="slider round"></span>
    </label></div>
    <!--div class="settings-item" style="gap: 12px;"><span style="white-space: nowrap;">伺服器</span><input id="server-address" class="evalk-input" value="${EVALK_SERVER}"></div-->`
        })
        setting.then(() => {
            if (setting.elements[0].querySelector(".select-item[value='" + EVALK_THEME + "']")) {
                setting.elements[0].querySelector(".select-item[value='" + EVALK_THEME + "']").classList.add("selected");
                S.install();
            } else {
                S.install();
            }
            setting.elements[0].querySelector("#themes").addEventListener("change", (e) => {
                var theme = e.detail;
                document.body.className = theme;
                EVALK_THEME = theme;
            })
        })
    })

    EVALK_LOCAL_ROOMS.forEach((room) => {
        createItem(room, 'local');
        room.defaultMessages.forEach((message) => {
            createMessage(message, "default");
        })
    })

    var socket;
    var socketCount = 0;

    var EVALK_CONNENT_COUNT = 0;

    function getJsonFromUrl(url) {
        if (!url) url = location.search;
        var query = url.substr(1);
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    if (getJsonFromUrl()['EVALK_USER_NAME']) {
        EVALK_USER_NAME = getJsonFromUrl()['EVALK_USER_NAME'].replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    }

    var serverListHTML = '';

    EVALK_SERVER_LIST[location.protocol.split(":")[0]].forEach(server => {
        serverListHTML += `<div class="${server == EVALK_DEFAULT_SERVER ? "select-item selected" : "select-item"}" value="${server}">${server.split("//")[1]}</div>`;
    })

    var input = EVALK_MODAL_GENERATOR({
        close: { show: "false" },
        title: "使用者設定",
        footer: [{
            "theme": "primary",
            "title": "確定",
            "callback": function (e) {
                if (!getJsonFromUrl()['EVALK_USER_NAME']) {
                    EVALK_USER_NAME = input.elements[0].querySelector("input").value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                }

                socket = io(EVALK_SERVER);

                createMessage({
                    username: "Privalk",
                    id: DEV_RANDOM_ID(96),
                    avatar: "./favicon.ico",
                    time: Date.now(),
                    code: EVALK_PRIVATE_ROOM_CODE,
                    message: encode(`正在連接至伺服器...  ( ${EVALK_SERVER} ) `, EVALK_PRIVATE_ROOM_CODE),
                    mention: false,
                    bot: true
                }, false)

                window.addEventListener("offline", () => {
                    socket.disconnect();
                })

                window.addEventListener("online", () => {
                    location.reload();
                })

                socket.on("disconnect", function () {
                    createMessage({
                        username: "Privalk",
                        id: DEV_RANDOM_ID(96),
                        avatar: "./favicon.ico",
                        time: Date.now(),
                        code: EVALK_PRIVATE_ROOM_CODE,
                        message: encode(`⚠️ 已與伺服器斷開連接`, EVALK_PRIVATE_ROOM_CODE),
                        mention: false,
                        bot: true
                    }, false)
                })

                socket.on("connect", async function () {
                    socketCount++;
                    EVALK_GLOBAL_ROOMS.forEach(room => {
                        socket.emit("join", {
                            code: room.code
                        })
                    })

                    createMessage({
                        username: "Privalk",
                        id: DEV_RANDOM_ID(96),
                        avatar: "./favicon.ico",
                        time: Date.now(),
                        code: EVALK_PRIVATE_ROOM_CODE,
                        message: encode(`✅ 已連接至伺服器`, EVALK_PRIVATE_ROOM_CODE),
                        mention: false,
                        bot: true
                    }, false)

                    if (socketCount == 1) {
                        $("#new").addEventListener("click", () => {
                            NProgress.start();
                            socket.emit("create", {
                                icon: "./favicon.ico"
                            }, (res) => {
                                CL("EVALK_ROOM_MANAGER", `聊天室建立成功`);
                                createItem({
                                    name: res.title,
                                    avatar: res.icon,
                                    code: res.code,
                                    active: true
                                })
                                $("#room-icon").src = res.icon;
                                $("#room-title").innerText = res.title;
                                EVALK_GLOBAL_ROOMS.push({
                                    name: res.title,
                                    avatar: res.icon,
                                    code: res.code,
                                    active: true
                                });
                                NProgress.done();
                            });
                        })

                        EVALK_GLOBAL_ROOMS.forEach(room => {
                            createItem(room);
                            room.defaultMessages.forEach((message) => {
                                createMessage(message, "default");
                            });
                        });
                    }

                    EVALK_CONNENT_COUNT++;

                    if (EVALK_CONNENT_COUNT > 1) return;
                })

                setTimeout(() => {
                    if (socket.connected == false) {
                        console.log(`Warning : Connection timed out.`);
                    }
                }, 5000)
            }
        }],
        body: `<div class="settings-item"><span style="white-space: nowrap;">暱稱</span><input type="text" class="evalk-input" placeholder="請輸入暱稱..." value="${EVALK_USER_NAME}" style="padding: 8px 12px;" ${getJsonFromUrl()['EVALK_USER_NAME'] ? "disabled" : ""}></div><div class="settings-item"><span>伺服器</span><div class="select server-select" data-select id="server-list">
            <div class="select-default">請選擇...</div>
            <div class="select-popup">
                <div class="select-group">
                    ${serverListHTML}
                </div>
            </div>
        </div></div>`
    })

    input.then(() => {
        S.install();

        input.elements[0].querySelector("#server-list").addEventListener("change", (e) => {
            EVALK_SERVER = e.detail;
        })

        input.elements[0].querySelector("input").addEventListener("input", (e) => {
            if (e.target.value.length == 0) {
                input.elements[1][0].classList.add("disabled")
                return;
            } else {
                input.elements[1][0].classList.remove("disabled")
            }
        })
        input.elements[0].querySelector("input").addEventListener("keydown", (e) => {
            if (e.key == "Enter" && e.target.value.length != 0) {
                if (!getJsonFromUrl()['EVALK_USER_NAME']) {
                    EVALK_USER_NAME = input.elements[0].querySelector("input").value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                }
                input.close();
            }
        })
        input.elements[0].querySelector("input").focus();
        input.elements[0].querySelector("input").select();
    })

    function CL(name, message) {
        if (EVALK_CODE_MODE === "dev") {
            console.log(`%c[${name}]`, "color: purple;", message);
        }
    }

    /**
     * Observers
     */
    document.addEventListener("code_change", (e) => {
        CL("EVALK_ROOM_MANAGER", "ROOM Code Change to " + e.detail);
    });

    if (EVALK_CODE_MODE == "dev") {
        window.createMessage = createMessage;
    }

    NProgress.done();
    if ($("#loading")) {
        await delay(500);
        $("#loading").style.opacity = "0";
        await delay(1000);
        $("#loading").remove();
    }
})();