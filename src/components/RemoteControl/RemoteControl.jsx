import React from 'react';
import Button from '../Button/Button';
import MainSwitch from '../MainSwitch/MainSwitch';
import SoundToggle from '../SoundToggle/SoundToggle';
import './grid.scss';
import './RemoteControl.scss';

function RemoteControl() ***REMOVED***
  return (
    <div className="RemoteControl">
      <div className="content logo grid">
        <MainSwitch className="grid-to" />
        <SoundToggle className="grid-so" />
        <Button className="grid-n1 highlighted">1</Button>
        <Button className="grid-n2 highlighted">2</Button>
        <Button className="grid-n3 highlighted">3</Button>
        <Button className="grid-n4 highlighted">4</Button>
        <Button className="grid-n5 highlighted">5</Button>
        <Button className="grid-n6 highlighted">6</Button>
        <Button className="grid-n7 highlighted">7</Button>
        <Button className="grid-n8 highlighted">8</Button>
        <Button className="grid-n9 highlighted">9</Button>
        <Button className="grid-n0 highlighted">0</Button>
        <Button className="grid-m">Menu</Button>
        <Button className="grid-ex">Exit</Button>
        <Button className="grid-up btn-arrow btn-arrow--up" />
        <Button className="grid-lt btn-arrow btn-arrow--lt" />
        <Button className="grid-rt btn-arrow btn-arrow--rt" />
        <Button className="grid-dn btn-arrow btn-arrow--dn" />
        <Button className="grid-ok grid--h-center btn--round btn--round-big">OK</Button>
      </div>
    </div>
  );
***REMOVED***

export default RemoteControl;
