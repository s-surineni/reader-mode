import { getCssOverride } from "./cssTweaks";
import { 
    createStylesheetText,
    OVERRIDE_CLASSNAME 
} from "./styleChanges";

// insert styles that adjust media query CSS to the reduced page width
export function insertOverrideRules() {
    const cssElems = [...document.getElementsByTagName("link")].filter(
        (elem) =>
            elem.rel === "stylesheet" && elem.className !== OVERRIDE_CLASSNAME
    );

    cssElems.forEach(async (elem) => {
        const url = elem.href;
        // console.log(url);
        try {
            const overrideCss = await getCssOverride(url, 1 / 0.5);

            createStylesheetText(overrideCss);
            disableStylesheet(elem);
        } catch (err) {
            console.error(`Error patching CSS file ${url}:`, err);
        }
    });
}
export function removeOverrideRules() {
    reenableOriginalStylesheets();
}

const disabledClassname = "lindylearn-disabled-style";
function disableStylesheet(elem) {
    elem.disabled = true;
    elem.classList.add(disabledClassname);
}

function reenableOriginalStylesheets() {
    [...document.getElementsByClassName(disabledClassname)].map((elem) => {
        elem.classList.remove(disabledClassname);
        elem.disabled = false;
    });
}


