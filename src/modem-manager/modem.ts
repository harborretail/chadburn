import DBus = require("dbus");
import { BehaviorSubject, Observable } from "rxjs";
import { 
    ModemProperties, 
    SimProperties,
    BearerConfiguration,
    BearerProperties, 
    ModemCapability, 
    ModemPortType, 
    ModemLock, 
    ModemState,
    ModemStateFailedReason,
    ModemAccessTechnology,
    ModemPowerState,
    ModemMode,
    ModemBand,
    BearerIpFamily
 } from "./modman-dbus-types";
import { Sim } from "./sim";
import { Bearer } from "./bearer";
import { call, getAllProperties, objectInterface, setProperty, signal, int32ToEnumArray } from "../util";
import { Modem3gpp } from "./modem3gpp";

export class Modem {
    private _bus: DBus.DBusConnection;
    private _objectPath: string;

    private _sim: Sim | null;
    private _bearers: Bearer[];
    private _modem3gpp: Modem3gpp | undefined;

    private _modemInterface: DBus.DBusInterface;
    private _propertiesInterface: DBus.DBusInterface;
    private _properties: ModemProperties;
    private _propertiesSubject: BehaviorSubject<ModemProperties>;

    /** 
     * An RxJS observable for the Modems properties.
     * Properties are updated by listening to the org.freedesktop.DBus.Properties PropertiesChanged signal
     */
    public properties$: Observable<ModemProperties>;

    private constructor(
        bus: DBus.DBusConnection,
        objectPath: string,
        sim: Sim | null,
        bearers: Bearer[],
        modemInterface: DBus.DBusInterface,
        propertiesInterface: DBus.DBusInterface,
        initialProperties: any
    ) {
        this._bus = bus;
        this._objectPath = objectPath;
        this._sim = sim;
        this._bearers = bearers;
        this._modem3gpp = undefined;
        this._modemInterface = modemInterface;
        this._propertiesInterface = propertiesInterface;
        this._properties = initialProperties;
        this._propertiesSubject = new BehaviorSubject<any>(this._properties);
        this.properties$ = this._propertiesSubject.asObservable();

        this._listenForPropertyChanges();
    }

    /**
     * Creates a new Modem object. Typically Modem objects will be created automatically when a {@link ModemManager} object is instantiated. They can be accessed from {@link ModemManager.modems}
     * @param bus A DBus system bus instance (ie dbus.getBus('system')), a single bus instance should be used for all objects created with this library.
     * @param objectPath A modem object path (ie "/org/freedesktop/ModemManager1/Modem/0").
     * @returns A Promise containing a Modem object found using objectPath
     */
    public static async init(bus: DBus.DBusConnection, objectPath: string): Promise<Modem> {

        return new Promise<Modem>(async (resolve, reject) => {
            try {
                
                let modemInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.ModemManager1.Modem');
                let initialProperties = await getAllProperties(modemInterface);

                let propertiesInterface = await objectInterface(bus, 'org.freedesktop.ModemManager1', objectPath, 'org.freedesktop.DBus.Properties');

                let sim;
                if(initialProperties.Sim) {
                    sim = await Sim.init(bus, initialProperties.Sim);
                } else {
                    sim = null;
                }

                let bearers: Bearer[] = [];
                for(let b of initialProperties.Bearers) {
                    bearers.push(await Bearer.init(bus, b));
                }

                let modem = new Modem(
                    bus,
                    objectPath,
                    sim,
                    bearers,
                    modemInterface,
                    propertiesInterface,
                    initialProperties
                );

                resolve(modem);
            } catch(err) {
                reject(`Error initializing modem manager: ${err}`);
            }
        });
    }

    /**
     * The primary {@link Sim} object for the Modem
     */
    public get sim() {
        return this._sim;
    }

    /**
     * An array of {@link Bearer}s for the Modem
     */
    public get bearers() {
        return this._bearers;
    }

    /**
     * The current properties for the Modem
     */
    public get properties() {
        return this._properties;
    }

