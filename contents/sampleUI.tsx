import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

const CustomButton = () => {
  return <button>Custom button</button>
}

export default CustomButton