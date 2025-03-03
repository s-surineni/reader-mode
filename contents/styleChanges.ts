import browser from "webextension-polyfill";
import { insertOverrideRules, removeOverrideRules } from "./mediaQuery";
import { contentBlock, unContentBlock } from "./contentBlock";

export const OVERRIDE_CLASSNAME = "rmode-document-override";

export function patchDocumentStyle() {
    insertPageViewStyle();
    insertOverrideRules();
    contentBlock();
}

export function unPatchDocumentStyle() {
    // this removes most modifications
    document
        .querySelectorAll(`.${OVERRIDE_CLASSNAME}`)
        .forEach((e) => e.remove());

    removeOverrideRules();
    unContentBlock();
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

    createStylesheetLink(
        browser.runtime.getURL("/contents/pageview/content.css")
    );

    // create element of full height of all children, in case body height != content height
    // TODO update this height on page update
    var el = document.createElement("div");
    el.className = `${OVERRIDE_CLASSNAME} rmode-body-background`;
    el.style.height = `${document.body.scrollHeight}px`;
    // const siteBackground = window.getComputedStyle(document.body).background;
    // el.style.background = siteBackground.includes("rgba(0, 0, 0, 0)")
    //     ? "white"
    //     : siteBackground;
    document.body.appendChild(el);
}

export function createStylesheetLink(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}

export function createStylesheetText(text) {
    var style = document.createElement("style");
    style.className = OVERRIDE_CLASSNAME;
    style.type = "text/css";
    style.rel = "stylesheet";
    style.innerHTML = text;
    document.head.appendChild(style);
}