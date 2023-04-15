export default function PageTitle({ children }) {
    return (
      <h1 className="m-0">
        {children}
        <span class="blink-prompt">
            <svg width="0.9ch" height="1.1em" style={{display: "inline-flex", marginLeft: "2px", verticalAlign: "sub"}}>
                <rect width="0.9ch" height="1.1em" fill="currentColor" stroke="currentColor" strokeWidth={2}/>
            </svg>
        </span>
    </h1>
    )
};