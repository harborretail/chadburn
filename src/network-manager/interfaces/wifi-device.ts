import { ReplaySubject } from "rxjs";
import { WirelessMode } from "../netman-dbus-types";
import { IAccessPoint } from "./access-point";

export interface ISavedConnection {

}

export interface IWifiDevice {
    macAddress: string;
    wirelessMode: WirelessMode; 
    /** Kb/s */
    currentBitrate: number;
    discoveredAccessPoints: IAccessPoint[];
    activeAccessPoint: IAccessPoint | null;
    isScanning: boolean;
    supports: {
        nothing: boolean;
        wep40Encryption: boolean;
        wep104Encryption: boolean;
        supportsTkipEncryption: boolean;
        ccmpEncryption: boolean;
        wpaEncryption: boolean;
        rsnEncryption: boolean;
        accessPointMode: boolean;
        adHocMode: boolean;
        frequencyCapabilities: boolean;
        twoGhz: boolean;
        fiveGhz: boolean;
        mesh: boolean;
        ibssRsn: boolean;
    };
    accessPoints: ReplaySubject<IAccessPoint[]>;

    /**
     * 
     */
    rfKill(): Promise<void>;

    /**
     * Scan for local wifi networks
     * 
     * @returns true if we started a new scan; false if we were already scanning
     */
    scan(): boolean;

    /**
     * Connect to a saved connection
     * @param savedConnection The saved connection to connect to
     * @returns A promise that resolves when the connection is made; else, reject
     */
    connectTo(savedConnection: ISavedConnection): Promise<void>;

    /**
     * Connect to a wifi network with an SSID and password
     * 
     * @param wpaAuthDetails an object with the keys "ssid" and "password"
     */
    connectTo(wpaAuthDetails: {
        ssid: string;
        password: string;
    }): Promise<void>;

}
