/**
 * An object with properties named after the object path to each available 
 * Access Point (ie '/org/freedesktop/NetworkManager/AccessPoint/247987').
 * The value of each entry being the AccessPoint's current properties.
 */
export type AccessPointMap = {
    [key: string]: AccessPointProperties
};

/**
 * The type of a device enumerated by Network Manager
 * @readonly
 * @enum {number}
 */
export enum DeviceType {
    /** @member {number} */
    /** unknown device */
    UNKNOWN = 0,
    /** @member {number} */
    /** generic support for unrecognized device types */
    GENERIC = 14,
    /** @member {number} */
    /** a wired ethernet device */
    ETHERNET = 1,
    /** @member {number} */
    /** an 802.11 Wi-Fi device */
    WIFI = 2,
    /** @member {number} */
    /** not used */
    UNUSED1 = 3,
    /** @member {number} */
    /** not used */
    UNUSED2 = 4,
    /** @member {number} */
    /** a Bluetooth device supporting PAN or DUN access protocols */
    BT = 5,
    /** @member {number} */
    /** an OLPC XO mesh networking device */
    OLPC_MESH = 6,
    /** @member {number} */
    /** an 802.16e Mobile WiMAX broadband device */
    WIMAX = 7,
    /** @member {number} */
    /** a modem supporting analog telephone, CDMA/EVDO, GSM/UMTS, or LTE network access protocols */
    MODEM = 8,
    /** @member {number} */
    /** an IP-over-InfiniBand device */
    INFINIBAND = 9,
    /** @member {number} */
    /** a bond master interface */
    BOND = 10,
    /** @member {number} */
    /** an 802.1Q VLAN interface */
    VLAN = 11,
    /** @member {number} */
    /** ADSL modem */
    ADSL = 12,
    /** @member {number} */
    /** a bridge master interface */
    BRIDGE = 13,
    /** @member {number} */
    /** a team master interface */
    TEAM = 15,
    /** @member {number} */
    /** a TUN or TAP interface */
    TUN = 16,
    /** @member {number} */
    /** a IP tunnel interface */
    IP_TUNNEL = 17,
    /** @member {number} */
    /** a MACVLAN interface */
    MACVLAN = 18,
    /** @member {number} */
    /** a VXLAN interface */
    VXLAN = 19,
    /** @member {number} */
    /** a VETH interface */
    VETH = 20,
    /** @member {number} */
    /** a MACsec interface */
    MACSEC = 21,
    /** @member {number} */
    /** a dummy interface */
    DUMMY = 22,
    /** @member {number} */
    /** a PPP interface */
    PPP = 23,
    /** @member {number} */
    /** a Open vSwitch interface */
    OVS_INTERFACE = 24,
    /** @member {number} */
    /** a Open vSwitch port */
    OVS_PORT = 25,
    /** @member {number} */
    /** a Open vSwitch bridge */
    OVS_BRIDGE = 26,
    /** @member {number} */
    /** a IEEE 802.15.4 (WPAN) MAC Layer Device */
    WPAN = 27,
    /** @member {number} */
    /** 6LoWPAN interface */
    LOWPAN = 28,
    /** @member {number} */
    /** a WireGuard interface */
    WIREGUARD = 29,
    /** @member {number} */
    /** an 802.11 Wi-Fi P2P device */
    WIFI_P2P = 30,
    /** @member {number} */
    /** A VRF (Virtual Routing and Forwarding) interface */
    VRF = 31,
}

/**
 * 802.11 access point flags
 * @enum {number}
 */
export enum AccessPointFlags {
    /** @member {number} */
    /** access point has no special capabilities */
    NONE = 0x00000000,
    /** @member {number} */
    /** access point requires authentication and encryption (usually means WEP) */
    PRIVACY = 0x00000001,
    /** @member {number} */
    /** access point supports some WPS method */
    WPS = 0x00000002,
    /** @member {number} */
    /** access point supports push-button WPS */
    WPS_PBC = 0x00000004,
    /** @member {number} */
    /** access point supports PIN-based WPS */
    WPS_PIN = 0x00000008,
}

/**
 * 802.11 access point security and authentication flags. 
 * These flags describe the current security requirements of an access point as determined from the access point's beacon.
 * @enum {number}
 */
