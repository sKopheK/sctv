import ***REMOVED*** Component ***REMOVED*** from "react";
import Button from "../Button/Button";
import "./SoundToggle.scss";

class SoundToggle extends Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***;
  ***REMOVED***
    render() ***REMOVED***
        return (
            <Button className=***REMOVED***`ico-sound $***REMOVED***this.props.className***REMOVED***`***REMOVED***>
                <span className="ico-cross"></span>
            </Button>
        );
  ***REMOVED***
***REMOVED***

export default SoundToggle;