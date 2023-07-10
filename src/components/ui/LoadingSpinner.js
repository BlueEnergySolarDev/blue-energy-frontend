
export const LoadingSpinner = () => {
    let dots = document.querySelectorAll('.dottt');
    let cx = 36;
    let cy = 36;
    let r = 34;
    dots.forEach((v, i) => {
        let theta = 2 * Math.PI * (i / dots.length);
        let left = cx + r * Math.sin(theta);
        let top = cy - r * Math.cos(theta);
        v.style.top = top.toString() + "px";
        v.style.left = left.toString() + "px";
    })
    return (
        <div className="d-flex justify-content-center align-items-center p-5 center">
            <div className="central-dot"></div>
            <div className="lds-default">
                <div className="dottt"></div>
                <div className="dottt"></div>
                <div className="dottt"></div>
                <div className="dottt"></div>
                <div className="dottt"></div>
                <div className="dottt"></div>
                <div className="dottt"></div>
                <div className="dottt"></div>
                {/* <div></div>
                <div></div>
                <div></div>
                <div></div> */}
            </div>
        </div>
    );
}