export enum AccessPointSecurityFlags {
    /** @member {number} */
    /** the access point has no special security requirements */
    NONE = 0x00000000,
    /** @member {number} */
    /** 40/64-bit WEP is supported for pairwise/unicast encryption */
    PAIR_WEP40 = 0x00000001,
    /** @member {number} */
    /** 104/128-bit WEP is supported for pairwise/unicast encryption */
    PAIR_WEP104 = 0x00000002,
    /** @member {number} */
    /** TKIP is supported for pairwise/unicast encryption */
    PAIR_TKIP = 0x00000004,
    /** @member {number} */
    /** AES/CCMP is supported for pairwise/unicast encryption */
    PAIR_CCMP = 0x00000008,
    /** @member {number} */
    /** 40/64-bit WEP is supported for group/broadcast encryption */
    GROUP_WEP40 = 0x00000010,
    /** @member {number} */
    /** 104/128-bit WEP is supported for group/broadcast encryption */
    GROUP_WEP104 = 0x00000020,
    /** @member {number} */
    /** TKIP is supported for group/broadcast encryption */
    GROUP_TKIP = 0x00000040,
    /** @member {number} */
    /** AES/CCMP is supported for group/broadcast encryption */
    GROUP_CCMP = 0x00000080,
    /** @member {number} */
    /** WPA/RSN Pre-Shared Key encryption is supported */
    KEY_MGMT_PSK = 0x00000100,
    /** @member {number} */
    /** 802.1x authentication and key management is supported */
    KEY_MGMT_802_1X = 0x00000200,
    /** @member {number} */
    /** WPA/RSN Simultaneous Authentication of Equals is supported */
    KEY_MGMT_SAE = 0x00000400,
    /** @member {number} */
    /** WPA/RSN Opportunistic Wireless Encryption is supported */
    KEY_MGMT_OWE = 0x00000800,
    /** @member {number} */
    /** WPA/RSN Opportunistic Wireless Encryption transition mode is supported. Since: 1.26. */
    KEY_MGMT_OWE_TM = 0x00001000,
}

/**
 * Indicates the wireless mode of a wireless device
 */
export enum WirelessMode {
    /** @member {number} */
    /** the device or access point mode is unknown */
    UNKNOWN = 0,
    /** @member {number} */
    /** for both devices and access point objects, indicates the object is part of an Ad-Hoc 802.11 network without a central coordinating access point. */
    ADHOC = 1,
    /** @member {number} */
    /** the device or access point is in infrastructure mode. For devices, this indicates the device is an 802.11 client/station. For access point objects, this indicates the object is an access point that provides connectivity to clients. */
    INFRA = 2,
    /** @member {number} */
    /** the device is an access point/hotspot. Not valid for access point objects; used only for hotspot mode on the local machine. */
    AP = 3,
    /** @member {number} */
    /** the device is a 802.11s mesh point. Since: 1.20. */
    MESH = 4,
}

/**
 * Indicates whether or not a connection is Metered
 * @readonly
 * @enum {number}
 */
export enum Metered {
    /** @member {number} */
    /** The metered status is unknown */
    UNKNOWN = 0,
    /** @member {number} */
    /** Metered, the value was explicitly configured */
    YES = 1,
    /** @member {number} */
    /** Not metered, the value was explicitly configured */
    NO = 2,
    /** @member {number} */
    /** Metered, the value was guessed */
    GUESS_YES = 3, 
    /** @member {number} */
    /** Not metered, the value was guessed */
    GUESS_NO = 4,
}

/**
 * The state of the Network Manager
 * Useful for graphical applications that want to reflect the overall state of network connectivity
 * @readonly
 * @enum {number}
 */
export enum NetworkManagerState {
    /** @member {number} */
    /** Networking state is unknown. This indicates a daemon error that makes it unable to reasonably assess the state. In such event the applications are expected to assume Internet connectivity might be present and not disable controls that require network access. The graphical shells may hide the network accessibility indicator altogether since no meaningful status indication can be provided. */
    UNKNOWN = 0,
    /** @member {number} */
    /** Networking is not enabled, the system is being suspended or resumed from suspend. */
    ASLEEP = 10,
    /** @member {number} */
    /** There is no active network connection. The graphical shell should indicate no network connectivity and the applications should not attempt to access the network. */
    DISCONNECTED = 20,
    /** @member {number} */
    /** Network connections are being cleaned up. The applications should tear down their network sessions. */
    DISCONNECTING = 30,
    /** @member {number} */
    /** A network connection is being started The graphical shell should indicate the network is being connected while the applications should still make no attempts to connect the network. */
    CONNECTING = 40,
    /** @member {number} */
    /** There is only local IPv4 and/or IPv6 connectivity, but no default route to access the Internet. The graphical shell should indicate no network connectivity. */
    CONNECTED_LOCAL = 50,
    /** @member {number} */
    /** There is only site-wide IPv4 and/or IPv6 connectivity. This means a default route is available, but the Internet connectivity check (see "Connectivity" property) did not succeed. The graphical shell should indicate limited network connectivity. */
    CONNECTED_SITE = 60,
    /** @member {number} */
    /** There is global IPv4 and/or IPv6 Internet connectivity This means the Internet connectivity check succeeded, the graphical shell should indicate full network connectivity. */
    CONNECTED_GLOBAL = 70,
}

