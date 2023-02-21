import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    SimProperties,
    ModemAccessTechnology
 } from "./modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal, int32ToEnumArray } from "../util";

export class Sim {
    private _bus: DBus.DBusConnection;
    private _simInterface: DBus.DBusInterface;
    private _propertiesInterface: DBus.DBusInterface;
    private _properties: SimProperties;
    private _propertiesSubject: BehaviorSubject<SimProperties>;

    /** Continuously updated Modem properties */
    public properties$: Observable<SimProperties>;

    private constructor(
        bus: DBus.DBusConnection,
        simInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any
    ) {
        this._bus = bus;
        this._simInterface = simInterface;
        this._propertiesInterface = propertiesInterface;
        this._properties = initialProperties;
        this._propertiesSubject = new BehaviorSubject<any>(this._properties);
        this.properties$ = this._propertiesSubject.asObservable();
        
        this._listenForPropertyChanges();
    }

    /**
     * 
     * @param bus 
     * @param objectPath 
     * @returns 
     */
    public static async init(bus: DBus.DBusConnection, objectPath: string): Promise<Sim> {

        return new Promise<Sim>(async (resolve, reject) => {
            try {

                let simInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.ModemManager1.Sim');
                let initialProperties = await getAllProperties(simInterface);

                let propertiesInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.DBus.Properties');

                let sim = new Sim(
                    bus,
                    simInterface,
                    propertiesInterface,
                    initialProperties
                );

                resolve(sim);
            } catch(err) {
                reject(`Error initializing sim: ${err}`);
            }
        });
    }

    public get properties() {
        return this._properties;
    }

    /**
     * @hidden
     * Send the PIN to unlock the SIM card.
     * @param pin String: A string containing the PIN code 
     * @return Promise for call completion
     */
    public async callSendPin(pin: string) {

    }

    /**
     * @hidden
     * Send the PUK and a new PIN to unlock the SIM card.
     * @param puk String: A string containing the PUK code
     * @param pin String: A string containing the PIN code
     * @return Promise for call completion
     */
    public async callSendPuk(puk: string, pin: string) {

    }

    /**
     * @hidden
     * Enable or disable the PIN checking.
     * @param pin String: A string containing the PIN code
     * @param enabled Boolean: `true` to enable PIN checking, `false` otherwise
     * @return Promise for call completion
     */
    public async callEnablePin(pin: string, enabled: boolean) {
        
    }

    /**
     * @hidden
     * Change the PIN code.
     * @param old_pin String: A string containing the current PIN code
     * @param new_pin String: A string containing the new PIN code
     * @return Promise for call completion
     */
    public async callChangePin(old_pin: string, new_pin: string) {

    }

    /**
     * @hidden
     * Stores the provided preferred network list to the SIM card. Each entry contains an operator id string ("MCCMNC") consisting of 5 or 6 digits, 
     * and a ModemAccessTechnology bitmask to store to SIM card if supported. This method removes any pre-existing entries of the preferred network list. 
     * Note that even if this operation fails, the preferred network list on the SIM card may have changed. Read the PreferredNetworks property to get the up-to-date list. 
     * @param preferred_networks Array: contains objects formatted as ```{<id string>: <ModemAccessTechnology bitmask>}```
     * @return Promise for call completion
     */
    public async callSetPreferredNetworks(preferred_networks: any[]) {

    }

    private _listenForPropertyChanges() {
        signal(this._propertiesInterface, "PropertiesChanged").subscribe(async (propertyChangeInfo: any[]) => {
            let changedProperties: Partial<SimProperties> = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

    public close() {
        // do nothing
    }
}