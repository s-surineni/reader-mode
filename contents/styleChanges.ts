import browser from "webextension-polyfill";
import { removeOverrideRules } from "./patchStylesheets";
import { contentBlock, unContentBlock } from "./contentBlock";

const RMODE_BACKGROUND_CLASS = "rmode-body-background";

export const OVERRIDE_CLASSNAME = "rmode-document-override";

export function patchDocumentStyle() {
    insertBackground();
    insertPageViewStyle();
    // insertOverrideRules();
    contentBlock();
}

export async function unPatchDocumentStyle() {
    removeOverrideRules();
    await new Promise((resolve, _) => setTimeout(resolve, 0));
    // this removes most modifications
    document
        .querySelectorAll(`.${OVERRIDE_CLASSNAME}`)
        .forEach((e) => e.remove());


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

    // add miniscule top padding if not already present, to prevent top margin collapse
    document.body.style.paddingTop = ["", "0px"].includes(
        document.body.style.paddingTop
    )
        ? "0.05px"
        : document.body.style.paddingTop;
    createStylesheetLink(
        browser.runtime.getURL("/contents/pageview/content.css")
    );
}

function insertBackground() {
    // create element of full height of all children, in case body height != content height
    var background = document.createElement("div");
    background.id = RMODE_BACKGROUND_CLASS;
    background.className = `${OVERRIDE_CLASSNAME} ${RMODE_BACKGROUND_CLASS}`;

    // const siteBackground = window.getComputedStyle(document.body).background;
    // background.style.background = siteBackground.includes("rgba(0, 0, 0, 0)")
    //     ? "white"
    //     : siteBackground;
    document.body.appendChild(background);

    // update height after style fixes are done
    // TODO use MutationObserver or setTimeout(, 0) after style changes inserted?
    setTimeout(updateBackgroundHeight, 3000);
}

function updateBackgroundHeight() {
    // get height of body children to exclude background element itself
    // TODO exclude absolute positioned elements?
    const childHeights = [...document.body.children]
        .filter((node) => node.id !== RMODE_BACKGROUND_CLASS)
        .map((node) => node.scrollHeight);

    const bodyHeigth = childHeights.reduce((sum, height) => sum + height, 0);

    const background = document.getElementById(RMODE_BACKGROUND_CLASS);
    background.style.height = `${bodyHeigth}px`;
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
    style.innerHTML = text;
    document.head.appendChild(style);
}