/**
 * The state of a connection
 * Useful for graphical applications that want to handle specific connection scenarios
 * @readonly
 * @enum {number}
 */
export enum ConnectivityState {
    /** @member {number} */
    /** Network connectivity is unknown. This means the connectivity checks are disabled (e.g. on server installations) or has not run yet. The graphical shell should assume the Internet connection might be available and not present a captive portal window. */
    UNKNOWN = 0,
    /** @member {number} */
    /** The host is not connected to any network. There's no active connection that contains a default route to the internet and thus it makes no sense to even attempt a connectivity check. The graphical shell should use this state to indicate the network connection is unavailable. */
    NONE = 1,
    /** @member {number} */
    /** The Internet connection is hijacked by a captive portal gateway. The graphical shell may open a sandboxed web browser window (because the captive portals typically attempt a man-in-the-middle attacks against the https connections) for the purpose of authenticating to a gateway and retrigger the connectivity check with CheckConnectivity() when the browser window is dismissed. */
    PORTAL = 2,
    /** @member {number} */
    /** The host is connected to a network, does not appear to be able to reach the full Internet, but a captive portal has not been detected. */
    LIMITED = 3,
    /** @member {number} */
    /** The host is connected to a network, and appears to be able to reach the full Internet. */
    FULL = 4,
}

/**
 * The state of a device managed by Network Manager (i.e. ethernet or wifi state)
 * Useful for reflecting the overall state of an ethernet or wifi device
 * @readonly
 * @enum {number}
 */
export enum DeviceState {
    /** @member {number} */
    /** the device's state is unknown */
    UNKNOWN = 0,
    /** @member {number} */
    /** the device is recognized, but not managed by NetworkManager */
    UNMANAGED = 10,
    /** @member {number} */
    /** the device is managed by NetworkManager, but is not available for use. Reasons may include the wireless switched off, missing firmware, no ethernet carrier, missing supplicant or modem manager, etc. */
    UNAVAILABLE = 20,
    /** @member {number} */
    /** the device can be activated, but is currently idle and not connected to a network. */
    DISCONNECTED = 30,
    /** @member {number} */
    /** the device is preparing the connection to the network. This may include operations like changing the MAC address, setting physical link properties, and anything else required to connect to the requested network. */
    PREPARE = 40,
    /** @member {number} */
    /** the device is connecting to the requested network. This may include operations like associating with the Wi-Fi AP, dialing the modem, connecting to the remote Bluetooth device, etc. */
    CONFIG = 50,
    /** @member {number} */
    /** the device requires more information to continue connecting to the requested network. This includes secrets like WiFi passphrases, login passwords, PIN codes, etc. */
    NEED_AUTH = 60,
    /** @member {number} */
    /** the device is requesting IPv4 and/or IPv6 addresses and routing information from the network. */
    IP_CONFIG = 70,
    /** @member {number} */
    /** the device is checking whether further action is required for the requested network connection. This may include checking whether only local network access is available, whether a captive portal is blocking access to the Internet, etc. */
    IP_CHECK = 80,
    /** @member {number} */
    /** the device is waiting for a secondary connection (like a VPN) which must activated before the device can be activated */
    SECONDARIES = 90,
    /** @member {number} */
    /** the device has a network connection, either local or global. */
    ACTIVATED = 100,
    /** @member {number} */
    /** a disconnection from the current network connection was requested, and the device is cleaning up resources used for that connection. The network connection may still be valid. */
    DEACTIVATING = 110,
    /** @member {number} */
    /** the device failed to connect to the requested network and is cleaning up the connection request */
    FAILED = 120,
}

/**
 * Device state change reason codes
 */
export enum DeviceStateReason {
    /** @member {number} */
    /** No reason given */
    REASON_NONE = 0,

    /** @member {number} */
    /** Unknown error */
    REASON_UNKNOWN = 1,

    /** @member {number} */
    /** Device is now managed */
    REASON_NOW_MANAGED = 2,

    /** @member {number} */
    /** Device is now unmanaged */
    REASON_NOW_UNMANAGED = 3,

    /** @member {number} */
    /** The device could not be readied for configuration */
    REASON_CONFIG_FAILED = 4,

    /** @member {number} */
    /** IP configuration could not be reserved (no available address, timeout, etc) */
    REASON_IP_CONFIG_UNAVAILABLE = 5,

    /** @member {number} */
    /** The IP config is no longer valid */
    REASON_IP_CONFIG_EXPIRED = 6,

    /** @member {number} */
    /** Secrets were required, but not provided */
    REASON_NO_SECRETS = 7,

