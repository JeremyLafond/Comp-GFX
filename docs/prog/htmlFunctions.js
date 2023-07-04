/**
 * Updates the text within an HTML element.
 *
 * @param {String} text String being sent to HTML element.
 * @param {String} htmlID The ID of an html element.
 * Jeremy Lafond
 */
function sendTextToHTML(text, htmlID)
{
	htmlID.innerHTML = text;
}