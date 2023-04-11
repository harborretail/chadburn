import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    LocationProperties
 } from "../modman-dbus-types";
import { call, getAllProperties, objectInterface, setProperty, signal } from "../../util";

/**
 * A wrapper for the ModemManager Location DBus interface. 
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

    /**
     * Configure the location sources to use when gathering location information. Adding new location sources may require to enable them in the device (e.g. the GNSS engine will need to be started explicitly if a GPS source is requested by the user). In the same way, removing location sources may require to disable them in the device (e.g. when no GPS sources are requested by the user, the GNSS engine will need to be stopped explicitly).
     * 
     * This method may require the client to authenticate itself.
     * 
     * When location signaling is enabled by the user, any client application (including malicious ones!) would be able to use the "Location" property to receive location updates. If further security is desired, the signal_location argument can be set to FALSE to disable location updates via D-Bus signals and require applications to call authenticated APIs (like GetLocation()) to get the location information.
     * 
     * By default location signaling is disabled, and therefore the "{@link ModemManagerTypes.LocationProperties.Location Location}" property will not be usable until explicitly enabled by the user.
     * 
     * The optional {@link ModemManagerTypes.ModemLocationSource.MM_MODEM_LOCATION_SOURCE_AGPS_MSA MM_MODEM_LOCATION_SOURCE_AGPS_MSA} and {@link ModemManagerTypes.ModemLocationSource.MM_MODEM_LOCATION_SOURCE_AGPS_MSB MM_MODEM_LOCATION_SOURCE_AGPS_MSB} allow to request MSA/MSB A-GPS operation, and they must be given along with either {@link ModemManagerTypes.ModemLocationSource.MM_MODEM_LOCATION_SOURCE_GPS_RAW MM_MODEM_LOCATION_SOURCE_GPS_RAW} or {@link ModemManagerTypes.ModemLocationSource.MM_MODEM_LOCATION_SOURCE_GPS_NMEA MM_MODEM_LOCATION_SOURCE_GPS_NMEA}.
     * 
     * Both {@link ModemManagerTypes.ModemLocationSource.MM_MODEM_LOCATION_SOURCE_AGPS_MSA MM_MODEM_LOCATION_SOURCE_AGPS_MSA} and {@link ModemManagerTypes.ModemLocationSource.MM_MODEM_LOCATION_SOURCE_AGPS_MSB MM_MODEM_LOCATION_SOURCE_AGPS_MSB} cannot be given at the same time, and if none given, standalone GPS is assumed.
     * 
     * @param sources Bitmask of {@link ModemManagerTypes.ModemLocationSource ModemLocationSource} flags, specifying which sources should get enabled or disabled. {@link ModemManagerTypes.ModemLocationSource.MM_MODEM_LOCATION_SOURCE_NONE MM_MODEM_LOCATION_SOURCE_NONE} will disable all location gathering.
     * @param signal_location Flag to control whether the device emits signals with the new location information. This argument is ignored when disabling location information gathering. Defaults to `false`.
     */
    public async setup(sources: number, signal_location: boolean = false) {
        if(sources >= 0) {
            return call(this._locationInterface, 'Setup', {}, sources, signal_location);
        }

        throw 'Location.setupThreshold: Invalid input: sources must be a positive integer. It is fed into DBus as an unsigned 32-bit integer.';
    }

    /**
     * Return current location information, if any. If the modem supports multiple location types it may return more than one.
     * See the {@link ModemManagerTypes.LocationProperties.Location Location} property for more information on the dictionary returned at location.
     * 
     * This method may root authentication.
     */
    public async getLocation() {
        return call(this._locationInterface, 'GetLocation', {});
    }

    /**
     * Configure the SUPL server for A-GPS.
     * @param server SUPL server configuration, given either as IP:PORT or as FQDN:PORT
     */
    public async setSuplServer(server: string) {
        return call(this._locationInterface, 'SetSuplServer', {}, server);
    }

    /**
     * Inject assistance data to the GNSS module, which will allow it to have a more accurate positioning information.
     * 
     * The data files should be downloaded using external means from the URLs specified in the AssistanceDataServers property.
     * The user does not need to specify the assistance data type being given.
     * 
     * There is no maximum data size limit specified, default DBus system bus limits apply.
     * 
     * This method may be used when the device does not have a mobile network connection by itself,
     * and therefore it cannot use any A-GPS server to improve the accuracy of the position.
     * In this case, the user can instead download the assistance data files using a WiFi or LAN network, and inject them to the GNSS engine manually.
     * @param data assistance data to be injected to the GNSS module, given as an array of bytes.
     */
    public async injectAssistanceData(data: any) {
        return call(this._locationInterface, 'InjectAssistanceData', {}, data);
    }

    /**
     * Set the refresh rate of the GPS information in the API. If not explicitly set, a default of 30s will be used.
     * 
     * The refresh rate can be set to 0 to disable it, so that every update reported by the modem is published in the interface.
     * @param rate Rate, in seconds.
     */
    public async setGpsRefreshRate(rate: number) {
        if(rate >= 0) {
            return call(this._locationInterface, 'SetGpsRefreshRate', {}, rate);
        }

        throw 'Location.setGpsRefreshRate: Invalid input: rate must be a positive integer. It is fed into DBus as an unsigned 32-bit integer.';
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