    /** @member {number} */
    /** 802.1x supplicant disconnected */
    REASON_SUPPLICANT_DISCONNECT = 8,

    /** @member {number} */
    /** 802.1x supplicant configuration failed */
    REASON_SUPPLICANT_CONFIG_FAILED = 9,

    /** @member {number} */
    /** 802.1x supplicant failed */
    REASON_SUPPLICANT_FAILED = 10,

    /** @member {number} */
    /** 802.1x supplicant took too long to authenticate */
    REASON_SUPPLICANT_TIMEOUT = 11,

    /** @member {number} */
    /** PPP service failed to start */
    REASON_PPP_START_FAILED = 12,

    /** @member {number} */
    /** PPP service disconnected */
    REASON_PPP_DISCONNECT = 13,

    /** @member {number} */
    /** PPP failed */
    REASON_PPP_FAILED = 14,

    /** @member {number} */
    /** DHCP client failed to start */
    REASON_DHCP_START_FAILED = 15,

    /** @member {number} */
    /** DHCP client error */
    REASON_DHCP_ERROR = 16,

    /** @member {number} */
    /** DHCP client failed */
    REASON_DHCP_FAILED = 17,

    /** @member {number} */
    /** Shared connection service failed to start */
    REASON_SHARED_START_FAILED = 18,

    /** @member {number} */
    /** Shared connection service failed */
    REASON_SHARED_FAILED = 19,

    /** @member {number} */
    /** AutoIP service failed to start */
    REASON_AUTOIP_START_FAILED = 20,

    /** @member {number} */
    /** AutoIP service error */
    REASON_AUTOIP_ERROR = 21,

    /** @member {number} */
    /** AutoIP service failed */
    REASON_AUTOIP_FAILED = 22,

    /** @member {number} */
    /** The line is busy */
    REASON_MODEM_BUSY = 23,

    /** @member {number} */
    /** No dial tone */
    REASON_MODEM_NO_DIAL_TONE = 24,

    /** @member {number} */
    /** No carrier could be established */
    REASON_MODEM_NO_CARRIER = 25,

    /** @member {number} */
    /** The dialing request timed out */
    REASON_MODEM_DIAL_TIMEOUT = 26,

    /** @member {number} */
    /** The dialing attempt failed */
    REASON_MODEM_DIAL_FAILED = 27,

    /** @member {number} */
    /** Modem initialization failed */
    REASON_MODEM_INIT_FAILED = 28,

    /** @member {number} */
    /** Failed to select the specified APN */
    REASON_GSM_APN_FAILED = 29,

    /** @member {number} */
    /** Not searching for networks */
    REASON_GSM_REGISTRATION_NOT_SEARCHING = 30,

    /** @member {number} */
    /** Network registration denied */
    REASON_GSM_REGISTRATION_DENIED = 31,

    /** @member {number} */
    /** Network registration timed out */
    REASON_GSM_REGISTRATION_TIMEOUT = 32,

    /** @member {number} */
    /** Failed to register with the requested network */
    REASON_GSM_REGISTRATION_FAILED = 33,

    /** @member {number} */
    /** PIN check failed */
    REASON_GSM_PIN_CHECK_FAILED = 34,

    /** @member {number} */
    /** Necessary firmware for the device may be missing */
    REASON_FIRMWARE_MISSING = 35,

    /** @member {number} */
    /** The device was removed */
    REASON_REMOVED = 36,

    /** @member {number} */
    /** NetworkManager went to sleep */
    REASON_SLEEPING = 37,

    /** @member {number} */
    /** The device's active connection disappeared */
    REASON_CONNECTION_REMOVED = 38,

    /** @member {number} */
    /** Device disconnected by user or client */
    REASON_USER_REQUESTED = 39,

    /** @member {number} */
    /** Carrier/link changed */
    REASON_CARRIER = 40,

    /** @member {number} */
    /** The device's existing connection was assumed */
    REASON_CONNECTION_ASSUMED = 41,

    /** @member {number} */
    /** The supplicant is now available */
    REASON_SUPPLICANT_AVAILABLE = 42,

    /** @member {number} */
    /** The modem could not be found */
    REASON_MODEM_NOT_FOUND = 43,

    /** @member {number} */
    /** The Bluetooth connection failed or timed out */
    REASON_BT_FAILED = 44,

    /** @member {number} */
    /** GSM Modem's SIM Card not inserted */
    REASON_GSM_SIM_NOT_INSERTED = 45,

    /** @member {number} */
    /** GSM Modem's SIM Pin required */
    REASON_GSM_SIM_PIN_REQUIRED = 46,

    /** @member {number} */
    /** GSM Modem's SIM Puk required */
    REASON_GSM_SIM_PUK_REQUIRED = 47,

