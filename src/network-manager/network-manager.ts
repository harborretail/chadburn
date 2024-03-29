import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { ConnectionSettingsManager } from "./connection-settings-manager";
import { DeviceType, NetworkManagerProperties, ConnectivityState } from "./netman-dbus-types";
import { EthernetDevice } from "./ethernet-device";
import { call, getAllProperties, objectInterface, setProperty, signal } from "../util";
import { WifiDevice } from "./wifi-device";

/**
 * Manages communication with the NetworkManager over DBus
 * Responsible for initializing various other managers/devices such as:
 * - Ethernet Device
 * - Wifi Device
 * - Connection Settings Manager
 */
export class NetworkManager {

    private static _networkManagerSingleton: NetworkManager;
    private static _ethernetDevices: EthernetDevice[];
    private static _wifiDevices: WifiDevice[];
    private static _connectionSettingsManagerSingleton: ConnectionSettingsManager;

    private static _bus: DBus.DBusConnection;

    private _networkManagerInterface: DBus.DBusInterface;

    private _propertiesInterface: DBus.DBusInterface;
    private _properties: NetworkManagerProperties;
    private _propertiesSubject: BehaviorSubject<NetworkManagerProperties>;

    /** Continuously updated NetworkManager properties */
    public properties$: Observable<NetworkManagerProperties>;

    /** One-time value of latest NetworkManager properties */
    public get properties(): NetworkManagerProperties {
        return this._properties;
    }

    private constructor(
        networkManagerInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any
        ) {
            this._networkManagerInterface = networkManagerInterface;

            this._propertiesInterface = propertiesInterface;
            this._properties = initialProperties;
            this._propertiesSubject = new BehaviorSubject<any>(this._properties);
            this.properties$ = this._propertiesSubject.asObservable();

            this._listenForPropertyChanges();
    }

    /**
     * Initializes a new NetworkManager instance
     * The NetworkManager is a singleton, so calling this twice will return the same object
     * @returns Promise of a NetworkManager instance
     */
    public static async init(bus?: DBus.DBusConnection): Promise<NetworkManager> {
        // If the singleton exists, return it and exit
        if(NetworkManager._networkManagerSingleton) {
            return Promise.resolve(NetworkManager._networkManagerSingleton);
        }

        return new Promise<NetworkManager>(async (resolve, reject) => {
            if(bus) {
                try {
                    NetworkManager._bus = bus;
                    let networkManagerInterface = await objectInterface(NetworkManager._bus,'org.freedesktop.NetworkManager', '/org/freedesktop/NetworkManager', 'org.freedesktop.NetworkManager');

                    let propertiesInterface = await objectInterface(NetworkManager._bus,'org.freedesktop.NetworkManager', '/org/freedesktop/NetworkManager', 'org.freedesktop.DBus.Properties');
                    let initialProperties = await getAllProperties(networkManagerInterface);

                    let networkManager = new NetworkManager(
                        networkManagerInterface, 
                        propertiesInterface,
                        initialProperties
                    );

                    NetworkManager._networkManagerSingleton = networkManager;

                    resolve(networkManager);
                } catch(err) {
                    reject(`Error initializing network manager: ${err}`);
                }
            } else {
                reject('Error initializing network manager: no bus provided');
            }
        });
    }

