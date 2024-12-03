
export function patchDocumentStyle() {
    insertPageViewStyle();
    // insertOverrideRules();

    // contentBlock();
    // insertShareButton();
}
function insertPageViewStyle() {
    // set start properties for animation immediately
    document.body.style.width = "100%";
    document.body.style.margin = "0";

    // set animation style inline to have ease-out
    // easeOutExpo from easings.net
    document.body.style.transition = `margin-top 0.15s cubic-bezier(0.16, 1, 0.3, 1),
	margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1),
	width 0.3s cubic-bezier(0.16, 1, 0.3, 1)`;

    // createStylesheetLink(
    //     browser.runtime.getURL("/content-script/pageview/content.css")
    // );

    // create element of full height of all children, in case body height != content height
    // TODO update this height on page update
    var el = document.createElement("div");
    // el.className = `${overrideClassname} lindy-body-background`;
    el.style.height = `${document.body.scrollHeight}px`;

    // const siteBackground = window.getComputedStyle(document.body).background;
    // el.style.background = siteBackground.includes("rgba(0, 0, 0, 0)")
    //     ? "white"
    //     : siteBackground;

    document.body.appendChild(el);
}