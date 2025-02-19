export const config = {
    matches: ["https://s-surineni.github.io/"],
    all_frames: true
}

export default function DeltaFlyerPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16
            }}>
            <h2>Delta Flyer Tab</h2>

            <p>This tab is only available on the Delta Flyer page.</p>
        </div>
    )
}