    /**
     * Initializes a new WifiDevice array
     * Creates an array of each wifi device it finds
     * WifiDevices is a singleton, so subsequent calls will return the same object
     * @returns Promise of a new WifiDevice array
     */
    public wifiDevices(): Promise<WifiDevice[]> {
        // If the singleton exists, return it and exit
        if(NetworkManager._wifiDevices) {
            return Promise.resolve(NetworkManager._wifiDevices);
        }

        return new Promise<WifiDevice[]>(async (resolve, reject) => {
            try {
                let allDevicePaths: string[] = await call(this._networkManagerInterface, "GetAllDevices", {});
                const forLoop = async () => {
                    let wifiDevices: WifiDevice[] = [];

                    for(let i = 0; i < allDevicePaths.length; i++) {
                        let device = await objectInterface(NetworkManager._bus, 'org.freedesktop.NetworkManager', allDevicePaths[i], 'org.freedesktop.NetworkManager.Device');
                        let properties = await getAllProperties(device);
                        
                        if(properties.DeviceType === DeviceType.WIFI) {
                            let device = await WifiDevice.init(NetworkManager._bus, allDevicePaths[i]);
                            wifiDevices.push(device);
                        }
                    }
                    
                    NetworkManager._wifiDevices = wifiDevices;
                    resolve(wifiDevices);
                    return;
                }

                await forLoop();
                reject(`No wifi device`);
            } catch(err) {
                reject(err);
            }
            
        })
    }

    /**
     * Initializes and returns a new EthernetDevice array
     * Creates an array of each ethernet device it finds
     * EthernetDevices is a singleton, so subsequent calls will return the same object
     * @returns Promise of a new EthernetDevice array
     */
    public ethernetDevices(): Promise<EthernetDevice[]> {
        // If the singleton exists, return it and exit
        if(NetworkManager._ethernetDevices) {
            return Promise.resolve(NetworkManager._ethernetDevices);
        }

        return new Promise<EthernetDevice[]>(async (resolve, reject) => {
            try {
                let allDevicePaths: string[] = await call(this._networkManagerInterface, "GetAllDevices", {});
                const forLoop = async () => {
                    let ethernetDevices: EthernetDevice[] = [];
                    for(let i = 0; i < allDevicePaths.length; i++) {
                        let device = await objectInterface(NetworkManager._bus, 'org.freedesktop.NetworkManager', allDevicePaths[i], 'org.freedesktop.NetworkManager.Device');
                        let properties = await getAllProperties(device);
                        
                        if(properties.DeviceType === DeviceType.ETHERNET) {
                            let device = await EthernetDevice.init(NetworkManager._bus, allDevicePaths[i]);
                            ethernetDevices.push(device);
                        }
                    }

                    NetworkManager._ethernetDevices = ethernetDevices;
                    resolve(ethernetDevices);
                    return;
                }
    
                await forLoop();
                reject(`No ethernet device`);
            } catch(err) {
                reject(err);
            }
            
        })
    }

