
// export const getInlineAnchor = () =>
//   document.querySelector(`.pageview`)
// document.querySelector(`.sidebar-div`)

export const getRootContainer = () => document.querySelector(".sidebar-div")
// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoInline = () => {
  return (
    <div
      style={{
        borderRadius: 4,
        padding: 4,
        background: "pink"
      }}>
      Reader Sidebar
    </div>
  )
}

export default PlasmoInline