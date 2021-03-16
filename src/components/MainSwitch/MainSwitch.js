import ***REMOVED*** Component ***REMOVED*** from 'react';
import Button from '../Button/Button';
import './MainSwitch.scss';

class MainSwitch extends Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***;
  ***REMOVED***
    handleClick() ***REMOVED***
        
  ***REMOVED***
    render() ***REMOVED***
        return (
            <Button className=***REMOVED***`MainSwitch btn--round $***REMOVED***this.props.className***REMOVED***`***REMOVED*** onClick=***REMOVED***() => this.handleClick()***REMOVED*** />
        );
  ***REMOVED***
***REMOVED***

export default MainSwitch;