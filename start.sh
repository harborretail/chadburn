#!/bin/bash

dbus-uuidgen > /var/lib/dbus/machine-id
mkdir -p /var/run/dbus
dbus-daemon --config-file=/usr/share/dbus-1/system.conf --print-address

cd /usr/src/dbus-test/python-dbusmock

# { python3 -m dbusmock --template networkmanager; python3 -m dbusmock --template modemmanager; }
python3 -m dbusmock --template modemmanager &
sleep 3
npm run test