    /**
     * The current properties for the Modem, but translates the enums and reformats some fields to be more human readable.
     */
    public get prettyProperties() {
        let props: any = {};

        if(this._properties.Sim != null) {props.Sim = this._properties.Sim}// SimPath;
        if(this._properties.SimSlots != null) {props.SimSlots = this._properties.SimSlots}// SimPath[];
        if(this._properties.PrimarySimSlot != null) {props.PrimarySimSlot = this._properties.PrimarySimSlot}// number;
        if(this._properties.Bearers != null) {props.Bearers = this._properties.Bearers}// BearerPath[];
        if(this._properties.SupportedCapabilities != null) {// ModemCapability[];
            let capabilities = []
            for(let cap of this._properties.SupportedCapabilities) {
                capabilities.push(int32ToEnumArray(cap, ModemCapability));
            }
            
            props.SupportedCapabilities = capabilities;
        }
        if(this._properties.CurrentCapabilities != null) {// ModemCapability;
            props.CurrentCapabilities = int32ToEnumArray(this._properties.CurrentCapabilities, ModemCapability);
        }
        if(this._properties.MaxBearers != null) {props.MaxActiveBearers = this._properties.MaxBearers}// number;
        if(this._properties.MaxActiveBearers != null) {props.MaxActiveBearers = this._properties.MaxActiveBearers}// number;
        if(this._properties.MaxActiveMultiplexedBearers != null) {props.MaxActiveMultiplexedBearers = this._properties.MaxActiveMultiplexedBearers}// number;
        if(this._properties.Manufacturer != null) {props.Manufacturer = this._properties.Manufacturer}// string;
        if(this._properties.Model != null) {props.Model = this._properties.Model}// string;
        if(this._properties.Revision != null) {props.Revision = this._properties.Revision}// string;
        if(this._properties.CarrierConfiguration != null) {props.CarrierConfiguration = this._properties.CarrierConfiguration}// string;
        if(this._properties.CarrierConfigurationRevision != null) {props.CarrierConfigurationRevision = this._properties.CarrierConfigurationRevision}// string;
        if(this._properties.HardwareRevision != null) {props.HardwareRevision = this._properties.HardwareRevision}// string;
        if(this._properties.DeviceIdentifier != null) {props.DeviceIdentifier = this._properties.DeviceIdentifier}// string;
        if(this._properties.Device != null) {props.Device = this._properties.Device}// string;
        if(this._properties.Drivers != null) {props.Drivers = this._properties.Drivers}// string[];
        if(this._properties.Plugin != null) {props.Plugin = this._properties.Plugin}// string;
        if(this._properties.PrimaryPort != null) {props.PrimaryPort = this._properties.PrimaryPort}// string;
        if(this._properties.Ports != null) {// ModemPortType[];
            let ports: any = {};
            let raw_ports: ModemPortType[] | any = this._properties.Ports;
            /*
            [                                  
                {                                       {
                    ttyACM3: 3,                             ttyACM3: "MM_MODEM_PORT_TYPE_AT",
                    ttyACM4: 1,                             ttyACM4: "MM_MODEM_PORT_TYPE_UNKNOWN",
                    wwx000011121314: 2,                     wwx000011121314: "MM_MODEM_PORT_TYPE_NET",
                    ttyACM5: 1,               ----->        ttyACM5: "MM_MODEM_PORT_TYPE_UNKNOWN",
                    ttyACM0: 3,                             ttyACM0: "MM_MODEM_PORT_TYPE_AT",
                    ttyACM1: 1,                             ttyACM1: "MM_MODEM_PORT_TYPE_UNKNOWN",
                    ttyACM2: 1                              ttyACM2: "MM_MODEM_PORT_TYPE_UNKNOWN"
                }                                       }
            ]
            */
            for(let port of Object.keys(raw_ports[0])) {
                ports[port] = (ModemPortType[raw_ports[0][port]]);
            }
            
            props.Ports = ports;
        }
        if(this._properties.EquipmentIdentifier != null) {props.EquipmentIdentifier = this._properties.EquipmentIdentifier}// string;
        if(this._properties.UnlockRequired != null) {// ModemLock;
            props.UnlockRequired = ModemLock[this._properties.UnlockRequired];
        }
        if(this._properties.UnlockRetries != null) {// {lock: ModemLock, remaining_attempts: number}[];
            /*
            {                               {
                '2': 3,                         MM_MODEM_LOCK_SIM_PIN: 3,
                '3': 3,          ----->         MM_MODEM_LOCK_SIM_PIN2: 3,
                '4': 10,                        MM_MODEM_LOCK_SIM_PUK: 10,
                '5': 10                         MM_MODEM_LOCK_SIM_PUK2: 10
            }                               }
            */
            let locks: any = {};
            let raw_locks: any = this._properties.UnlockRetries;
            for(let lock of Object.keys(raw_locks)) {
                locks[ModemLock[parseInt(lock)]] = raw_locks[lock];
            }
            
            props.UnlockRetries = locks;
        }
        if(this._properties.State != null) {// ModemState;
            props.State = ModemState[this._properties.State];
        }
        if(this._properties.StateFailedReason != null) {// ModemStateFailedReason;
            props.StateFailedReason = ModemStateFailedReason[this._properties.StateFailedReason];
        }
        if(this._properties.AccessTechnologies != null) {// ModemAccessTechnology;
            props.AccessTechnologies = int32ToEnumArray(this._properties.AccessTechnologies, ModemAccessTechnology);
        }
        if(this._properties.SignalQuality != null) {// {quality: number, recent: boolean};
            /*
            {                               {
                '42': true      ----->          quality: 42,
            }                                   recent: true
                                            }
            */
            props.SignalQuality = {
                quality: parseInt(Object.keys(this._properties.SignalQuality)[0]), 
                recent: this._properties.SignalQuality[Object.keys(this._properties.SignalQuality)[0]]
            };
        }
        if(this._properties.OwnNumbers != null) {props.OwnNumbers = this._properties.OwnNumbers}// string[];
        if(this._properties.PowerState != null) {// ModemPowerState;
            props.PowerState = ModemPowerState[this._properties.PowerState];
        }
        if(this._properties.SupportedModes != null) {// {modes: ModemMode[], preferred: ModemMode}[];
            let modes: any[] = [];
            let raw_modes = Object.keys(this._properties.SupportedModes[0]);
            for(let m of raw_modes) {
                let obj: any = {};
                obj.modes = int32ToEnumArray(parseInt(m), ModemMode);
                obj.preferred = ModemMode[this._properties.SupportedModes[0][m]];
                modes.push(obj);
            }

            props.SupportedModes = modes;
        }
        if(this._properties.CurrentModes != null) {// {modes: ModemMode[], preferred: ModemMode};  
            let mode: any = {};
            mode.modes = int32ToEnumArray(parseInt(Object.keys(this._properties.CurrentModes)[0]), ModemMode);
            mode.preferred = ModemMode[this._properties.CurrentModes[Object.keys(this._properties.CurrentModes)[0]]];

            props.CurrentModes = mode;
        }
        if(this._properties.SupportedBands != null) {// ModemBand[];
            let bands: string[] = [];
            for(let b of this._properties.SupportedBands) {
                bands.push(ModemBand[b]);
            }

            props.SupportedBands = bands;
        }
        if(this._properties.CurrentBands != null) {// ModemBand[];
            let bands: string[] = [];
            for(let b of this._properties.CurrentBands) {
                bands.push(ModemBand[b]);
            }

            props.CurrentBands = bands;
        }
        if(this._properties.SupportedIpFamilies != null) {// BearerIpFamily;
            let families = int32ToEnumArray(this._properties.SupportedIpFamilies, BearerIpFamily);

            props.SupportedIpFamilies = families;
        }

        return props;
    }

