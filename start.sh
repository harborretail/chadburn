#!/bin/bash

dbus-uuidgen > /var/lib/dbus/machine-id
mkdir -p /var/run/dbus
dbus-daemon --config-file=/usr/share/dbus-1/system.conf --print-address

cd /usr/src/chadburn-test/python-dbusmock

python3 -m dbusmock --template modemmanager > /dev/null &
sleep 1
python3 -m dbusmock --template networkmanager > /dev/null &
sleep 1

cd /usr/src/chadburn-test
npm run test