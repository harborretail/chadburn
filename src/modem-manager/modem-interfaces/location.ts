import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    LocationProperties
 } from "../modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal } from "../../util";

/**
 * A wrapper for the ModemManager Location DBus API. 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Modem.Location.html
 */
export class Location {
    private _bus: DBus.DBusConnection;
    private _locationInterface: DBus.DBusInterface;
    private _propertiesInterface: DBus.DBusInterface;
    private _properties: LocationProperties;
    private _propertiesSubject: BehaviorSubject<LocationProperties>;

    /** Continuously updated Modem properties */
    public properties$: Observable<LocationProperties>;

    private constructor(
        bus: DBus.DBusConnection,
        locationInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any
    ) {
        this._bus = bus;
        this._locationInterface = locationInterface;
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
     * @returns Promise containing a new Location object
     */
    public static async init(bus: DBus.DBusConnection, objectPath: string): Promise<Location> {

        return new Promise<Location>(async (resolve, reject) => {
            try {

                let locationInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.ModemManager1.Modem.Signal');
                let initialProperties = await getAllProperties(locationInterface);

                let propertiesInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.DBus.Properties');

                let location = new Location(
                    bus,
                    locationInterface,
                    propertiesInterface,
                    initialProperties
                );

                resolve(location);
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
            let changedProperties: Partial<LocationProperties> = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

    public close() {
        // do nothing
    }
}