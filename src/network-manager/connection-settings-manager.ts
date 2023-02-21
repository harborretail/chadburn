import DBus from "dbus";
import { BehaviorSubject, Observable } from "rxjs";
import { call, getAllProperties, objectInterface, signal, stringToByteArray } from "../util";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionProfile, ConnectionProfilePath, ConnectionSettingsManagerProperties } from "./netman-dbus-types";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

/**
 * Manages the saving and retrieving of connection profiles and the device's hostname
 * When connecting to a network (wired or wireless), you must provide a connection profile
 * by either creating one with `addConnectionProfile()` or using a saved connection profile.
 */
export class ConnectionSettingsManager {

    private _bus: DBus.DBusConnection;
    private _connectionSettingsManagerInterface: DBus.DBusInterface;
    private _propertiesInterface: DBus.DBusInterface;

    private _properties: ConnectionSettingsManagerProperties;
    private _propertiesSubject: BehaviorSubject<ConnectionSettingsManagerProperties>;

    /** Continuously updated properties of the ConnectionSettingsManager */
    public properties$: Observable<ConnectionSettingsManagerProperties>;
    /** Get a one-time value of the latest ConnectionSettingsManager properties */
    public get properties(): ConnectionSettingsManagerProperties {
        return this._properties;
    }

    private _connectionProfiles: ConnectionProfile[];
    private _connectionProfilesSubject: BehaviorSubject<ConnectionProfile[]>;

    /** Continuously updated saved connection profiles */
    public connectionProfiles$: Observable<ConnectionProfile[]>;

    /** Get a one-time value of the latest saved connection profiles */
    public get connectionProfiles(): ConnectionProfile[] {
        return this._connectionProfiles;
    }

    private constructor(
        bus: DBus.DBusConnection,
        connectionSettingsManagerInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any,
        initialConnectionProfiles: any
        ) {
            this._bus = bus;
            this._connectionSettingsManagerInterface = connectionSettingsManagerInterface;

            this._propertiesInterface = propertiesInterface;
            this._properties = initialProperties;
            this._propertiesSubject = new BehaviorSubject<any>(this._properties);
            this.properties$ = this._propertiesSubject.asObservable();

            this._connectionProfiles = initialConnectionProfiles;
            this._connectionProfilesSubject = new BehaviorSubject<any>(this._connectionProfiles);
            this.connectionProfiles$ = this._connectionProfilesSubject.asObservable();

            this._listenForPropertyChanges();
            this._listenForConnections();
    }

    /**
     * Initializes a new ConnectionSettingsManager given a DBus connection
     * @constructor
     * @param bus The system DBus instance to use for communicating with NetworkManager
     */
    public static async init(bus: DBus.DBusConnection): Promise<ConnectionSettingsManager> {
        return new Promise<ConnectionSettingsManager>(async (resolve, reject) => {
            try {
                let connectionSettingsManagerInterface = await objectInterface(bus, 'org.freedesktop.NetworkManager', '/org/freedesktop/NetworkManager/Settings', 'org.freedesktop.NetworkManager.Settings');
                let propertiesInterface = await objectInterface(bus, 'org.freedesktop.NetworkManager', '/org/freedesktop/NetworkManager/Settings', 'org.freedesktop.DBus.Properties');
                let initialProperties = await getAllProperties(connectionSettingsManagerInterface);
                let initialConnectionProfiles: any = {};
                let connectionPaths: string[] = await call(connectionSettingsManagerInterface, 'ListConnections', {});

                const getConnectionSettingsForConnectionPaths = async () => {
                    for(let i = 0; i < connectionPaths.length; i++) {
                        let connectionProfileInterface = await objectInterface(bus, 'org.freedesktop.NetworkManager', connectionPaths[i], 'org.freedesktop.NetworkManager.Settings.Connection');
                        initialConnectionProfiles[connectionPaths[i]] = await call(connectionProfileInterface, 'GetSettings', {});
                    }
                }
                await getConnectionSettingsForConnectionPaths();

                let connectionSettingsManager = new ConnectionSettingsManager(
                    bus, 
                    connectionSettingsManagerInterface,
                    propertiesInterface,
                    initialProperties,
                    initialConnectionProfiles
                );

                resolve(connectionSettingsManager);
            } catch(err) {
                reject(`Error initializing network manager: ${err}`);
            }
        });
    }

