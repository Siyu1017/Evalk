function command(content) {
    var commands = {
        "send": (value) => {
            var parts = value.split(" ");
            var role = parts[0];
            var target = parts[1];
            var content = parts[2];
        },
        "summon": (value) => {

        }
    }

    return content;
}