    /** @member {number} */
    /** GSM Modem's SIM wrong */
    REASON_GSM_SIM_WRONG = 48,

    /** @member {number} */
    /** InfiniBand device does not support connected mode */
    REASON_INFINIBAND_MODE = 49,

    /** @member {number} */
    /** A dependency of the connection failed */
    REASON_DEPENDENCY_FAILED = 50,

    /** @member {number} */
    /** Problem with the RFC 2684 Ethernet over ADSL bridge */
    REASON_BR2684_FAILED = 51,

    /** @member {number} */
    /** ModemManager not running */
    REASON_MODEM_MANAGER_UNAVAILABLE = 52,

    /** @member {number} */
    /** The Wi-Fi network could not be found */
    REASON_SSID_NOT_FOUND = 53,

    /** @member {number} */
    /** A secondary connection of the base connection failed */
    REASON_SECONDARY_CONNECTION_FAILED = 54,

    /** @member {number} */
    /** DCB or FCoE setup failed */
    REASON_DCB_FCOE_FAILED = 55,

    /** @member {number} */
    /** teamd control failed */
    REASON_TEAMD_CONTROL_FAILED = 56,

    /** @member {number} */
    /** Modem failed or no longer available */
    REASON_MODEM_FAILED = 57,

    /** @member {number} */
    /** Modem now ready and available */
    REASON_MODEM_AVAILABLE = 58,

    /** @member {number} */
    /** SIM PIN was incorrect */
    REASON_SIM_PIN_INCORRECT = 59,

    /** @member {number} */
    /** New connection activation was enqueued */
    REASON_NEW_ACTIVATION = 60,

    /** @member {number} */
    /** the device's parent changed */
    REASON_PARENT_CHANGED = 61,

    /** @member {number} */
    /** the device parent's management changed */
    REASON_PARENT_MANAGED_CHANGED = 62,

    /** @member {number} */
    /** problem communicating with Open vSwitch database */
    REASON_OVSDB_FAILED = 63,

    /** @member {number} */
    /** a duplicate IP address was detected */
    REASON_IP_ADDRESS_DUPLICATE = 64,

    /** @member {number} */
    /** The selected IP method is not supported */
    REASON_IP_METHOD_UNSUPPORTED = 65,

    /** @member {number} */
    /** configuration of SR-IOV parameters failed */
    REASON_SRIOV_CONFIGURATION_FAILED = 66,

    /** @member {number} */
    /** The Wi-Fi P2P peer could not be found */
    REASON_PEER_NOT_FOUND = 67,
}

/**
 * Wi-Fi Access Point
 *
 * @link https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.AccessPoint.html
 */
export interface AccessPointProperties {
    /** @member {number} */
    /** 
     * Flags describing the capabilities of the access point. 
     * 
     * @see AccessPointFlags
     * */
    Flags: number;

    /** @member {number} */
    /** 
     * Flags describing the access point's capabilities according to WPA (Wifi Protected Access).
     *  
     * @see AccessPointSecurityFlags
     * */
    WpaFlags: number;

    /** @member {number} */
    /** 
     * Flags describing the access point's capabilities according to the RSN (Robust Secure Network) protocol.
     * 
     * @see AccessPointSecurityFlags
     *  */
    RsnFlags: number;

    //Returns: NM80211ApSecurityFlags
    /** @member {string} */
    /** The Service Set Identifier identifying the access point. */
    Ssid: string;

    /** @member {number} */
    /** The radio channel frequency in use by the access point, in MHz. */
    Frequency: number;

    /** @member {string} */
    /** The hardware address (BSSID) of the access point. */
    HwAddress: string;

    /** @member {number} */
    /** Describes the operating mode of the access point. */
    Mode: number;

    //Returns: NM80211Mode
    /** @member {number} */
    /** The maximum bitrate this access point is capable of, in kilobits/second (Kb/s). */
    MaxBitrate: number;

    /** @member {number} */
    /** The current signal quality of the access point, in percent. */
    Strength: number;

    /** @member {number} */
    /** The timestamp (in CLOCK_BOOTTIME seconds) for the last time the access point was found in scan results. A value of -1 means the access point has never been found in scan results. */
    LastSeen: number;
}

/**
 * Properties for the NetworkManager
 * @see https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.html
 */
export interface NetworkManagerProperties {
    /** The list of realized network devices. Realized devices are those which have backing resources (eg from the kernel or a management daemon like ModemManager, teamd, etc). */
    Devices: DevicePath[];

    /** The list of both realized and un-realized network devices. Un-realized devices are software devices which do not yet have backing resources, but for which backing resources can be created if the device is activated. */
    AllDevices: DevicePath[];

    /** @member {any[]} */
    /** The list of active checkpoints. */
    Checkpoints: any[];