    /**
     * @returns a Promise containing a new {@link Modem3gpp} interface for the Modem
     */
    public async getModem3gpp(): Promise<Modem3gpp | undefined> {
        try {
            if(!this._modem3gpp) {
                this._modem3gpp = await Modem3gpp.init(this._bus, this._objectPath);
            }
        } catch(e) {
            this._modem3gpp = undefined;
        }
        return this._modem3gpp
    }

    /**
     * @hidden
     * Enable or disable the modem.
     * When enabled, the modem's radio is powered on and data sessions, voice calls, location services, and Short Message Service may be available.
     * When disabled, the modem enters low-power state and no network-related operations are available. 
     * @param toggle Boolean: `true` to enable, `false` to disable. Defaults to `true`.
     * @return Promise for call completion
     */
    public async callEnable(toggle: boolean = true) {

    }

    /** 
     * @hidden
     * List configured packet data bearers (EPS Bearers, PDP Contexts, or CDMA2000 Packet Data Sessions).
     * @deprecated since ModemManager 1.10.0. Use "Bearers" property instead.
     * @return Promise of an array of `Bearer` objects
     */
    public async callListBearers() {

    }

    /**
     * Create a new packet data bearer using the given characteristics.
     * This request may fail if the modem does not support additional bearers, if too many bearers are already defined, or if properties are invalid.
     * The properties allowed are any of the ones defined in the bearer properties.
     * @param bearerProperties Object: Dictionary of properties needed to get the bearer connected
     * @return Promise of the new `Bearer` object, or `null` on a failure
     */
    public async callCreateBearer(bearerProperties: Partial<BearerProperties>): Promise<Bearer> {
        return new Promise(async (resolve, reject) => {
            try {
                let bearerPath = await call(this._modemInterface, 'CreateBearer', bearerProperties);
                let bearer = await Bearer.init(this._bus, bearerPath);
                resolve(bearer);
            } catch(e) {
                reject(e);
            }
        });
    }

