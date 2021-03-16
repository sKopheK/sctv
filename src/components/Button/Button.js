import "./Button.scss";

function Button(props) ***REMOVED***
    const ***REMOVED*** className, children, ...other ***REMOVED*** = props;
    return (
        <button className=***REMOVED***`btn $***REMOVED***className ?? ''***REMOVED***`***REMOVED*** ***REMOVED***...other***REMOVED***>***REMOVED***children***REMOVED***</button>
    );
***REMOVED***;

export default Button;