    /** @member {boolean} */
    /** Indicates if overall networking is currently enabled or not. See the Enable() method. */
    NetworkingEnabled: boolean;

    /** @member {boolean} */
    /** Indicates if wireless is currently enabled or not. */
    WirelessEnabled: boolean;

    /** @member {boolean} */
    /** Indicates if the wireless hardware is currently enabled, i.e. the state of the RF kill switch. */
    WirelessHardwareEnabled: boolean;

    /** @member {boolean} */
    /** Indicates if mobile broadband devices are currently enabled or not. */
    WwanEnabled: boolean;

    /** @member {boolean} */
    /** Indicates if the mobile broadband hardware is currently enabled, i.e. the state of the RF kill switch. */
    WwanHardwareEnabled: boolean;

    /** @member {boolean} */
    /** DEPRECATED. Doesn't have any meaning and is around only for compatibility reasons. */
    WimaxEnabled: boolean;

    /** @member {boolean} */
    /** DEPRECATED. Doesn't have any meaning and is around only for compatibility reasons. */
    WimaxHardwareEnabled: boolean;

    /** List of active connection object paths. */
    ActiveConnections: ActiveConnectionPath[];

    /** The object path of the "primary" active connection being used to access the network. In particular, if there is no VPN active, or the VPN does not have the default route, then this indicates the connection that has the default route. If there is a VPN active with the default route, then this indicates the connection that contains the route to the VPN endpoint. */
    PrimaryConnection: ActiveConnectionPath;

    /** @member {string} */
    /** The connection type of the "primary" active connection being used to access the network. This is the same as the Type property on the object indicated by PrimaryConnection. */
    PrimaryConnectionType: string;

    /** Indicates whether the connectivity is metered. This is equivalent to the metered property of the device associated with the primary connection. */
    Metered: Metered;

    /** The object path of an active connection that is currently being activated and which is expected to become the new PrimaryConnection when it finishes activating. */
    ActivatingConnection: ActiveConnectionPath;

    /** @member {boolean} */
    /** Indicates whether NM is still starting up; this becomes FALSE when NM has finished attempting to activate every connection that it might be able to activate at startup. */
    Startup: boolean;

    /** @member {string} */
    /** NetworkManager version. */
    Version: string;

    /** @member {number[]} */
    /** The current set of capabilities. See NMCapability for currently defined capability numbers. The array is guaranteed to be sorted in ascending order without duplicates. */
    Capabilities: number[];

    /** @member {number} */
    /** 
     * The overall state of the NetworkManager daemon. 
     * This takes state of all active connections and the connectivity state into account to produce a single indicator of the network accessibility status.
     * The graphical shells may use this property to provide network connection status indication and applications may use this to check if Internet connection is accessible. 
     * Shell that is able to cope with captive portals should use the "Connectivity" property to decide whether to present a captive portal authentication dialog.
    */
    State: NetworkManagerState;

    /** 
     * The result of the last connectivity check. 
     * The connectivity check is triggered automatically when a default connection becomes available, periodically and by calling a CheckConnectivity() method.
     * This property is in general useful for the graphical shell to determine whether the Internet access is being hijacked by an authentication gateway (a "captive portal"). 
     * In such case it would typically present a web browser window to give the user a chance to authenticate and call CheckConnectivity() when the user submits a form or dismisses the window.
     * To determine the whether the user is able to access the Internet without dealing with captive portals (e.g. to provide a network connection indicator or disable controls that require Internet access), the "State" property is more suitable. 
     * */
    Connectivity: ConnectivityState;


    /** @member {boolean} */
    /** 
     * Indicates whether connectivity checking service has been configured. This may return true even if the service is not currently enabled. 
     * This is primarily intended for use in a privacy control panel, as a way to determine whether to show an option to enable/disable the feature.
     * @see https://developer-old.gnome.org/NetworkManager/stable/NetworkManager.conf.html Specifically the "connectivity section" near the bottom
     */
    ConnectivityCheckAvailable: boolean;

    /** @member {boolean} */
    /** Indicates whether connectivity checking is enabled. This property can also be written to to disable connectivity checking (as a privacy control panel might want to do). */
    ConnectivityCheckEnabled: boolean;

    /** @member {string} */
    /**
     * The URI that NetworkManager will hit to check if there is internet connectivity. 
     * @see https://developer-old.gnome.org/NetworkManager/stable/NetworkManager.conf.html Specifically the "connectivity section" near the bottom
     */
    ConnectivityCheckUri: string;

