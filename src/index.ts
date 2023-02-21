/**
 * ModemManager:
 * 
 * Up to date documentation found here: https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ref-dbus.html
 * 
 * Enumeration values and descriptions copied from: https://www.freedesktop.org/software/ModemManager/api/1.0.0/ref-dbus.html
 * 
 * Netmon's core functionality is to act as a way to abstract having to deal with DBus. While Netmon should be backwards compatible with old versions of ModemManager, 
 * certain methods, properties, or even whole objects may be missing with older ModemManager versions. Netmon and this documentation was written around ModemManager 
 * version 1.20.0. Check your version of ModemManager and reference the official documentation for that version. 
 * At time of writing the official ModemManager documentation notes when methods, objects, and properties were added/deprecated.
 */

import { NetworkManager } from './network-manager/network-manager';
import { WifiDevice } from './network-manager/wifi-device';
import { EthernetDevice } from './network-manager/ethernet-device';
import { ConnectionSettingsManager } from './network-manager/connection-settings-manager';
import * as NetworkManagerTypes from './network-manager/netman-dbus-types';
import { ModemManager } from './modem-manager/modem-manager';
import { Modem } from './modem-manager/modem';
import { Modem3gpp } from './modem-manager/modem3gpp';
import { Sim } from './modem-manager/sim';
import { Bearer } from './modem-manager/bearer';
import * as ModemManagerTypes from './modem-manager/modman-dbus-types';

export {
    NetworkManager,
    WifiDevice,
    EthernetDevice,
    ConnectionSettingsManager,
    ModemManager,
    Modem,
    Modem3gpp,
    Sim,
    Bearer,
    NetworkManagerTypes,
    ModemManagerTypes
}