    /**
     * Adds a new connection profile and returns the path of the new profile
     * @param connectionSettings Connection settings to use when constructing the profile
     * @returns Promise of the new connection profile path
     * @see https://developer.gnome.org/NetworkManager/stable/settings-connection.html
     * @see https://developer.gnome.org/NetworkManager/stable/nm-settings-nmcli.html
     */
    public addConnectionProfile(connectionSettings: ConnectionProfile): Promise<ConnectionProfilePath> {
        return new Promise<ConnectionProfilePath>(async (resolve, reject) => {
            try {
                let connectionProfilePath = await call(this._connectionSettingsManagerInterface, "AddConnection", {}, connectionSettings);
                resolve(connectionProfilePath);
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Convenience function to add new WPA wifi connection profiles
     * @param ssid SSID of the network to connect to as a string
     * @param hidden Whether or not the network has a hidden SSID
     * @param password The password of the network
     * @returns Promise of the new connection profile's path
     */
    public addWifiWpaConnection(ssid: string, hidden: boolean, password?: string): Promise<ConnectionProfilePath> {
        let connectionProfile: any = {
            connection: {
              type: "802-11-wireless",
              "interface-name": "wlan0",
              uuid: uuidv4(),
              id: ssid
            },
            "802-11-wireless": {
                ssid: stringToByteArray(ssid),
                mode: 'infrastructure'
            },
            "ipv4": {
                method: "auto"
            },
            "ipv6": {
                method: "ignore"
            }
        };

        if(password) {
            connectionProfile["802-11-wireless-security"] = {
                "key-mgmt": "wpa-psk",
                "auth-alg": "open",
                "psk": password
            };
            connectionProfile["802-11-wireless"].security = "802-11-wireless-security";
        }

        if(hidden) {
            connectionProfile["802-11-wireless"].hidden = true;
        }

        return this.addConnectionProfile(connectionProfile);
    }

    /**
     * Deactivates and deletes a connection profile
     * This is used to implement "forget wifi network" functionality
     * @param profilePath The connection profile path to remove
     */
    public removeConnectionProfile(profilePath: ConnectionProfilePath): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                let connectionProfileInterface = await objectInterface(this._bus, 'org.freedesktop.NetworkManager', profilePath, "org.freedesktop.NetworkManager.Settings.Connection");
                await call(connectionProfileInterface, "Delete", {});
                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    private _listenForPropertyChanges() {
        signal(this._propertiesInterface, "PropertiesChanged").subscribe((propertyChangeInfo: any[]) => {
            let changedProperties = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

    private _listenForConnections() {
        signal(this._connectionSettingsManagerInterface, "NewConnection").subscribe(async (signal: any[]) => {
            let newConnectionPath = signal[0];
            let connectionProfileInterface = await objectInterface(this._bus, 'org.freedesktop.NetworkManager', newConnectionPath, 'org.freedesktop.NetworkManager.Settings.Connection');
            this._connectionProfiles[newConnectionPath] = await call(connectionProfileInterface, 'GetSettings', {});
            this._connectionProfilesSubject.next(this._connectionProfiles);
        });

        signal(this._connectionSettingsManagerInterface, "ConnectionRemoved").subscribe(async (signal: any[]) => {
            let removedConnectionPath = signal[0];
            delete this._connectionProfiles[removedConnectionPath];
            this._connectionProfilesSubject.next(this._connectionProfiles);
        });
    }
}