    /**
     * @hidden
     * Delete an existing packet data bearer.
     * If the bearer is currently active and providing packet data server, it will be disconnected and that packet data service will terminate. 
     * @param objectPath String: Object path of the bearer to delete
     * @return Promise for call completion
     */
    public async callDeleteBearer(objectPath: string) {

    }

    /**
     * @hidden
     * Clear non-persistent configuration and state, and return the device to a newly-powered-on state.
     * This command may power-cycle the device. 
     * @return Promise for call completion
     */
    public async callReset() {

    }

    /**
     * @hidden
     * Clear the modem's configuration (including persistent configuration and state), and return the device to a factory-default state.
     * If not required by the modem, code may be ignored.
     * This command may or may not power-cycle the device. 
     * @param code optional - String: carrier-supplied code required to reset the modem
     * @return Promise for call completion
     */
    public async callFactoryReset(code?: string) {

    }

    /**
     * @hidden
     * Set the power state of the modem. This action can only be run when the modem is in MM_MODEM_STATE_DISABLED state.
     * @param state ModemPowerState: A ModemPowerState value, to specify the desired power state
     * @return Promise for call completion
     */
    public async callSetPowerState(state: ModemPowerState | number) {

    }

    /**
     * @hidden
     * Set the capabilities of the device.
     * The given bitmask should be supported by the modem, as specified in the "SupportedCapabilities" property.
     * This command may power-cycle the device.
     * @param capabilities Bitmask of ModemCapability values, to specify the capabilities to use
     * @return Promise for call completion
     */
    public async callSetCurrentCapabilities(capabilities: number | ModemCapability) {

    }

    /**
     * @hidden
     * Set the access technologies (e.g. 2G/3G/4G preference) the device is currently allowed to use when connecting to a network.
     * The given combination should be supported by the modem, as specified in the "SupportedModes" property. 
     * @param modes Bitmask of ModemMode values, specifying the allowed modes
     * @param preferred optional - ModemMode value of the preferred mode, if any
     * @return Promise for call completion
     */
    public async callSetCurrentModes(modes: number | ModemMode, preferred?: ModemMode | number) {

    }

    /**
     * @hidden
     * Set the radio frequency and technology bands the device is currently allowed to use when connecting to a network.
     * @param bands Array: List of ModemBand values, to specify the bands to be used
     * @return Promise for call completion
     */
    public async callSetCurrentBands(bands: ModemBand[] | number[]) {

    }

    /**
     * @hidden
     * Selects which SIM slot to be considered as primary, on devices that expose multiple slots in the "SimSlots" property.
     * When the switch happens the modem may require a full device reprobe, so the modem object in DBus will get removed, and recreated once the selected SIM slot is in use.
     * There is no limitation on which SIM slot to select, so the user may also set as primary a slot that doesn't currently have any valid SIM card inserted. 
     * @param slot Integer: SIM slot number to set as primary
     * @return Promise for call completion
     */
    public async callSetPrimarySimSlot(slot: number) {

    }

    /**
     * @hidden
     * Send an arbitrary AT command to a modem and get the response.
     * Note that using this interface call is only allowed when running ModemManager in debug mode or if the project was built using the with-at-command-via-dbus configure option. 
     * @param cmd String: The command string, e.g. "AT+GCAP" or "+GCAP" (leading AT is inserted if necessary)
     * @param timeout optional - Integer: The number of seconds to wait for a response. Defaults to 5.
     * @return Promise of the modem's response
     */
    public async callCommand(cmd: string, timeout: number = 5) {

    }

    private _listenForPropertyChanges() {
        signal(this._propertiesInterface, "PropertiesChanged").subscribe(async (propertyChangeInfo: any[]) => {
            let changedProperties: Partial<ModemProperties> = propertyChangeInfo[1];
            Object.assign(this._properties, changedProperties);
            this._propertiesSubject.next(this._properties);
        })
    }

    public close() {
        this.sim?.close();
    }
}