    /** @member {any} */
    /** 
     * Dictionary of global DNS settings where the key is one of "searches", "options" and "domains". 
     * The values for the "searches" and "options" keys are string arrays describing the list of search domains and resolver options, respectively. 
     * The value of the "domains" key is a second-level dictionary, where each key is a domain name, and each key's value is a third-level dictionary with the keys "servers" and "options". 
     * "servers" is a string array of DNS servers, "options" is a string array of domain-specific options.
     */
    GlobalDnsConfiguration: any;
}

/**
 * Properties for a connection profile
 * This is incomplete and only contains a few common properties
 * @see https://developer.gnome.org/NetworkManager/unstable/nm-settings-dbus.html
 */
export interface ConnectionProfile {
    connection: {
        id: string;
        'interface-name'?: string;
        type: string;
        uuid: string;
    },
    ipv4: any,
    ipv6: any,
    proxy?: {},
    [key: string]: any
}

/**
 * Properties for the connection settings manager
 * @see https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.Settings.html
 */
export interface ConnectionSettingsManagerProperties {
    /** List of object paths of available network connection profiles. */
    Connections: ConnectionProfilePath[];

    /** @member {string} */
    /** The machine hostname stored in persistent configuration. */
    Hostname: string;

    /** @member {boolean} */
    /** If true, adding and modifying connections is supported. */
    CanModify: boolean;
}

interface DeviceProperties {
    /** @member {string} */
    /** Operating-system specific transient device hardware identifier. This is an opaque string representing the underlying hardware for the device, and shouldn't be used to keep track of individual devices. For some device types (Bluetooth, Modems) it is an identifier used by the hardware service (ie bluez or ModemManager) to refer to that device, and client programs use it get additional information from those services which NM does not provide. The Udi is not guaranteed to be consistent across reboots or hotplugs of the hardware. If you're looking for a way to uniquely track each device in your application, use the object path. If you're looking for a way to track a specific piece of hardware across reboot or hotplug, use a MAC address or USB serial number. Note that non-UTF-8 characters are backslash escaped. Use g_strcompress() to obtain the true (non-UTF-8) string. */
    Udi: string;

    /** @member {string} */
    /** The path of the device as exposed by the udev property ID_PATH. Note that non-UTF-8 characters are backslash escaped. Use g_strcompress() to obtain the true (non-UTF-8) string. */
    Path: string;

    /** @member {string} */
    /** The name of the device's control (and often data) interface. Note that non UTF-8 characters are backslash escaped, so the resulting name may be longer then 15 characters. Use g_strcompress() to revert the escaping. */
    Interface: string;

    /** @member {string} */
    /** The name of the device's data interface when available. This property may not refer to the actual data interface until the device has successfully established a data connection, indicated by the device's State becoming ACTIVATED. Note that non UTF-8 characters are backslash escaped, so the resulting name may be longer then 15 characters. Use g_strcompress() to revert the escaping. */
    IpInterface: string;

    /** @member {string} */
    /** The driver handling the device. Non-UTF-8 sequences are backslash escaped. Use g_strcompress() to revert. */
    Driver: string;

    /** @member {string} */
    /** The version of the driver handling the device. Non-UTF-8 sequences are backslash escaped. Use g_strcompress() to revert. */
    DriverVersion: string;

    /** @member {string} */
    /** The firmware version for the device. Non-UTF-8 sequences are backslash escaped. Use g_strcompress() to revert. */
    FirmwareVersion: string;

    /** @member {number} */
    /** Flags describing the capabilities of the device. */
    Capabilities: number;

    /** @member {number} */
    /** IPv4 address of the device */
    Ip4Address: string | null;

    /** The current state of the device. */
    State: DeviceState;

    /** The current state and reason for changing to that state. Keys are state numbers in string format; values are DeviceStateReasons */
    StateReason: {
        [key: string]: DeviceStateReason
    };

    /** Object path of an ActiveConnection object that "owns" this device during activation. The ActiveConnection object tracks the life-cycle of a connection to a specific network and implements the org.freedesktop.NetworkManager.Connection.Active D-Bus interface. */
    ActiveConnection: ActiveConnectionPath;

    /** @member {string} */
    /** Object path of the Ip4Config object describing the configuration of the device. Only valid when the device is in the NM_DEVICE_STATE_ACTIVATED state. */
    Ip4Config: string;

    /** @member {string} */
    /** Object path of the Dhcp4Config object describing the DHCP options returned by the DHCP server. Only valid when the device is in the NM_DEVICE_STATE_ACTIVATED state. */
    Dhcp4Config: string;

    /** @member {string} */
    /** Object path of the Ip6Config object describing the configuration of the device. Only valid when the device is in the NM_DEVICE_STATE_ACTIVATED state. */
    Ip6Config: string;

    /** @member {string} */
    /** Object path of the Dhcp6Config object describing the DHCP options returned by the DHCP server. Only valid when the device is in the NM_DEVICE_STATE_ACTIVATED state. */
    Dhcp6Config: string;

