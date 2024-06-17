const EVALK_CELEBRATE_MODE = false;  // false;

function IMPORT_ASSETS(base, path, file_list, file_format, file_type, defer) {
	file_list.split(",").forEach(file => {
		try {
			var tag = document.createElement(file_type == "js" ? "script" : "link");
			if (file_type == "js") {
				if (defer == "defer") {
					tag.defer = "defer";
				}
				tag.src = base + path + file + file_format.replaceAll("*", "") + file_type;
			} else {
				tag.rel = "stylesheet";
				tag.type = 'text/css';
				tag.href = base + path + file + file_format.replaceAll("*", "") + file_type;
			}
			document.head.appendChild(tag);
		} catch (e) {
			error("載入 " + base + path + file + file_format.replaceAll("*", "") + file_type + " 失敗", 3000)
		}
	});
}
const EVALK_IMPORT_THEMES_LIST = ["sun", "cloud", "candy"];
const EVALK_THEMES_LIST = ["system", "light", "dark", "evalk-theme-sun", "evalk-theme-cloud", "evalk-theme-candy"];
IMPORT_ASSETS("./_/", "styles/themes/", EVALK_IMPORT_THEMES_LIST.join(","), "*.*", "css", "");
var EVALK_THEME = EVALK_CELEBRATE_MODE == true ? "dark" : localStorage.getItem("evalk.theme") ? EVALK_THEMES_LIST.indexOf(localStorage.getItem("evalk.theme")) > -1 ? localStorage.getItem("evalk.theme") : "system" : "system";
if (EVALK_CELEBRATE_MODE == true) {
	IMPORT_ASSETS("./_/", "scripts/", "celebrate", "*.*", "js", false);
	IMPORT_ASSETS("./_/", "styles/", "celebrate", "*.*", "css", false);
}
document.body.className = EVALK_THEME;