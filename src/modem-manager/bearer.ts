import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    BearerProperties,
    ModemAccessTechnology
 } from "./modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal, int32ToEnumArray } from "../util";

export class Bearer {
    private _bus: DBus.DBusConnection;
    private _bearerInterface: DBus.DBusInterface;
    private _propertiesInterface: DBus.DBusInterface;
    private _properties: BearerProperties;
    private _propertiesSubject: BehaviorSubject<BearerProperties>;

    /** Continuously updated Modem properties */
    public properties$: Observable<BearerProperties>;

    private constructor(
        bus: DBus.DBusConnection,
        bearerInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any
    ) {
        this._bus = bus;
        this._bearerInterface = bearerInterface;
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
    public static async init(bus: DBus.DBusConnection, objectPath: string): Promise<Bearer> {

        return new Promise<Bearer>(async (resolve, reject) => {
            try {

                let bearerInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.ModemManager1.Bearer');
                let initialProperties = await getAllProperties(bearerInterface);

                let propertiesInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.DBus.Properties');

                let bearer = new Bearer(
                    bus,
                    bearerInterface,
                    propertiesInterface,
                    initialProperties
                );

                resolve(bearer);
            } catch(err) {
                reject(`Error initializing bearer: ${err}`);
            }
        });
    }

    public get properties() {
        return this._properties;
    }

    /**
     * Requests activation of a packet data connection with the network using this bearer's properties. Upon successful activation, the modem can send and 
     * receive packet data and, depending on the addressing capability of the modem, a connection manager may need to start PPP, perform DHCP, or assign the 
     * IP address returned by the modem to the data interface. Upon successful return, the "Ip4Config" and/or "Ip6Config" properties become valid and may contain 
     * IP configuration information for the data interface associated with this bearer.
     * @return Promise for call completion
     */
    public async callConnect() {
        call(this._bearerInterface, 'Connect', []);
    }

    /**
     * Disconnect and deactivate this packet data connection.
     * Any ongoing data session will be terminated and IP addresses become invalid when this method is called. 
     * @return Promise for call completion
     */
    public async callDisconnect() {
        call(this._bearerInterface, 'Disconnect', []);
    }

    private _listenForPropertyChanges() {
        signal(this._propertiesInterface, "PropertiesChanged").subscribe(async (propertyChangeInfo: any[]) => {
            let changedProperties: Partial<BearerProperties> = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

    public close() {
        // do nothing
    }
}