function markdownToHTML(markdown) {
	const headingRegex = /^#{1,6} (.*)$/gm;
	const boldRegex = /\*\*([^*]+)\*\*/g;
	const italicRegex = /\_([^\_]+)\_/g;
	const deleteRegex = /~~([^~~]+)~~/g;
	const codeRegex = /```([^```]+)```/g;
	const inlineCodeRegex = /`([^`]+)`/g;
	const linkRegex = /\[([^\]]+)]\(([^)]+)\)/g;
	const imageRegex = /!\[([^\]]+)]\(([^)]+)\)/g;
	const blockquoteRegex = /^> (.*)$/gm;
	const listRegex = /^(\s*?)([-+*]) (.*)$/gm;

	// Function to replace matched elements with HTML tags
	function replaceElement(match, p1, p2, offset, string) {
		console.log(match, p1, p2)
		switch (match) {
			case "**":
				return `<strong>${p1}</strong>`;
			case "_":
				return `<em>${p1}</em>`;
			case "`":
				return `<code>${p1}</code>`;
			default:
				return match;
		}
	}

	var html = markdown;

	// Replace headings
	html = html.replace(headingRegex, function(match, p1) {
		console.log(p1)
		const level = match.trim().split(" ")[0].length;
		if (level > 3 || level < 1) {
			return match;
		}
		return `<h${level}>${p1}</h${level}>`;
	});

	// Replace links
	html = html.replace(linkRegex, function(match, p1, p2) {
		return `<a href="${p2}">${p1}</a>`;
	});

	html = html.replace(deleteRegex, (match, p1) => {
		return `<s>${p1}</s>`;
	})

	html = html.replace(italicRegex, (match, p1) => {
		return `<i>${p1}</i>`;
	})

	html = html.replace(boldRegex, (match, p1) => {
		return `<b>${p1}</b>`;
	})

	html = html.replace(codeRegex, (match, p1) => {
		return `<code>${p1}</code>`;
	})

	html = html.replace(inlineCodeRegex, (match, p1) => {
        return `<code class="inline">${p1}</code>`;
    })

	return html;
}