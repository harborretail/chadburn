import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    AdvancedSignalProperties
 } from "../modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal } from "../../util";

/**
 * A wrapper for the ModemManager Signal DBus interface. 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Modem.Signal.html
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
     * Creates a Signal interface object for a provided Modem object. This provides "advnaced" detailed signal data from the modem.
     * @param bus A DBus system bus instance (ie dbus.getBus('system')), a single bus instance should be used for all objects created with this library.
     * @param objectPath A modem object path (ie "/org/freedesktop/ModemManager1/Modem/0").
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

                await advancedSignal.setupThreshold(10);

                resolve(advancedSignal);
            } catch(err) {
                reject(`Error initializing bearer: ${err}`);
            }
        });
    }

    public get properties() {
        return this._properties;
    }

    /**
     * Enable or disable the extended signal quality information retrieval via periodic polling.
     * 
     * Polling is less than optimal; a better way to be notified of extended signal quality updates is to configure the modem to trigger the reports when the signal changes, i.e. with SetupThresholds().
     * @param rate refresh rate to set, in seconds. Use 0 to disable periodic polling.
     */
    public async setupPolling(rate: number) {
        if(rate >= 0) {
            return call(this._advancedSignalInterface, 'SetupPolling', rate);
        }

        throw 'AdvancedSignal.setupPolling: Invalid input: rate must be a positive integer. It is fed into DBus as an unsigned 32-bit integer.';
    }

    /**
     * Setup thresholds so that the device itself decides when to report the extended signal quality information updates.
     * 
     * The thresholds configured via this method specify the delta between specific signal quality measurements that would trigger a report by the modem.
     * For example, the user may want to be notified every time the signal RSSI changes more than 10dBm, so a value of 10 would be configured as "rssi-threshold".
     * 
     * The device may not support this kind of threshold setting, and instead support fixed signal levels as thresholds (e.g. trigger reports when signal RSSI crosses -90dBm).
     * On these devices, the threshold configured by the user as a difference between measurements is converted to fixed signal levels automatically,
     * depending on the expected range for each of the configured values.
     * E.g. if the user configures 10dBm as "rssi-threshold", the fixed signal levels could be automatically set to -100dBm, -90dBm, -80dBm, -70dBm and -60dBm.
     * 
     * @param threshold The difference of signal RSSI measurements, in dBm, that should trigger a signal quality report update, given as an unsigned integer. Use 0 to disable this threshold. Defaults to 0.
     * @param errorRate A boolean value, indicating whether signal quality report updates should be triggered when error rate measurements change. Defaults to `false`.
     */
    public async setupThreshold(threshold: number = 0, errorRate: boolean = false) {
        if(threshold >= 0) {
            let settings = {
                "rssi-threshold": threshold,
                "error-rate-threshold": errorRate
            }

            return call(this._advancedSignalInterface, 'SetupThreshold', {}, settings);
        }

        throw 'AdvancedSignal.setupThreshold: Invalid input: threshold must be a positive integer. It is fed into DBus as an unsigned 32-bit integer.';
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