    /**
     * Initializes and returns a new ConnectionSettingsManager
     * ConnectionSettingsManager is a singleton, so subsequent calls will return the same object
     * @returns Promise of a new ConnectionSettingsManager
     */
    public connectionSettingsManager(): Promise<ConnectionSettingsManager> {
        // If the singleton exists, return it and exit
        if(NetworkManager._connectionSettingsManagerSingleton) {
            return Promise.resolve(NetworkManager._connectionSettingsManagerSingleton);
        }

        return new Promise<ConnectionSettingsManager>(async (resolve, reject) => {
            try {
                let connectionSettingsManager = await ConnectionSettingsManager.init(NetworkManager._bus);
                NetworkManager._connectionSettingsManagerSingleton = connectionSettingsManager;
                resolve(connectionSettingsManager);
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * **Requires root access, depending on user permissions and NetworkManager policy configuration.**
     * 
     * Enables or disables wireless functionality
     * @param enable If true, enable wireless; if false, disable wireless
     */
    public enableWireless(enable: boolean) {
        setProperty(this._networkManagerInterface, "WirelessEnabled", enable);
    }

    /**
     * **Requires root access, depending on user permissions and NetworkManager policy configuration.**
     * 
     * Enables or disables built in connectivity checking mechanism in NetworkManager. The URI present in
     * {@link NetworkManagerTypes!NetworkManagerProperties.ConnectivityCheckUri} will be polled to determine connection status.
     * @see https://developer-old.gnome.org/NetworkManager/stable/NetworkManager.conf.html Specifically the "connectivity section" near the bottom
     * @param enable If true, enable connectivity checks; if false, disable connectivity checks
     */
    public enableConnectivity(enable: boolean) {
        setProperty(this._networkManagerInterface, "ConnectivityCheckEnabled", enable);
    }

    /**
     * **Requires root access, depending on user permissions and NetworkManager policy configuration.**
     * 
     * Initiates a new connectivity check and returns the result. In order for this method to work the {@link NetworkManager.properties properties}
     * value for ConnectivityCheckAvailable and ConnectivityCheckEnabled will both need to be true, and 
     * {@link NetworkManagerTypes!NetworkManagerProperties.ConnectivityCheckUri} will need to be set to a valid NetworkManager connectivity service.
     * 
     * @see https://developer-old.gnome.org/NetworkManager/stable/NetworkManager.conf.html Specifically the "connectivity section" near the bottom
     * @returns Promise of a {@link NetworkManagerTypes!ConnectivityState} value representing the current connectivity status.
     */
    public checkConnectivity(): Promise<ConnectivityState> {
        return new Promise<ConnectivityState>(async (resolve, reject) => {
            try {
                let value = await call(this._networkManagerInterface, "CheckConnectivity", {});
                resolve(value);
            } catch(err) {
                reject(`Error checking connectivity: ${err}`);
            }
        });
    }

    /**
     * Create a checkpoint of the current networking configuration for given interfaces.
     * If rollback_timeout is not zero, a rollback is automatically performed after the given timeout.
     * @param timeout The time in seconds until NetworkManager will automatically rollback to the checkpoint. Set to zero for infinite.
     * @param flags A bitmask of {@link NetworkManagerTypes!CheckpointCreateFlags} for checkpoint creation.
     * @param devices A list of device paths for which a checkpoint should be created. An empty list means all devices. Defaults to an empty list.
     * @returns A Promise of the DBus object path for the created Checkpoint
     */
    public createCheckpoint(timeout: number, flags: number, devices: string[] = []) {
        return new Promise<string>(async (resolve, reject) => {
            try {
                let checkpt = await call(this._networkManagerInterface, "CheckpointCreate", {}, devices, timeout, flags);
                resolve(checkpt);
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Destroy a previously created checkpoint.
     * @param checkpoint The DBus object path to the checkpoint to be destroyed. Set to an empty string to destroy all pending checkpoints.
     * @returns Nothing, resolves on success.
     */
    public destroyCheckpoint(checkpoint: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await call(this._networkManagerInterface, "CheckpointDestroy", {}, checkpoint);
                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Rollback a checkpoint before the timeout is reached.
     * @param checkpoint The DBus object path to the checkpoint to rollback to.
     * @returns A Promise of a dictionary of devices represented by their DBus paths and {@link NetworkManagerTypes!RollbackResult} values.
     */
    public rollbackCheckpoint(checkpoint: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let result = await call(this._networkManagerInterface, "CheckpointRollback", {}, checkpoint);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Reset the timeout for rollback for the checkpoint.
     * 
     * Note that the added seconds start counting from now, not "Created" timestamp or the previous expiration time.
     * Note that the "Created" property of the checkpoint will stay unchanged by this call. However, the "RollbackTimeout"
     * will be recalculated to give the approximate new expiration time. The new "RollbackTimeout" property will be
     * approximate up to one second precision, which is the accuracy of the property.
     * @param checkpoint The DBus object path to the checkpoint to adjust.
     * @param timeout Number of seconds from now in which the timeout will expire. Set to 0 to disable the timeout.
     * @returns Nothing, resolves on success.
     */
    public adjustCheckpointTimeout(checkpoint: string, timeout: number) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await call(this._networkManagerInterface, "CheckpointAdjustRollbackTimeout", {}, checkpoint, timeout);
                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    private _listenForPropertyChanges() {
        signal(this._propertiesInterface, "PropertiesChanged").subscribe(async (propertyChangeInfo: any[]) => {
            //console.log(propertyChangeInfo);
            let changedProperties: Partial<NetworkManagerProperties> = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

}