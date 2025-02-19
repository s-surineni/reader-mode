import { useEffect } from "react"

export const config = {
    matches: ["<all_urls>"],
    all_frames: true
}

const CustomButton = () => {
    useEffect(() => {
        const iframe = document.createElement("iframe")
        iframe.src = "<div>Hello</div>"
        iframe.name = "delta-flyer"
        document.body.appendChild(iframe)
    }, [])
    return <button>Custom button2222222</button>
}

export default CustomButton