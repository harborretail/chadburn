export interface IAccessPoint {
    ssid: string;
    /** Mac address */
    bssid: string;
    /** 0-100 */
    strengthPercent: number;
    /** 0-3 */
    strength: number;
    /** GHz */
    frequency: number;
    /** Mb/s */
    maxBitrate: number;
}