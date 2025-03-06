import { getCssOverride } from "./cssTweaks";
import { 
    createStylesheetText,
    OVERRIDE_CLASSNAME 
} from "./styleChanges";

// insert styles that adjust media query CSS to the reduced page width
export async function insertOverrideRules() {
        // keep in sync with body width set via css
    // ideally, update when page resizes (but that would require regenering the css)
    const conditionScale = window.innerWidth / 800; // 1 / 0.5;

    const cssElems = [...document.getElementsByTagName("link")].filter(
        (elem) =>
            elem.rel === "stylesheet" && elem.className !== OVERRIDE_CLASSNAME
    );

    await Promise.all(
        cssElems.map(async (elem) => {
            const url = elem.href;
            // console.log(url);
            try {
                const overrideCss = await getCssOverride(url, conditionScale);

                createStylesheetText(overrideCss);
                disableStylesheet(elem);
            } catch (err) {
                console.error(`Error patching CSS file ${url}:`, err);
            }
        })
    );
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


