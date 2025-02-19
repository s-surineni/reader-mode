import { useEffect } from "react"

export const config = {
    matches: ["https://s-surineni.github.io/"],
    all_frames: true
}

const CustomButton = () => {
    useEffect(() => {
        const iframe = document.createElement("iframe")
        iframe.src = chrome.runtime.getURL("/delta-flyer.html")
        iframe.name = "delta-flyer"
        document.body.appendChild(iframe)
    }, [])
    return <div></div>
}

export default CustomButton