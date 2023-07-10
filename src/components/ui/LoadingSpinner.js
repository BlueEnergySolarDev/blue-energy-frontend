
export const LoadingSpinner = () => {
    //THIS IS USED FOR CALCULATE THE SIZES
    // let dots = document.querySelectorAll('.dottt');
    // let cx = 36;
    // let cy = 36;
    // let r = 34;
    // dots.forEach((v, i) => {
    //     let theta = 2 * Math.PI * (i / dots.length);
    //     let left = cx + r * Math.sin(theta);
    //     let top = cy - r * Math.cos(theta);
    //     v.style.top = top.toString() + "px";
    //     v.style.left = left.toString() + "px";
    //     console.log( top, left)
    // })
    return (
        <div className="d-flex justify-content-center align-items-center p-5 center">
            <div className="central-dot"></div>
            <div className="lds-default">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}