    /** @member {boolean} */
    /** Whether or not this device is managed by NetworkManager. Setting this property has a similar effect to configuring the device as unmanaged via the keyfile.unmanaged-devices setting in NetworkManager.conf. Changes to this value are not persistent and lost after NetworkManager restart. */
    Managed: boolean;

    /** @member {boolean} */
    /** If TRUE, indicates the device is allowed to autoconnect. If FALSE, manual intervention is required before the device will automatically connect to a known network, such as activating a connection using the device, or setting this property to TRUE. This property cannot be set to TRUE for default-unmanaged devices, since they never autoconnect. */
    Autoconnect: boolean;

    /** @member {boolean} */
    /** If TRUE, indicates the device is likely missing firmware necessary for its operation. */
    FirmwareMissing: boolean;

    /** @member {boolean} */
    /** If TRUE, indicates the NetworkManager plugin for the device is likely missing or misconfigured. */
    NmPluginMissing: boolean;

    /** The general type of the network device; ie Ethernet, Wi-Fi, etc. */
    DeviceType: DeviceType;

    /** An array of object paths of every configured connection that is currently 'available' through this device. */
    AvailableConnections: ConnectionProfilePath[];

    /** @member {string} */
    /** If non-empty, an (opaque) indicator of the physical network port associated with the device. This can be used to recognize when two seemingly-separate hardware devices are actually just different virtual interfaces to the same physical port. */
    PhysicalPortId: string;

    /** @member {number} */
    /** The device MTU (maximum transmission unit). */
    Mtu: number;

    /** @member {number} */
    /** Whether the amount of traffic flowing through the device is subject to limitations, for example set by service providers. */
    Metered: Metered;

    /** @member {any[]} */
    /** Array of LLDP neighborstring; each element is a dictionary mapping LLDP TLV names to variant boxed values. */
    LldpNeighbors: any[];

    /** @member {boolean} */
    /** True if the device exists, or False for placeholder devices that do not yet exist but could be automatically created by NetworkManager if one of their AvailableConnections was activated. */
    Real: boolean;

    /** @member {number} */
    /** The result of the last IPv4 connectivity check. */
    Ip4Connectivity: ConnectivityState;

    /** @member {number} */
    /** The result of the last IPv6 connectivity check. */
    Ip6Connectivity: ConnectivityState;

    /** @member {number} */
    /** The flags of the network interface. See NMDeviceInterfaceFlags for the currently defined flags. */
    InterfaceFlags: number;

    /** @member {string} */
    /** The hardware address of the device. This replaces the other 'HwAddress' properties on the device-specific D-Bus interfaces. */
    HwAddress: string;
}

/**
 * Properties for the wifi device. Inherits from generic device properties.
 * @see https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.Device.html
 * @see https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.Device.Wireless.html 
 */
export interface WifiDeviceProperties extends DeviceProperties {
    /** member {string} */
    /** The active hardware address of the device. */
    HwAddress: string;

    /** member {string} */
    /** The permanent hardware address of the device. */
    PermHwAddress: string;

    /** The operating mode of the wireless device. */
    Mode: WirelessMode;

    /** member {number} */
    /** The bit rate currently used by the wireless device, in kilobits/second (Kb/s). */
    Bitrate: number;

    /** List of object paths of access point visible to this wireless device. */
    AccessPoints: AccessPointPath[];

    /** member {o} */
    /** Object path of the access point currently used by the wireless device. */
    ActiveAccessPoint: AccessPointPath;

    /** member {number} */
    /** The capabilities of the wireless device. */
    WirelessCapabilities: number;

    /** member {number} */
    /** The timestamp (in CLOCK_BOOTTIME milliseconds) for the last finished network scan. A value of -1 means the device never scanned for access points. */
    LastScan: number;
}

/**
 * Properties for the ethernet device. Inherits from generic device properties.
 * @see https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.Device.html
 * @see https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.Device.Wired.html
 */
export interface EthernetDeviceProperties extends DeviceProperties {
    /** @member {string} */
    /** Active hardware address of the device. */
    HwAddress: string;

    /** @member {string} */
    /** Permanent hardware address of the device. */
    PermHwAddress: string;

    /** @member {number} */
    /** Design speed of the device, in megabits/second (Mb/s). */
    Speed: number;

    /** @member {any[]} */
    /** Array of S/390 subchannels for S/390 or z/Architecture devices. */
    S390Subchannels: any[];

    /** @member {boolean} */
    /** Indicates whether the physical carrier is found (e.g. whether a cable is plugged in or not). */
    Carrier: boolean;
}

export type ConnectionProfilePath = string;
export type ActiveConnectionPath = string;
export type DevicePath = string;
export type AccessPointPath = string;
