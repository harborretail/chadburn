import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    Modem3gppProperties,
    Modem3gppNetworkAvailability,
    BearerConfiguration
 } from "./modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal, int32ToEnumArray } from "../util";

/**
 * A wrapper for the ModemManager Modem3gpp DBus API. 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Modem.Modem3gpp.html
 */
export class Modem3gpp {
    private _bus: DBus.DBusConnection;
    private _modem3gppInterface: DBus.DBusInterface;
    private _propertiesInterface: DBus.DBusInterface;
    private _properties: Modem3gppProperties;
    private _propertiesSubject: BehaviorSubject<Modem3gppProperties>;

    /** Continuously updated Modem properties */
    public properties$: Observable<Modem3gppProperties>;

    private constructor(
        bus: DBus.DBusConnection,
        modem3gppInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any
    ) {
        this._bus = bus;
        this._modem3gppInterface = modem3gppInterface;
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
     * @returns Promise containing a new Modem3gpp object
     */
    public static async init(bus: DBus.DBusConnection, objectPath: string): Promise<Modem3gpp> {

        return new Promise<Modem3gpp>(async (resolve, reject) => {
            try {

                let modem3gppInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.ModemManager1.Modem.Modem3gpp');
                let initialProperties = await getAllProperties(modem3gppInterface);

                let propertiesInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.DBus.Properties');

                let modem3gpp = new Modem3gpp(
                    bus,
                    modem3gppInterface,
                    propertiesInterface,
                    initialProperties
                );

                resolve(modem3gpp);
            } catch(err) {
                reject(`Error initializing bearer: ${err}`);
            }
        });
    }

    public get properties() {
        return this._properties;
    }

    /**
     * @hidden
     * Request registration with a given mobile network.
     * @param operator_id The operator ID (ie, "MCCMNC", like "310260") to register. An empty string can be used to register to the home network.
     */
    public register(operator_id: string) {

    }

    /**
     * @hidden
     * @returns array of dictionaries with the following format
     * @link Modem3gppNetworkAvailability
     * @link ModemAccessTechnology
     * 
     * ``` ts
     * {
     * 
     * "status": Modem3gppNetworkAvailability // A value representing network availability status, this key will always be present.
     * 
     * "operator-long": string // Long-format name of operator. If the name is unknown, this field should not be present.
     * 
     * "operator-short": string // Short-format name of operator. If the name is unknown, this field should not be present.
     * 
     * "operator-code": string // Mobile code of the operator. Returned in the format "MCCMNC", where MCC is the three-digit ITU E.212 Mobile Country Code and MNC is the two- or three-digit GSM Mobile Network Code. e.g. "31026" or "310260".
     * 
     * "access-technology": ModemAccessTechnology // A value representing the generic access technology used by this mobile network. 
     * 
     * }
     * ```
     */
    public scan(): object[] {

        return [];
    }

    /**
     * @hidden
     * @param mode Modem3gppEpsUeModeOperation
     */
    public setEpsUeModeOperation(mode: number) {

    }

    /**
     * @param settings an object which is a subset of {@link BearerConfiguration}, containing 3GPP specific fields
     * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Bearer.html#gdbus-property-org-freedesktop-ModemManager1-Bearer.Properties
     * @example 
     * ```typescript
     * let modem_manager = await ModemManager.init(bus);
     * let modem = modem_manager.getModem(0); // /org/freedesktop/ModemManager1/Modem/0
     * let modem3gpp = await modem.getModem3gpp();
     * let settings: Partial<BearerConfiguration> = {
     *     "apn": "ATT-APN-NAME",
     *     "user": "admin",
     *     "password": "super-secret-password",
     *     "apn-type": BearerApnType.MM_BEARER_APN_TYPE_INITIAL
     * }
     * 
     * modem3gpp.setInitialEpsBearerSettings(settings);
     * ```
     */
    public setInitialEpsBearerSettings(settings: Partial<BearerConfiguration>) {
        return new Promise(async (resolve, reject) => {
            try {
                let value = call(this._modem3gppInterface, "SetInitialEpsBearerSettings", {}, settings);
                resolve(value);
            } catch(e) {
                reject(`Error setting initial bearer settings: ${e}`);
            }
        });
    }

    /**
     * @hidden
     * @param settings 
     */
    public setNr5gRegistrationSettings(settings: object) {

    }

    /**
     * @hidden
     * @param properties 
     */
    public disableFacilityLock(properties: any) {

    }

    /**
     * @hidden
     * @param state 
     */
    public setPacketServiceState(state: number) {

    }

    private _listenForPropertyChanges() {
        signal(this._propertiesInterface, "PropertiesChanged").subscribe(async (propertyChangeInfo: any[]) => {
            let changedProperties: Partial<Modem3gppProperties> = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

    public close() {
        // do nothing
    }
}