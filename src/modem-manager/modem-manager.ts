/*
BASH at command example
#!/bin/sh

# Sends command 'ATI' to modem #3
# Get a list of modems by running `mmcli -L`
# Timeout is (probably) 2 seconds
# Also see https://www.freedesktop.org/software/ModemManager/api/latest/gdbus-org.freedesktop.ModemManager1.Modem.html#gdbus-method-org-freedesktop-ModemManager1-Modem.Command
dbus-send --system --dest=org.freedesktop.ModemManager1 --print-reply /org/freedesktop/ModemManager1/Modem/3 org.freedesktop.ModemManager1.Modem.Command string:'ATI' uint32:2000

*/
import DBus = require("dbus");
import { Modem } from "./modem";
import { BehaviorSubject, Observable } from "rxjs";
import { ModemProperties, SimProperties, BearerProperties } from "./modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal } from "../util";

export class ModemManager {

    private static _modemManagerSingleton: ModemManager;

    private static _bus: DBus.DBusConnection;

    private _modemManagerInterface: DBus.DBusInterface;

    private _modems: Map<string, Modem>;

    private constructor(
        modemManagerInterface: DBus.DBusInterface,
        modems: Map<string, Modem>
    ) {
        this._modemManagerInterface = modemManagerInterface;
        this._modems = modems;
    }

    /**
     * Initializes a new ModemManager instance
     * The ModemManager is a singleton, so calling this twice will return the same object
     * @returns Promise of a Modem instance
     */
     public static async init(bus?: DBus.DBusConnection): Promise<ModemManager> {
        // If the singleton exists, return it and exit
        if(ModemManager._modemManagerSingleton) {
            return Promise.resolve(ModemManager._modemManagerSingleton);
        }

        return new Promise<ModemManager>(async (resolve, reject) => {
            if(bus) {
                try {
                    ModemManager._bus = bus;
                    let modemManagerInterface = await objectInterface(ModemManager._bus, 'org.freedesktop.ModemManager1', '/org/freedesktop/ModemManager1', 'org.freedesktop.DBus.ObjectManager');

                    let modemManagerModems: any = await call(modemManagerInterface, "GetManagedObjects", {});

                    let modems: Map<string, Modem> = new Map();
                    for(let m of Object.keys(modemManagerModems)) {
                        let modem = await Modem.init(ModemManager._bus, m);
                        modems.set(m, modem);
                    }

                    let modemManager = new ModemManager(
                        modemManagerInterface, 
                        modems
                    );

                    ModemManager._modemManagerSingleton = modemManager;

                    resolve(modemManager);
                } catch(err) {
                    reject(`Error initializing modem manager: ${err}`);
                }
            } else {
                reject('Error initializing modem manager: no bus provided');
            }
        });
    }

    public get modems() {
        return this._modems;
    }

    /**
     * 
     * @param index A Modem ID number (should start at 0 and count up with the number of modems connected)
     * @returns The Modem located at /org/freedesktop/ModemManager1/Modem/`index`
     */
    public getModem(index: number): Modem | null {
        if(Number.isInteger(index) && index >= 0) {
            return this._modems.get(`/org/freedesktop/ModemManager1/Modem/${index}`) || null;
        } else {
            return null;
        }
    }

    public async getModemProperties() {
        let props: any = {};
        for(let mod of this._modems) {
            props[mod[0]] = mod[1].properties;
        }
        return props;
    }

    public async getModemPrettyProperties() {
        let props: any = {};
        for(let mod of this._modems) {
            props[mod[0]] = mod[1].prettyProperties;
        }
        return props;
    }

    public async getModem3gppProperties() {
        let props: any = {};
        for(let mod of this._modems) {
            let modem3gpp;
            try {
                modem3gpp = await mod[1].getModem3gpp();
            } catch(e) {
                // do nothing
            }
            props[mod[0]] = modem3gpp?.properties || null;
        }
        return props;
    }

    public async getSimProperties() {
        let props: any = {};
        for(let mod of this._modems) {
            props[mod[0]] = mod[1].sim?.properties || null;
        }
        return props;
    }

    public async scan() {
        //scan for new modems, update this._modems accordingly
    }

    public close() {
        for(let mod of this._modems.keys()) {
            this._modems.get(mod)?.close();
        }
    }
}