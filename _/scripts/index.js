var $ = (s, a) => {
    return a == true ? document.querySelectorAll(s) : document.querySelector(s);
};

var values = [];
var curr = 0;;

for (let i = 0; i < 10; i++) {
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input";
    input.maxLength = "1";
    $("#inputs").appendChild(input);
    input.addEventListener("focus", (e) => {
        var index = Index(e.target);
        console.log(index)
        var valid = true;
        for (let j = 0; j < index; j++) {
            if (values[j]) {
                if (values[j].length != 1) {
                     valid = false;
                }
            } else {
                valid = false;
            }
        }
        if (valid == false) {
            $("#inputs").querySelector(`:nth-child(${curr})`).focus();
        }
        curr = Index(e.target);
    })
    input.addEventListener("input", (e) => {
        if (e.target.value.length == 1) {
            values[Index(e.target)] = e.target.value;
            curr = Index(e.target);
            $("#inputs").querySelector(`input:nth-child(${Index(e.target) + 1})`).focus();
        }
    })
}

function Index(element) {
    var index = 0;
    var children = [].slice.call(element.parentNode.children);
    children.forEach((node, i) => {
        if (node == element) {
            index = i;
        }
    })
    return index;
}

 /*$("#code").addEventListener("input", () => {
    $("#code").value = $("#code").value.replace(/[^a-zA-Z]/g,'');
    if ($("#code").replaceAll("-").value.length > 10) {
        $("#code").value = $("#code").value.slice(0, 10);
    }
    var value = $("#code").value;
})*/