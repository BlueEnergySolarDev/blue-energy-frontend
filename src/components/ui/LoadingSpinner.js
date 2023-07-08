
export const LoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
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
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}