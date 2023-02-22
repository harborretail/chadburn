# Chadburn

Also known as an "engine order telegraph", a chadburn is a device used by a ship's (or submarine's) pilot to communicate orders to engineers in the engine room.

Like using a chadburn to tell the engineers how fast the boat needs to go, this library allows you (the pilot) to communicate with [NetworkManager](https://networkmanager.dev/) and [ModemManager](https://modemmanager.org/) (the engineers) to adjust your network configuration (the engine). The overall structure of this library is just an abstraction on the DBus APIs for both NetworkManager and ModemManager, with a few quality of life features to handle some common use cases all on their own.

## Credits

[networkmanager-dbus](https://www.npmjs.com/package/networkmanager-dbus)

Huge credit goes to Bailey Blankenship at Dropworks and anyone else who contributed to this project, as their work provided an awesome base to branch off from.

## Installation

Using chadburn requires you to fulfill the installation requirements for [node-dbus](https://www.npmjs.com/package/dbus#dependencies), which in short (for linux systems) is `node-gyp`, `libdbus-1-dev`, and `libglib2.0-dev`. Then simply run:
```
npm install chadburn
```
and you should be good to go!

## Docs

More detailed documentation generated from Typedoc can be found at `docs/index.html` within the project repository, or at https://harborretail.github.io/chadburn

Additionally you can take a look at the offiical dbus documentation for [NetworkManager](https://developer-old.gnome.org/NetworkManager/stable/spec.html) and [ModemManager](https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ref-dbus.html) for specifications on the data you're getting out of Chadburn. A lot of the Typedoc documentation replicates the official documentation for these services, but may not reflect the specific version of NetworkManager or ModemManager you have installed on your system.

## Usage

*This current version of chadburn uses a mostly unchanged version of networkmanager-dbus, with support for ModemManager added on. The ModemManager portion has been developed primarily for data retrieval, rather than command and control.*

First thing to note before getting too far into a project with chadburn is that having multiple instances of the dbus system bus causes lots of issues, usually errors. Chadburn maintains static singleton instances of it's manager objects that can be retrieved after their creation, but keep in mind that if you structure your code so that it would force multiple dbus client instances then you're going to run into issues.

Basic example
```javascript
const dbus = require('dbus');
import { NetworkManager, ModemManager } from 'chadburn';

const bus = dbus.getBus('system');
const network_manager = await NetworkManager.init(bus);
const modem_manager = await ModemManager.init(bus);
```

### NetworkManager

```javascript
const dbus = require('dbus');
import { NetworkManager } from 'chadburn';

const bus = dbus.getBus('system');
const network_manager = await NetworkManager.init(bus);

// Retrieve current properties from manager object
console.log(network_manager.properties);
// the properties object will continuously update as state changes, and can also be subscribed to as an RxJS object
network_manager.properties$.subscribe(properties => {
    // filter through properties, listen for changes, etc
});


// Retrieve an array of ethernet devices
let eth_devices = await network_manager.ethernetDevices();
console.log(eth_devices[0]?.properties);

// Retrieve an array of wifi devices
let wifi_devices = await network_manager.wifiDevices();
console.log(wifi_devices[0]?.properties);
```

### ModemManager

```javascript
const dbus = require('dbus');
import { ModemManager } from 'chadburn';

const bus = dbus.getBus('system');
const modem_manager = await ModemManager.init(bus);

// Retrieve current properties from manager object
// the properties object will continuously update as state changes
console.log(modem_manager.properties);

// Its also presented as an RxJS object under the name "properties$"
modem_manager.properties$.subscribe(properties => {
    // filter through properties, listen for changes, etc
});


// Retrieve a map of Modems, organized by dbus object path
/*
{
    '/org/freedesktop/ModemManager1/Modem/0': modem object,
    '/org/freedesktop/ModemManager1/Modem/1': modem object
}
*/
let modems = modem_manager.modems;

// Alternatively, retrieve a modem by its object index
// This gets /org/freedesktop/ModemManager1/Modem/0
let modem0 = modem_manager.getModem(0);
```

## Testing

If you want to run the testing scripts, you'll need to install [python-dbusmock](https://github.com/martinpitt/python-dbusmock) by [Martin Pitt](https://github.com/martinpitt). A template for modemmanager along with a modification to the mockobject.py source file can be found under `test/python-dbusmock` (at time of writing, python-dbusmock strips away the XML delcaration and dbus headers from object introspections, which causes [node-dbus](https://github.com/Shouqun/node-dbus) error out, the modified mockobject.py fixes that).

If you clone python-dbusmock into `test/dbusmock-git/python-dbusmock`, then you can simply run the tests by navigating to the root folder of chadburn, and building the testing container with 

```
docker build -t chadburn-test .
``` 

and then 

```
docker run chadburn-test
```

or you can start up python-dbusmock on your own and kick off the tests with `npm run test`

In order to run the tests this way you'll need ModemManager and NetworkManager to be disabled before starting python-dbusmock, the dbus daemon won't allow the mock service to override a service that's already been registered.
