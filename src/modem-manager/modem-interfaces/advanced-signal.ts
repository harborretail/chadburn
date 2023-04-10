import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    AdvancedSignalProperties
 } from "../modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal } from "../../util";

/**
 * A wrapper for the ModemManager AdvancedSignal DBus API. 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Modem.AdvancedSignal.html
 */
export class AdvancedSignal {
    private _bus: DBus.DBusConnection;
    private _advancedSignalInterface: DBus.DBusInterface;
    private _propertiesInterface: DBus.DBusInterface;
    private _properties: AdvancedSignalProperties;
    private _propertiesSubject: BehaviorSubject<AdvancedSignalProperties>;

    /** Continuously updated Modem properties */
    public properties$: Observable<AdvancedSignalProperties>;

    private constructor(
        bus: DBus.DBusConnection,
        advancedSignalInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any
    ) {
        this._bus = bus;
        this._advancedSignalInterface = advancedSignalInterface;
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
     * @returns Promise containing a new AdvancedSignal object
     */
    public static async init(bus: DBus.DBusConnection, objectPath: string): Promise<AdvancedSignal> {

        return new Promise<AdvancedSignal>(async (resolve, reject) => {
            try {

                let advancedSignalInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.ModemManager1.Modem.Signal');
                let initialProperties = await getAllProperties(advancedSignalInterface);

                let propertiesInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.DBus.Properties');

                let advancedSignal = new AdvancedSignal(
                    bus,
                    advancedSignalInterface,
                    propertiesInterface,
                    initialProperties
                );

                resolve(advancedSignal);
            } catch(err) {
                reject(`Error initializing bearer: ${err}`);
            }
        });
    }

    public get properties() {
        return this._properties;
    }

    private _listenForPropertyChanges() {
        signal(this._propertiesInterface, "PropertiesChanged").subscribe(async (propertyChangeInfo: any[]) => {
            let changedProperties: Partial<AdvancedSignalProperties> = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

    public close() {
        // do nothing
    }
}