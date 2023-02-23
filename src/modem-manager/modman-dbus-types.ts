/**
 * Types and interfaces for ModemManager objects, and enumeration values.
 * Up to date documentation found here: https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ref-dbus.html
 * Enumeration values and descriptions copied from: https://www.freedesktop.org/software/ModemManager/api/1.0.0/ref-dbus.html
 * 
 */

/**
 * 
 */
export enum BearerAllowedAuth {
    /** Unknown. */
    MM_BEARER_ALLOWED_AUTH_UNKNOWN = 0,

    /* - - - - - - - - - - bits 0..4 order match Ericsson device bitmap - - - - - - - - - - */
    /** None. */
    MM_BEARER_ALLOWED_AUTH_NONE = 1 << 0,

    /** PAP. */
    MM_BEARER_ALLOWED_AUTH_PAP = 1 << 1,

    /** CHAP. */
    MM_BEARER_ALLOWED_AUTH_CHAP = 1 << 2,

    /** MSCHAP. */
    MM_BEARER_ALLOWED_AUTH_MSCHAP = 1 << 3,

    /** MSCHAPV2 */
    MM_BEARER_ALLOWED_AUTH_MSCHAPV2 = 1 << 4,

    /** EAP. */
    MM_BEARER_ALLOWED_AUTH_EAP = 1 << 5,
}

/**
 * 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerAccessTypePreference
 */
export enum BearerAccessTypePreference {
    /** No access type preference, or unknown. */
    MM_BEARER_ACCESS_TYPE_PREFERENCE_NONE = 0,

    /** 3GPP access type only. */
    MM_BEARER_ACCESS_TYPE_PREFERENCE_3GPP_ONLY = 1,

    /** All access types allowed but 3GPP preferred. */
    MM_BEARER_ACCESS_TYPE_PREFERENCE_3GPP_PREFERRED = 2,

    /** Non-3GPP access type only. */
    MM_BEARER_ACCESS_TYPE_PREFERENCE_NON_3GPP_ONLY = 3
}

/**
 * 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerApnType
 */
export enum BearerApnType {
    /** Unknown or unsupported. */
    MM_BEARER_APN_TYPE_NONE = 0,
    
    /** APN used for the initial attach procedure. */
    MM_BEARER_APN_TYPE_INITIAL = 1 << 0,
    
    /** Default connection APN providing access to the Internet. */
    MM_BEARER_APN_TYPE_DEFAULT = 1 << 1,
    
    /** APN providing access to IMS services. */
    MM_BEARER_APN_TYPE_IMS = 1 << 2,
    
    /** APN providing access to MMS services. */
    MM_BEARER_APN_TYPE_MMS = 1 << 3,
    
    /** APN providing access to over-the-air device management procedures. */
    MM_BEARER_APN_TYPE_MANAGEMENT = 1 << 4,
    
    /** APN providing access to voice-over-IP services. */
    MM_BEARER_APN_TYPE_VOICE = 1 << 5,
    
    /** APN providing access to emergency services. */
    MM_BEARER_APN_TYPE_EMERGENCY = 1 << 6,
    
    /** APN providing access to private networks. */
    MM_BEARER_APN_TYPE_PRIVATE = 1 << 7,
    
    /** APN providing access to over-the-air activation sites. Since 1.20. */
    MM_BEARER_APN_TYPE_PURCHASE = 1 << 8,
    
    /** APN providing access to video sharing service. Since 1.20. */
    MM_BEARER_APN_TYPE_VIDEO_SHARE = 1 << 9,
    
    /** APN providing access to a local connection with the device. Since 1.20. */
    MM_BEARER_APN_TYPE_LOCAL = 1 << 10,
    
    /** APN providing access to certain applications allowed by mobile operators. Since 1.20. */
    MM_BEARER_APN_TYPE_APP = 1 << 12,
    
    /** APN providing access to XCAP provisioning on IMS services. Since 1.20. */
    MM_BEARER_APN_TYPE_XCAP = 1 << 13,
    
    /** APN providing access to mobile hotspot tethering. Since 1.20. */
    MM_BEARER_APN_TYPE_TETHERING = 1 << 14
}

/**
 * 
 */
export enum BearerIpFamily {
    /** None or unknown. */
    MM_BEARER_IP_FAMILY_NONE = 0,

    /** IPv4. */
    MM_BEARER_IP_FAMILY_IPV4 = 1 << 0,

    /** IPv6. */
    MM_BEARER_IP_FAMILY_IPV6 = 1 << 1,

    /** IPv4 and IPv6. */
    MM_BEARER_IP_FAMILY_IPV4V6 = 1 << 2,

    /** Mask specifying all IP families. */
    MM_BEARER_IP_FAMILY_ANY = 0xFFFFFFFF
}

/**
 * 
 */
export enum BearerIpMethod {
    /** Unknown method. */
    MM_BEARER_IP_METHOD_UNKNOWN = 0,

    /** Use PPP to get the address. */
    MM_BEARER_IP_METHOD_PPP = 1,

    /** Use the provided static IP configuration given by the modem to configure the IP data interface. */
    MM_BEARER_IP_METHOD_STATIC = 2,

    /** Begin DHCP on the data interface to obtain necessary IP configuration details. */
    MM_BEARER_IP_METHOD_DHCP = 3
}

/**
 * 
 */
export enum BearerMultiplexSupport {
    /** Unknown. */
    MM_BEARER_MULTIPLEX_SUPPORT_UNKNOWN = 0,

    /** No multiplex support should be used. */
    MM_BEARER_MULTIPLEX_SUPPORT_NONE = 1,

    /** If available, multiplex support should be used. */
    MM_BEARER_MULTIPLEX_SUPPORT_REQUESTED = 2,

    /** Multiplex support must be used or otherwise the connection attempt will fail. */
    MM_BEARER_MULTIPLEX_SUPPORT_REQUIRED = 3
}

/**
 * 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerProfileSource
 */
export enum BearerProfileSource {
    /** Unknown. */
    MM_BEARER_PROFILE_SOURCE_UNKNOWN = 0,

    /** Profile created by an enterprise IT admin from the OS. */
    MM_BEARER_PROFILE_SOURCE_ADMIN = 1,

    /** Profile created by the user. */
    MM_BEARER_PROFILE_SOURCE_USER = 2,

    /** Profile created by the operator through OMA-DM or similar. */
    MM_BEARER_PROFILE_SOURCE_OPERATOR = 3,

    /** Profile created by the OEM that was included with the modem firmware. */
    MM_BEARER_PROFILE_SOURCE_MODEM = 4,

    /** Profile created by the OS APN database. */
    MM_BEARER_PROFILE_SOURCE_DEVICE = 5
}

/**
 * 
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerRoamingAllowance
 */
export enum BearerRoamingAllowance {
    /** No explicit roaming allowance rules. */
    MM_BEARER_ROAMING_ALLOWANCE_NONE = 0,

    /** Home network allowed. */
    MM_BEARER_ROAMING_ALLOWANCE_HOME = 1 << 0,

    /** Partner network allowed. */
    MM_BEARER_ROAMING_ALLOWANCE_PARTNER = 1 << 1,

    /** Non-parter network allowed. */
    MM_BEARER_ROAMING_ALLOWANCE_NON_PARTNER = 1 << 2
}

/**
 * 
 */
export enum BearerType {
    /** Unknown bearer. */
    MM_BEARER_TYPE_UNKNOWN = 0,

    /** Primary context (2G/3G) or default bearer (4G), defined by the user of the API. */
    MM_BEARER_TYPE_DEFAULT = 1,

    /** The initial default bearer established during LTE attach procedure, automatically connected as long as the device is regitered in the LTE network. */
    MM_BEARER_TYPE_DEFAULT_ATTACH = 2,

    /** Secondary context (2G/3G) or dedicated bearer (4G), defined by the user of the API. These bearers use the same IP address used by a primary context or default bearer and provide a dedicated flow for specific traffic with different QoS settings. */
    MM_BEARER_TYPE_DEDICATED = 3
}

/**
 * A bitmask
 */
export enum ModemAccessTechnology {
    /** The access technology used is unknown. */
    MM_MODEM_ACCESS_TECHNOLOGY_UNKNOWN = 0,

    /** Analog wireline telephone. */
    MM_MODEM_ACCESS_TECHNOLOGY_POTS = 1 << 0,

    /** GSM. */
    MM_MODEM_ACCESS_TECHNOLOGY_GSM = 1 << 1,

    /** Compact GSM. */
    MM_MODEM_ACCESS_TECHNOLOGY_GSM_COMPACT = 1 << 2,

    /** GPRS. */
    MM_MODEM_ACCESS_TECHNOLOGY_GPRS = 1 << 3,

    /** EDGE (ETSI 27.007: "GSM w/EGPRS"). */
    MM_MODEM_ACCESS_TECHNOLOGY_EDGE = 1 << 4,

    /** UMTS (ETSI 27.007: "UTRAN"). */
    MM_MODEM_ACCESS_TECHNOLOGY_UMTS = 1 << 5,

    /** HSDPA (ETSI 27.007: "UTRAN w/HSDPA"). */
    MM_MODEM_ACCESS_TECHNOLOGY_HSDPA = 1 << 6,

    /** HSUPA (ETSI 27.007: "UTRAN w/HSUPA"). */
    MM_MODEM_ACCESS_TECHNOLOGY_HSUPA = 1 << 7,

    /** HSPA (ETSI 27.007: "UTRAN w/HSDPA and HSUPA"). */
    MM_MODEM_ACCESS_TECHNOLOGY_HSPA = 1 << 8,

    /** HSPA+ (ETSI 27.007: "UTRAN w/HSPA+"). */
    MM_MODEM_ACCESS_TECHNOLOGY_HSPA_PLUS = 1 << 9,

    /** CDMA2000 1xRTT. */
    MM_MODEM_ACCESS_TECHNOLOGY_1XRTT = 1 << 10,

    /** CDMA2000 EVDO revision 0. */
    MM_MODEM_ACCESS_TECHNOLOGY_EVDO0 = 1 << 11,

    /** CDMA2000 EVDO revision A. */
    MM_MODEM_ACCESS_TECHNOLOGY_EVDOA = 1 << 12,

    /** CDMA2000 EVDO revision B. */
    MM_MODEM_ACCESS_TECHNOLOGY_EVDOB = 1 << 13,

    /** LTE (ETSI 27.007: "E-UTRAN") */
    MM_MODEM_ACCESS_TECHNOLOGY_LTE = 1 << 14,

    /** Mask specifying all access technologies. */
    MM_MODEM_ACCESS_TECHNOLOGY_ANY = 0xFFFFFFFF,
}

/**
 * Not a bitmask. Counts up from 0.
 */
export enum ModemBand {
    /** Unknown or invalid band. */
    MM_MODEM_BAND_UNKNOWN = 0,

    /* - - - - - - - - - - GSM/UMTS bands - - - - - - - - - - */
    /** GSM/GPRS/EDGE 900 MHz. */
    MM_MODEM_BAND_EGSM = 1,

    /** GSM/GPRS/EDGE 1800 MHz. */
    MM_MODEM_BAND_DCS = 2,

    /** GSM/GPRS/EDGE 1900 MHz. */
    MM_MODEM_BAND_PCS = 3,

    /** GSM/GPRS/EDGE 850 MHz. */
    MM_MODEM_BAND_G850 = 4,

    /** WCDMA 2100 MHz (Class I). */
    MM_MODEM_BAND_U2100 = 5,

    /** WCDMA 3GPP 1800 MHz (Class III). */
    MM_MODEM_BAND_U1800 = 6,

    /** WCDMA 3GPP AWS 1700/2100 MHz (Class IV). */
    MM_MODEM_BAND_U17IV = 7,

    /** WCDMA 3GPP UMTS 800 MHz (Class VI). */
    MM_MODEM_BAND_U800 = 8,

    /** WCDMA 3GPP UMTS 850 MHz (Class V). */
    MM_MODEM_BAND_U850 = 9,

    /** WCDMA 3GPP UMTS 900 MHz (Class VIII). */
    MM_MODEM_BAND_U900 = 10,

    /** WCDMA 3GPP UMTS 1700 MHz (Class IX). */
    MM_MODEM_BAND_U17IX = 11,

    /** WCDMA 3GPP UMTS 1900 MHz (Class II). */
    MM_MODEM_BAND_U1900 = 12,

    /** WCDMA 3GPP UMTS 2600 MHz (Class VII, internal). */
    MM_MODEM_BAND_U2600 = 13,

    /* - - - - - - - - - - LTE bands - - - - - - - - - - */
    /** E-UTRAN band I. */
    MM_MODEM_BAND_EUTRAN_I = 31,

    /** E-UTRAN band II. */
    MM_MODEM_BAND_EUTRAN_II = 32,

    /** E-UTRAN band III. */
    MM_MODEM_BAND_EUTRAN_III = 33,

    /** E-UTRAN band IV. */
    MM_MODEM_BAND_EUTRAN_IV = 34,

    /** E-UTRAN band V. */
    MM_MODEM_BAND_EUTRAN_V = 35,

    /** E-UTRAN band VI. */
    MM_MODEM_BAND_EUTRAN_VI = 36,

    /** E-UTRAN band VII. */
    MM_MODEM_BAND_EUTRAN_VII = 37,

    /** E-UTRAN band VIII. */
    MM_MODEM_BAND_EUTRAN_VIII = 38,

    /** E-UTRAN band IX. */
    MM_MODEM_BAND_EUTRAN_IX = 39,

    /** E-UTRAN band X. */
    MM_MODEM_BAND_EUTRAN_X = 40,

    /** E-UTRAN band XI. */
    MM_MODEM_BAND_EUTRAN_XI = 41,

    /** E-UTRAN band XII. */
    MM_MODEM_BAND_EUTRAN_XII = 42,

    /** E-UTRAN band XIII. */
    MM_MODEM_BAND_EUTRAN_XIII = 43,

    /** E-UTRAN band XIV. */
    MM_MODEM_BAND_EUTRAN_XIV = 44,

    /** E-UTRAN band XVII. */
    MM_MODEM_BAND_EUTRAN_XVII = 47,

    /** E-UTRAN band XVIII. */
    MM_MODEM_BAND_EUTRAN_XVIII = 48,

    /** E-UTRAN band XIX. */
    MM_MODEM_BAND_EUTRAN_XIX = 49,

    /** E-UTRAN band XX. */
    MM_MODEM_BAND_EUTRAN_XX = 50,

    /** E-UTRAN band XXI. */
    MM_MODEM_BAND_EUTRAN_XXI = 51,

    /** E-UTRAN band XXII. */
    MM_MODEM_BAND_EUTRAN_XXII = 52,

    /** E-UTRAN band XXIII. */
    MM_MODEM_BAND_EUTRAN_XXIII = 53,

    /** E-UTRAN band XXIV. */
    MM_MODEM_BAND_EUTRAN_XXIV = 54,

    /** E-UTRAN band XXV. */
    MM_MODEM_BAND_EUTRAN_XXV = 55,

    /** E-UTRAN band XXVI. */
    MM_MODEM_BAND_EUTRAN_XXVI = 56,

    /** E-UTRAN band XXXIII. */
    MM_MODEM_BAND_EUTRAN_XXXIII = 63,

    /** E-UTRAN band XXXIV. */
    MM_MODEM_BAND_EUTRAN_XXXIV = 64,

    /** E-UTRAN band XXXV. */
    MM_MODEM_BAND_EUTRAN_XXXV = 65,

    /** E-UTRAN band XXXVI. */
    MM_MODEM_BAND_EUTRAN_XXXVI = 66,

    /** E-UTRAN band XXXVII. */
    MM_MODEM_BAND_EUTRAN_XXXVII = 67,

    /** E-UTRAN band XXXVIII. */
    MM_MODEM_BAND_EUTRAN_XXXVIII = 68,

    /** E-UTRAN band XXXIX. */
    MM_MODEM_BAND_EUTRAN_XXXIX = 69,

    /** E-UTRAN band XL. */
    MM_MODEM_BAND_EUTRAN_XL = 70,

    /** E-UTRAN band XLI. */
    MM_MODEM_BAND_EUTRAN_XLI = 71,

    /** E-UTRAN band XLII. */
    MM_MODEM_BAND_EUTRAN_XLII = 72,

    /** E-UTRAN band XLIII. */
    MM_MODEM_BAND_EUTRAN_XLIII = 73,
    
    /* - - - - - - - - - - CDMA Band Classes (see 3GPP2 C.S0057-C) - - - - - - - - - - */
    /** CDMA Band Class 0 (US Cellular 850MHz). */
    MM_MODEM_BAND_CDMA_BC0_CELLULAR_800 = 128,

    /** CDMA Band Class 1 (US PCS 1900MHz). */
    MM_MODEM_BAND_CDMA_BC1_PCS_1900 = 129,

    /** CDMA Band Class 2 (UK TACS 900MHz). */
    MM_MODEM_BAND_CDMA_BC2_TACS = 130,

    /** CDMA Band Class 3 (Japanese TACS). */
    MM_MODEM_BAND_CDMA_BC3_JTACS = 131,

    /** CDMA Band Class 4 (Korean PCS). */
    MM_MODEM_BAND_CDMA_BC4_KOREAN_PCS = 132,

    /** CDMA Band Class 5 (NMT 450MHz). */
    MM_MODEM_BAND_CDMA_BC5_NMT450 = 134,

    /** CDMA Band Class 6 (IMT2000 2100MHz). */
    MM_MODEM_BAND_CDMA_BC6_IMT2000 = 135,

    /** CDMA Band Class 7 (Cellular 700MHz). */
    MM_MODEM_BAND_CDMA_BC7_CELLULAR_700 = 136,

    /** CDMA Band Class 8 (1800MHz). */
    MM_MODEM_BAND_CDMA_BC8_1800 = 137,

    /** CDMA Band Class 9 (900MHz). */
    MM_MODEM_BAND_CDMA_BC9_900 = 138,

    /** CDMA Band Class 10 (US Secondary 800). */
    MM_MODEM_BAND_CDMA_BC10_SECONDARY_800 = 139,

    /** CDMA Band Class 11 (European PAMR 400MHz). */
    MM_MODEM_BAND_CDMA_BC11_PAMR_400 = 140,

    /** CDMA Band Class 12 (PAMR 800MHz). */
    MM_MODEM_BAND_CDMA_BC12_PAMR_800 = 141,

    /** CDMA Band Class 13 (IMT2000 2500MHz Expansion). */
    MM_MODEM_BAND_CDMA_BC13_IMT2000_2500 = 142,

    /** CDMA Band Class 14 (More US PCS 1900MHz). */
    MM_MODEM_BAND_CDMA_BC14_PCS2_1900 = 143,

    /** CDMA Band Class 15 (AWS 1700MHz). */
    MM_MODEM_BAND_CDMA_BC15_AWS = 144,

    /** CDMA Band Class 16 (US 2500MHz). */
    MM_MODEM_BAND_CDMA_BC16_US_2500 = 145,

    /** CDMA Band Class 17 (US 2500MHz Forward Link Only). */
    MM_MODEM_BAND_CDMA_BC17_US_FLO_2500 = 146,

    /** CDMA Band Class 18 (US 700MHz Public Safety). */
    MM_MODEM_BAND_CDMA_BC18_US_PS_700 = 147,

    /** CDMA Band Class 19 (US Lower 700MHz).  */
    MM_MODEM_BAND_CDMA_BC19_US_LOWER_700 = 148,

    /* - - - - - - - - - - All/Any - - - - - - - - - - */
    /** For certain operations, allow the modem to select a band automatically. */
    MM_MODEM_BAND_ANY = 256
}

/**
 * 
 */
export enum ModemCapability {
    /** Modem has no capabilities. */
    MM_MODEM_CAPABILITY_NONE = 0,

    /** Modem supports the analog wired telephone network (ie 56k dialup) and does not have wireless/cellular capabilities. */
    MM_MODEM_CAPABILITY_POTS = 1 << 0,

    /** Modem supports at least one of CDMA 1xRTT, EVDO revision 0, EVDO revision A, or EVDO revision B. */
    MM_MODEM_CAPABILITY_CDMA_EVDO = 1 << 1,

    /** Modem supports at least one of GSM, GPRS, EDGE, UMTS, HSDPA, HSUPA, or HSPA+ packet switched data capability. */
    MM_MODEM_CAPABILITY_GSM_UMTS = 1 << 2,

    /** Modem has LTE data capability. */
    MM_MODEM_CAPABILITY_LTE = 1 << 3,

    /** Modem has LTE Advanced data capability. */
    MM_MODEM_CAPABILITY_LTE_ADVANCED = 1 << 4,

    /** Modem has Iridium capabilities. */
    MM_MODEM_CAPABILITY_IRIDIUM = 1 << 5,

    /** Mask specifying all capabilities. */
    MM_MODEM_CAPABILITY_ANY = 0xFFFFFFFF
}

/**
 * 
 */
export enum ModemCdmaRmProtocol {
    /** Unknown protocol. */
    MM_MODEM_CDMA_RM_PROTOCOL_UNKNOWN = 0,

    /** Asynchronous data or fax. */
    MM_MODEM_CDMA_RM_PROTOCOL_ASYNC = 1,

    /** Packet data service, Relay Layer Rm interface. */
    MM_MODEM_CDMA_RM_PROTOCOL_PACKET_RELAY = 2,

    /** Packet data service, Network Layer Rm interface, PPP. */
    MM_MODEM_CDMA_RM_PROTOCOL_PACKET_NETWORK_PPP = 3,

    /** Packet data service, Network Layer Rm interface, SLIP. */
    MM_MODEM_CDMA_RM_PROTOCOL_PACKET_NETWORK_SLIP = 4,

    /** STU-III service. */
    MM_MODEM_CDMA_RM_PROTOCOL_STU_III = 5
}

/**
 * Not a bitmask, counts up from 0.
 */
export enum ModemLock{
    /** Lock reason unknown. */
    MM_MODEM_LOCK_UNKNOWN = 0,

    /** Modem is unlocked. */
    MM_MODEM_LOCK_NONE = 1,

    /** SIM requires the PIN code. */
    MM_MODEM_LOCK_SIM_PIN = 2,

    /** SIM requires the PIN2 code. */
    MM_MODEM_LOCK_SIM_PIN2 = 3,

    /** SIM requires the PUK code. */
    MM_MODEM_LOCK_SIM_PUK = 4,

    /** SIM requires the PUK2 code. */
    MM_MODEM_LOCK_SIM_PUK2 = 5,

    /** Modem requires the service provider PIN code. */
    MM_MODEM_LOCK_PH_SP_PIN = 6,

    /** Modem requires the service provider PUK code. */
    MM_MODEM_LOCK_PH_SP_PUK = 7,

    /** Modem requires the network PIN code. */
    MM_MODEM_LOCK_PH_NET_PIN = 8,

    /** Modem requires the network PUK code. */
    MM_MODEM_LOCK_PH_NET_PUK = 9,

    /** Modem requires the PIN code. */
    MM_MODEM_LOCK_PH_SIM_PIN = 10,

    /** Modem requires the corporate PIN code. */
    MM_MODEM_LOCK_PH_CORP_PIN = 11,

    /** Modem requires the corporate PUK code. */
    MM_MODEM_LOCK_PH_CORP_PUK = 12,

    /** Modem requires the PH-FSIM PIN code. */
    MM_MODEM_LOCK_PH_FSIM_PIN = 13,

    /** Modem requires the PH-FSIM PUK code. */
    MM_MODEM_LOCK_PH_FSIM_PUK = 14,

    /** Modem requires the network subset PIN code. */
    MM_MODEM_LOCK_PH_NETSUB_PIN = 15,

    /** Modem requires the network subset PUK code. */
    MM_MODEM_LOCK_PH_NETSUB_PUK = 16
}

/**
 * Bitfield to indicate which access modes are supported, allowed or preferred in a given device.
 */
 export enum ModemMode {
    /** None. */
    MM_MODEM_MODE_NONE = 0,

    /** CSD, GSM, and other circuit-switched technologies. */
    MM_MODEM_MODE_CS = 1 << 0,

    /** GPRS, EDGE. */
    MM_MODEM_MODE_2G = 1 << 1,

    /** UMTS, HSxPA. */
    MM_MODEM_MODE_3G = 1 << 2,

    /** LTE. */
    MM_MODEM_MODE_4G = 1 << 3,

    /** 5GNR. Since 1.14. */
    MM_MODEM_MODE_5G = 1 << 4,

    /** Any mode can be used (only this value allowed for POTS modems). */
    MM_MODEM_MODE_ANY = 0xFFFFFFFF
}

/**
 * Not a bitmask, counts up from 1
 */
export enum ModemPortType {
    /** Unknown. */
    MM_MODEM_PORT_TYPE_UNKNOWN = 1,

    /** Net port. */
    MM_MODEM_PORT_TYPE_NET = 2,

    /** AT port. */
    MM_MODEM_PORT_TYPE_AT = 3,

    /** QCDM port. */
    MM_MODEM_PORT_TYPE_QCDM = 4,

    /** GPS port. */
    MM_MODEM_PORT_TYPE_GPS = 5,

    /** QMI port. */
    MM_MODEM_PORT_TYPE_QMI = 6,

    /** MBIM port. */
    MM_MODEM_PORT_TYPE_MBIM = 7
}

/**
 * Power state of the modem. Not a bitmask, counts up from 0.
 */
export enum ModemPowerState {
    /** Unknown power state. */
    MM_MODEM_POWER_STATE_UNKNOWN = 0,

    /** Off. */
    MM_MODEM_POWER_STATE_OFF = 1,

    /** Low-power mode. */
    MM_MODEM_POWER_STATE_LOW = 2,

    /** Full power mode. */
    MM_MODEM_POWER_STATE_ON = 3
}

/**
 * Enumeration of possible modem states. Not a bitmask, counts up from -1.
 */
export enum ModemState {
    /** The modem is unusable. */
    MM_MODEM_STATE_FAILED = -1,

    /** State unknown or not reportable. */
    MM_MODEM_STATE_UNKNOWN = 0,

    /** The modem is currently being initialized. */
    MM_MODEM_STATE_INITIALIZING = 1,

    /** The modem needs to be unlocked. */
    MM_MODEM_STATE_LOCKED = 2,

    /** The modem is not enabled and is powered down. */
    MM_MODEM_STATE_DISABLED = 3,

    /** The modem is currently transitioning to the MM_MODEM_STATE_DISABLED state. */
    MM_MODEM_STATE_DISABLING = 4,

    /** The modem is currently transitioning to the MM_MODEM_STATE_ENABLED state. */
    MM_MODEM_STATE_ENABLING = 5,

    /** The modem is enabled and powered on but not registered with a network provider and not available for data connections. */
    MM_MODEM_STATE_ENABLED = 6,

    /** The modem is searching for a network provider to register with. */
    MM_MODEM_STATE_SEARCHING = 7,

    /** The modem is registered with a network provider, and data connections and messaging may be available for use. */
    MM_MODEM_STATE_REGISTERED = 8,

    /** 
     * The modem is disconnecting and deactivating the last active packet data bearer. 
     * This state will not be entered if more than one packet data bearer is active and one of the active bearers is deactivated.
     */
    MM_MODEM_STATE_DISCONNECTING = 9,

    /** 
     * The modem is activating and connecting the first packet data bearer. 
     * Subsequent bearer activations when another bearer is already active do not cause this state to be entered.
     */
    MM_MODEM_STATE_CONNECTING = 10,

    /** One or more packet data bearers is active and connected. */
    MM_MODEM_STATE_CONNECTED = 11
}

/**
 * Enumeration of possible reasons to have changed the modem state.
 */
export enum ModemStateChangeReason {
    /** Reason unknown or not reportable. */
    MM_MODEM_STATE_CHANGE_REASON_UNKNOWN = 0,

    /** State change was requested by an interface user. */
    MM_MODEM_STATE_CHANGE_REASON_USER_REQUESTED = 1,

    /** State change was caused by a system suspend. */
    MM_MODEM_STATE_CHANGE_REASON_SUSPEND = 2,

    /** State change was caused by an unrecoverable error. */
    MM_MODEM_STATE_CHANGE_REASON_FAILURE = 3
}

/**
 * Enumeration of possible errors when the modem is in MM_MODEM_STATE_FAILED.
 */
export enum ModemStateFailedReason {
    /** No error. */
    MM_MODEM_STATE_FAILED_REASON_NONE = 0,

    /** Unknown error. */
    MM_MODEM_STATE_FAILED_REASON_UNKNOWN = 1,

    /** SIM is required but missing. */
    MM_MODEM_STATE_FAILED_REASON_SIM_MISSING = 2,

    /** SIM is available, but unusable (e.g. permanently locked). */
    MM_MODEM_STATE_FAILED_REASON_SIM_ERROR = 3,
}

/**
 * A bitfield describing which facilities have a lock enabled, i.e., requires a pin or unlock code.
 * The facilities include the personalizations (device locks) described in 3GPP spec TS 22.022, and the PIN and PIN2 locks, which are SIM locks.
 */
export enum Modem3gppFacility {
    /** No facility. */
    MM_MODEM_3GPP_FACILITY_NONE = 0,

    /** SIM lock. */
    MM_MODEM_3GPP_FACILITY_SIM = 1,

    /** Fixed dialing (PIN2) SIM lock. */
    MM_MODEM_3GPP_FACILITY_FIXED_DIALING = 1 << 1,

    /** Device is locked to a specific SIM. */
    MM_MODEM_3GPP_FACILITY_PH_SIM = 1 << 2,

    /** Device is locked to first SIM inserted. */
    MM_MODEM_3GPP_FACILITY_PH_FSIM = 1 << 3,
    
    /** Network personalization. */
    MM_MODEM_3GPP_FACILITY_NET_PERS = 1 << 4,
    
    /** Network subset personalization. */
    MM_MODEM_3GPP_FACILITY_NET_SUB_PERS = 1 << 5,
    
    /** Service provider personalization. */
    MM_MODEM_3GPP_FACILITY_PROVIDER_PERS = 1 << 6,
    
    /** Corporate personalization. */
    MM_MODEM_3GPP_FACILITY_CORP_PERS = 1 << 7
}

/**
 * The packet domain service state.
 */
export enum Modem3gppPacketServiceState {
    /** Unknown. */
    MM_MODEM_3GPP_PACKET_SERVICE_STATE_UNKNOWN = 0,

    /** Detached. */
    MM_MODEM_3GPP_PACKET_SERVICE_STATE_DETACHED = 1,

    /** Attached. */
    MM_MODEM_3GPP_PACKET_SERVICE_STATE_ATTACHED = 2
}

/**
 * GSM registration code as defined in 3GPP TS 27.007.
 */
export enum Modem3gppRegistrationState {
    /** Not registered, not searching for new operator to register. */
    MM_MODEM_3GPP_REGISTRATION_STATE_IDLE = 0,

    /** Registered on home network. */
    MM_MODEM_3GPP_REGISTRATION_STATE_HOME = 1,

    /** Not registered, searching for new operator to register with. */
    MM_MODEM_3GPP_REGISTRATION_STATE_SEARCHING = 2,

    /** Registration denied. */
    MM_MODEM_3GPP_REGISTRATION_STATE_DENIED = 3,

    /** Unknown registration status. */
    MM_MODEM_3GPP_REGISTRATION_STATE_UNKNOWN = 4,

    /** Registered on a roaming network. */
    MM_MODEM_3GPP_REGISTRATION_STATE_ROAMING = 5,

    /** Registered for "SMS only", home network (applicable only when on LTE). Since 1.8. */
    MM_MODEM_3GPP_REGISTRATION_STATE_HOME_SMS_ONLY = 6,

    /** Registered for "SMS only", roaming network (applicable only when on LTE). Since 1.8. */
    MM_MODEM_3GPP_REGISTRATION_STATE_ROAMING_SMS_ONLY = 7,

    /** Emergency services only. Since 1.8. */
    MM_MODEM_3GPP_REGISTRATION_STATE_EMERGENCY_ONLY = 8,

    /** Registered for "CSFB not preferred", home network (applicable only when on LTE). Since 1.8. */
    MM_MODEM_3GPP_REGISTRATION_STATE_HOME_CSFB_NOT_PREFERRED = 9,

    /** Registered for "CSFB not preferred", roaming network (applicable only when on LTE). Since 1.8. */
    MM_MODEM_3GPP_REGISTRATION_STATE_ROAMING_CSFB_NOT_PREFERRED = 10,

    /** Attached for access to Restricted Local Operator Services (applicable only when on LTE). Since 1.14. */
    MM_MODEM_3GPP_REGISTRATION_STATE_ATTACHED_RLOS = 11
}

/**
 * Describes the current subscription status of the SIM. This value is only available after the modem attempts to register with the network.
 */
export enum Modem3gppSubscriptionState {
    /** The subscription state is unknown. */
    MM_MODEM_3GPP_SUBSCRIPTION_STATE_UNKNOWN = 0,

    /** The account is unprovisioned. */
    MM_MODEM_3GPP_SUBSCRIPTION_STATE_UNPROVISIONED = 1,

    /** The account is provisioned and has data available. */
    MM_MODEM_3GPP_SUBSCRIPTION_STATE_PROVISIONED = 2,

    /** The account is provisioned but there is no data left. */
    MM_MODEM_3GPP_SUBSCRIPTION_STATE_OUT_OF_DATA = 3
}

/**
 * UE mode of operation for EPS, as per 3GPP TS 24.301.
 */
export enum Modem3gppEpsUeModeOperation {
    /** Unknown or not applicable. */
    MM_MODEM_3GPP_EPS_UE_MODE_OPERATION_UNKNOWN = 0,

    /** PS mode 1 of operation: EPS only, voice-centric. */
    MM_MODEM_3GPP_EPS_UE_MODE_OPERATION_PS_1 = 1,

    /** PS mode 2 of operation: EPS only, data-centric. */
    MM_MODEM_3GPP_EPS_UE_MODE_OPERATION_PS_2 = 2,

    /** CS/PS mode 1 of operation: EPS and non-EPS, voice-centric. */
    MM_MODEM_3GPP_EPS_UE_MODE_OPERATION_CSPS_1 = 3,

    /** CS/PS mode 2 of operation: EPS and non-EPS, data-centric. */
    MM_MODEM_3GPP_EPS_UE_MODE_OPERATION_CSPS_2 = 4
}

/**
 * Mobile Initiated Connection Only (MICO) mode.
 * This is a 5G-specific registration setting.
 */
export enum Modem3gppMicoMode {
    /** Unknown or not specified. */
    MM_MODEM_3GPP_MICO_MODE_UNKNOWN = 0,

    /** Unsupported. */
    MM_MODEM_3GPP_MICO_MODE_UNSUPPORTED = 1,

    /** Disabled. */
    MM_MODEM_3GPP_MICO_MODE_DISABLED = 2,

    /** Enabled. */
    MM_MODEM_3GPP_MICO_MODE_ENABLED = 3
}

/**
 * DRX cycle.
 * This is a 5G-specific registration setting.
 */
export enum Modem3gppDrxCycle {
    /** Unknown or not specified. */
    MM_MODEM_3GPP_DRX_CYCLE_UNKNOWN = 0,

    /** Unsupported. */
    MM_MODEM_3GPP_DRX_CYCLE_UNSUPPORTED = 1,

    /** DRX cycle T=32. */
    MM_MODEM_3GPP_DRX_CYCLE_32 = 2,

    /** DRX cycle T=64. */
    MM_MODEM_3GPP_DRX_CYCLE_64 = 3,

    /** DRX cycle T=128. */
    MM_MODEM_3GPP_DRX_CYCLE_128 = 4,

    /** DRX cycle T=256. */
    MM_MODEM_3GPP_DRX_CYCLE_256 = 5
}

/**
 * Network availability status as defined in 3GPP TS 27.007 section 7.3.
 */
export enum Modem3gppNetworkAvailability {
    /** Unknown availability. */
    MM_MODEM_3GPP_NETWORK_AVAILABILITY_UNKNOWN = 0,

    /** Network is available. */
    MM_MODEM_3GPP_NETWORK_AVAILABILITY_AVAILABLE = 1,
        
    /** Network is the current one. */
    MM_MODEM_3GPP_NETWORK_AVAILABILITY_CURRENT = 2,
        
    /** Network is forbidden. */
    MM_MODEM_3GPP_NETWORK_AVAILABILITY_FORBIDDEN = 3
}

/**
 * SIM type indicating whether ESIM or not
 */
export enum SimType {
    /** SIM type is not known. */
    MM_SIM_TYPE_UNKNOWN = 0,

    /** SIM is a pysical SIM. */
    MM_SIM_TYPE_PHYSICAL = 1,

    /** SIM is a ESIM. */
    MM_SIM_TYPE_ESIM = 2
}

/**
 * Status of the profiles for ESIM
 */
export enum SimEsimStatus {
    /** ESIM status unknown. */
    MM_SIM_ESIM_STATUS_UNKNOWN = 0,

    /** ESIM with no profiles. */
    MM_SIM_ESIM_STATUS_NO_PROFILES = 1,

    /** ESIM with profiles. */
    MM_SIM_ESIM_STATUS_WITH_PROFILES = 2
}

/**
 * Respresents SIM removability of the current SIM.
 */
export enum SimRemovability {
    /** SIM removability not known. */
    MM_SIM_REMOVABILITY_UNKNOWN = 0,

    /** SIM is a removable SIM. */
    MM_SIM_REMOVABILITY_REMOVABLE = 1,

    /** SIM is not a removable SIM. */
    MM_SIM_REMOVABILITY_NOT_REMOVABLE = 2
}

/**
 * Properties for a Modem object
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Modem.html
 */
 export interface ModemProperties {                                 // dbus type definition
    Sim: string;                                                    // o
    SimSlots: string[];                                             // ao
    PrimarySimSlot: number;                                         // u
    Bearers: string[];                                              // ao
    SupportedCapabilities: ModemCapability[];                       // au
    CurrentCapabilities: ModemCapability;                           // u
    MaxBearers: number;                                             // u
    MaxActiveBearers: number;                                       // u
    MaxActiveMultiplexedBearers: number;                            // u
    Manufacturer: string;                                           // s
    Model: string;                                                  // s
    Revision: string;                                               // s
    CarrierConfiguration: string;                                   // s
    CarrierConfigurationRevision: string;                           // s
    HardwareRevision: string;                                       // s
    DeviceIdentifier: string;                                       // s
    Device: string;                                                 // s
    Drivers: string[];                                              // as
    Plugin: string;                                                 // s
    PrimaryPort: string;                                            // s
    Ports: ModemPortType[];                                         // a(su)
    EquipmentIdentifier: string;                                    // s
    UnlockRequired: ModemLock;                                      // u
    UnlockRetries: any;                                             // a{uu}
    State: ModemState;                                              // i
    StateFailedReason: ModemStateFailedReason;                      // u
    AccessTechnologies: ModemAccessTechnology;                      // u
    SignalQuality: any;                                             // (ub)
    OwnNumbers: string[];                                           // as
    PowerState: ModemPowerState;                                    // u
    SupportedModes: any[];                                          // a(uu)
    CurrentModes: any;                                              // (uu)
    SupportedBands: ModemBand[];                                    // au
    CurrentBands: ModemBand[];                                      // au
    SupportedIpFamilies: BearerIpFamily;                            // u
}

/**
 * The properties for Modem3gpp objects.
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Modem.Modem3gpp.html
 */
export interface Modem3gppProperties {
    /**
     * The International Mobile Equipment Identity provided by the device
     */
    Imei: string;                                       // s

    /**
     * A {@link Modem3gppRegistrationState} value specifying the mobile registration status as defined in 3GPP TS 27.007 section 10.1.19.
     */
    RegistrationState: Modem3gppRegistrationState;       // u

    /**
     * Code of the operator to which the mobile is currently registered.
     * 
     * Returned in the format "MCCMNC", where MCC is the three-digit ITU E.212 Mobile Country Code and MNC is the two- or three-digit GSM Mobile Network Code. e.g. e"31026" or "310260".
     * 
     * If the MCC and MNC are not known or the mobile is not registered to a mobile network, this property will be a zero-length (blank) string. 
     */
    OperatorCode: string;                               // s

    /**
     * Name of the operator to which the mobile is currently registered.
     * 
     * If the operator name is not known or the mobile is not registered to a mobile network, this property will be a zero-length (blank) string. 
     */
    OperatorName: string;                               // s

    /**
     * This value is a bitmask of 1 or more {@link Modem3gppFacility} values for which PIN locking is enabled.
     */
    EnabledFacilityLocks: number;                       // u

    /**
     * A {@link Modem3gppSubscriptionState} value representing the subscription status of the account and whether there is any data remaining, given as an unsigned integer.
     * 
     * @deprecated
     * This field has been deprecated since ModemManager version 1.10.0. 
     * The value of this property can only be obtained with operator specific logic (e.g. processing specific PCO info), and therefore it doesn't make sense to expose it in the ModemManager interface. 
     */
    SubscriptionState: Modem3gppSubscriptionState;      // u

    /**
     * A {@link Modem3gppEpsUeModeOperation} value representing the UE mode of operation for EPS, given as an unsigned integer.
     */
    EpsUeModeOperation: Modem3gppEpsUeModeOperation;    // u

    /** 
     * Formatted as an array with 3 values or 0 values: 
     * ```
     * [
     *     number, //session ID
     *     boolean, //flag for if PCO data is the complete structure recieved from the network
     *     byte array //PCO data
     * ] 
     * ```
     */
    Pco: any[];                                         // a(ubay)

    /** 
     * DBus object path to the Bearer
     */
    InitialEpsBearer: string;                           // o

    /**
     * List of properties requested by the device for the initial EPS bearer during LTE network attach procedure.
     * 
     * The network may decide to use different settings during the actual device attach procedure, e.g. if the device is roaming or no explicit settings were requested, so the values shown in the "{@link Modem3gppProperties.InitialEpsBearer}" bearer object may be totally different.
     * 
     * This is a read-only property, updating these settings should be done using the {@link "Modem3gpp"} setInitialEpsBearerSettings method. 
     */
    InitialEpsBearerSettings: object;                   // a{sv}

    /**
     * A {@link Modem3gppPacketServiceState} value specifying the packet domain service state.
     */
    PacketServiceState: number;                         // u

    /**
     * 5G specific registration settings.
     * 
     * This is a read-only property, updating these settings should be done using the Set5gNrRegistrationSettings() method.
     * ```
     * {
     *     "micro-mode": Modem3gppMicoMode,
     *     "drx-cycle": Modem3gppDrxCycle
     * }
     * ```
     * "micro-mode" is a {@link Modem3gppMicoMode} value representing the Mobile Initiated Connection (MICO) mode requested by the host, given as an unsigned integer
     * 
     * "drx-cycle" is a {@link Modem3gppDrxCycle} value, representing the DRX settings requested by the host, given as an unsigned integer (signature "u")
     */
    Nr5gRegistrationSettings: object;                      // a{sv}
}

/**
 * aliased from the Bearer "Properties" property
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Bearer.html#gdbus-property-org-freedesktop-ModemManager1-Bearer.Properties
 * 
 * List of settings used to create the bearer.
 * Bearers may be implicitly created (e.g. the default initial EPS bearer created during the network registration process in 4G and 5G networks) or explicitly created by the user (e.g. via the CreateBearer() or Connect() calls). 
 * 
 * The following settings apply to 3GPP (GSM/UMTS/LTE/5GNR) devices: 
 * 
 * ```
 * "apn"
 * "ip-type"
 * "apn-type"
 * "allowed-auth"
 * "user"
 * "password"
 * "access-type-preference"
 * "roaming-allowance"
 * "profile-id"
 * "profile-name"
 * "profile-enabled"
 * "profile-source"
 * ```
 * 
 * The following settings apply to 3GPP2 (CDMA/EVDO) devices: 
 * 
 * ```
 * "rm-protocol"
 * ```
 * 
 * The following settings apply to all devices types: 
 * 
 * ```
 * "allow-roaming"
 * "multiplex"
 * ```
 * 
 * The following settings are no longer supported, but they are kept on the interface for compatibility purposes: 
 * 
 * ```
 * "number"
 * ```
 */
export interface BearerConfiguration {
    /** The Access Point Name to use in the connection, given as a string value (signature "s"). For 5G NGC, this field contains the Data Network Name (DNN). */
    "apn": string;

    /** The IP addressing type to use, given as a MMBearerIpFamily value (signature "u"). */
    "ip-type": BearerIpFamily;

    /** The purposes of the specified APN, given as a MMBearerApnType value (signature "u"). */
    "apn-type": BearerApnType;

    /** The authentication method to use, given as a MMBearerAllowedAuth value (signature "u"). */
    "allowed-auth": BearerAllowedAuth;

    /** The user name (if any) required by the network, given as a string value (signature "s"). */
    "user": string;

    /** The password (if any) required by the network, given as a string value (signature "s"). */
    "password": string;

    /** Access type preference for 5G devices, given as a MMBearerAccessTypePreference value (signature "u". Since 1.20. */
    "access-type-preference": BearerAccessTypePreference;

    /** Roaming allowance, given as a MMBearerRoamingAllowance value (signature "u". If supported, this setting should be used instead of 'allow-roaming'. Since 1.20.  */
    "roaming-allowance": BearerRoamingAllowance;

    /** The ID of the 3GPP profile to connect to (signature "i"), as given in the profile list. In this case, if additional profile settings are given in the properties and they already exist in the profile (e.g. "apn"), the new settings will be explicitly ignored; the settings stored in the profile itself always take preference. The value -1 is used to indicate an invalid or uninitialized profile id. Since 1.18. */
    "profile-id": number;

    /** The name of the profile, given as a string value (signature "s"). This value has no effect on the connection, but can be used by the host to identify the profiles. This setting only applies on profile management operations, it should not be used as part of the settings of an explicit connection attempt. Since 1.20.  */
    "profile-name": string;

    /** Boolean flag specifying whether the profile is enabled or disabled, given as a boolean value (signature "b"). Profiles that are disabled will not be automatically connected by the modem in any way, and attempting to connect them explicitly will fail. This setting only applies on profile management operations, it should not be used as part of the settings of an explicit connection attempt. Since 1.20. */
    "profile-enabled": boolean;

    /** A MMBearerProfileSource value (signature "u", specifying how the profile was created. This setting only applies on profile management operations, it should not be used as part of the settings of an explicit connection attempt. Since 1.20. */
    "profile-source": BearerProfileSource;

    /** The protocol of the Rm interface, given as a MMModemCdmaRmProtocol value (signature "u").  */
    "rm-protocol": ModemCdmaRmProtocol;

    /** Specifies whether the connections are allowed even when the device is registered in a roaming (partner or non-partner) network, given as a boolean value (signature "b"). This setting applies only to the connection attempts started via Simple.Connect() or Bearer.Connect(). This is a volatile setting, never stored in the device. */
    "allow-roaming": boolean;

    /** The multiplex support requested by the user, given as a MMBearerMultiplexSupport value (signature "u"). Since 1.18. */
    "multiplex": BearerMultiplexSupport;

    /** Number to dial for the data connection, given as a string value (signature "s"). Deprecated since version 1.10.0. */
    "number": string;
}

/**
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Bearer.html
 */
export interface BearerProperties {             // dbus type definition
    /** 
     * The operating system name for the network data interface that provides packet data using this bearer.
     * 
     * Connection managers must configure this interface depending on the IP "method" given by the "Ip4Config" or "Ip6Config" properties set by bearer activation.
     * 
     * If {@link BearerIpMethod.MM_BEARER_IP_METHOD_STATIC MM_BEARER_IP_METHOD_STATIC} or {@link BearerIpMethod.MM_BEARER_IP_METHOD_DHCP MM_BEARER_IP_METHOD_DHCP} methods are given, the interface will be an ethernet-style interface suitable for DHCP or setting static IP configuration on,
     * while if the {@link BearerIpMethod.MM_BEARER_IP_METHOD_PPP MM_BEARER_IP_METHOD_PPP} method is given, the interface will be a serial TTY which must then have PPP run over it. 
     */
    Interface: string;                          // s

    /**
     * Indicates whether or not the bearer is connected and thus whether packet data communication using this bearer is possible.
     */
    Connected: boolean;                         // b

    /**
     * Provides additional information specifying the reason why the modem is not connected (either due to a failed connection attempt, or due to a a network initiated disconnection).
     * 
     * The value is composed of two strings: the registered DBus error name, and an optional error message.
     */
    ConnectionError: any;                       // (ss)

    /**
     * In some devices, packet data service will be suspended while the device is handling other communication, like a voice call. If packet data service is suspended (but not deactivated) this property will be `true`. 
     */
    Suspended: boolean;                         // b

    /**
     * This property will be `true` if the bearer is connected through a multiplexed network link.
     */
    Multiplexed: boolean;                       // b

    /**
     * If the bearer was configured for IPv4 addressing, upon activation this property contains the addressing details for assignment to the data interface.
     * 
     * Mandatory items include:
     * ```
     * "method" //A MMBearerIpMethod, given as an unsigned integer value (signature "u").
     * ```
     * If the bearer specifies configuration via PPP or DHCP, only the "method" item is guaranteed to be present.
     * Additional items which are only applicable when using the {@link BearerIpMethod.MM_BEARER_IP_METHOD_STATIC MM_BEARER_IP_METHOD_STATIC} method are:
     * ```
     * "address" //IP address, given as a string value (signature "s").
     * "prefix" //Numeric CIDR network prefix (ie, 24, 32, etc), given as an unsigned integer value (signature "u").
     * "dns1" //IP address of the first DNS server, given as a string value (signature "s").
     * "dns2" //IP address of the second DNS server, given as a string value (signature "s").
     * "dns3" //IP address of the third DNS server, given as a string value (signature "s").
     * "gateway" //IP address of the default gateway, given as a string value (signature "s").
     * ```
     * This property may also include the following items when such information is available:
     * ```
     * "mtu" //Maximum transmission unit (MTU), given as an unsigned integer value (signature "u"). 
     * ```
     */
    Ip4Config: object;                          // a{sv}

    /**
     * If the bearer was configured for IPv6 addressing, upon activation this property contains the addressing details for assignment to the data interface.
     * 
     * Mandatory items include:
     * ```
     * "method" //A MMBearerIpMethod, given as an unsigned integer value (signature "u").
     * ```
     * If the bearer specifies configuration via PPP or DHCP, often only the "method" item will be present. 
     * IPv6 SLAAC should be used to retrieve correct addressing and DNS information via Router Advertisements and DHCPv6. 
     * In some cases an IPv6 Link-Local "address" item will be present, which should be assigned to the data port before performing SLAAC, as the mobile network may expect SLAAC setup to use this address.
     * Additional items which are only applicable when using the {@link BearerIpMethod.MM_BEARER_IP_METHOD_STATIC MM_BEARER_IP_METHOD_STATIC} method are:
     * ```
     * "address" //IP address, given as a string value (signature "s").
     * "prefix" //Numeric CIDR network prefix (ie, 24, 32, etc), given as an unsigned integer value (signature "u").
     * "dns1" //IP address of the first DNS server, given as a string value (signature "s").
     * "dns2" //IP address of the second DNS server, given as a string value (signature "s").
     * "dns3" //IP address of the third DNS server, given as a string value (signature "s").
     * "gateway" //IP address of the default gateway, given as a string value (signature "s").
     * ```
     * This property may also include the following items when such information is available:
     * ```
     * "mtu" //Maximum transmission unit (MTU), given as an unsigned integer value (signature "u"). 
     * ```
     */
    Ip6Config: object;                          // a{sv}

    /**
     * If the modem supports it, this property will show statistics associated to the bearer.
     * 
     * There are two main different statistic types reported: either applicable to the ongoing connection, or otherwise compiled for all connections that have been done on this bearer object.
     * 
     * When the connection is disconnected automatically or explicitly by the user, the values applicable to the ongoing connection will show the last values cached.
     * 
     * The following items may appear in the list of statistics:
     * ```
     * "rx-bytes" //Number of bytes received without error in the ongoing connection, given as an unsigned 64-bit integer value (signature "t").
     * "tx-bytes" //Number of bytes transmitted without error in the ongoing connection, given as an unsigned 64-bit integer value (signature "t").
     * "start-date" //Timestamp indicating when the ongoing connection started, given as an unsigned 64-bit integer value representing seconds since the epoch (signature "t").
     * "duration" //Duration of the ongoing connection, in seconds, given as an unsigned integer value (signature "u").
     * "attempts" //Total number of connection attempts done with this bearer, given as an unsigned integer value (signature "u").
     * "failed-attempts" //Number of failed connection attempts done with this bearer, given as an unsigned integer value (signature "u").
     * "total-rx-bytes" //Total number of bytes received without error in all the successful connection establishments, given as an unsigned 64-bit integer value (signature "t").
     * "total-tx-bytes" //Total number of bytes transmitted without error in all the successful connection establishments, given as an unsigned 64-bit integer value (signature "t").
     * "total-duration" //Total duration of all the successful connection establishments, in seconds, given as an unsigned integer value (signature "u").
     * "uplink-speed" //Uplink bit rate negotiated with network, in bits per second, given as an unsigned 64-bit integer value (signature "t").
     * "downlink-speed" //Downlink bit rate negotiated with network, in bits per second, given as an unsigned 64-bit integer value (signature "t").
     * ```
     */
    Stats: object;                              // a{sv}

    /** 
     * Indicates whether reloading ongoing statistics is supported or not.
     * 
     * This property applies exclusively to the statistics that are queried from the modem periodically; i.e. "rx-bytes", "tx-bytes", "uplink-speed" and "downlink-speed".
     * 
     * The property is initialized to a fixed value as soon as the first connection attempt has successfully finished. Reading this value before the first successful connection attempt will always report `false`. 
     */
    ReloadStatsSupported: boolean,              // b

    /**
     * Maximum time to wait for a successful IP establishment, when PPP is used. 
     */
    IpTimeout: number;                          // u

    /**
     * A {@link BearerType}
     */
    BearerType: BearerType;                     // u

    /**
     * The profile ID this bearer object is associated with, only applicable if the modem supports profile management operations, and if the bearer is connected.
     * 
     * If the bearer is disconnected, or if profile management operations are not supported, -1 will be reported. 
     */
    ProfileId: number;                          // i

    /**
     * The properties used to create this bearer.
     * See {@link BearerConfiguration} for the available fields for this property.
     */
    Properties: Partial<BearerConfiguration>;   // a{sv}
}

/**
 * @see https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/gdbus-org.freedesktop.ModemManager1.Sim.html
 */
export interface SimProperties {                                                            // dbus type definition
    /**
     * Boolean indicating whether the SIM is currently active.
     * 
     * On systems that support Multi SIM Single Standby, only one SIM may be active at any given time, which will be the one considered primary.
     * 
     * On systems that support Multi SIM Multi Standby, more than one SIM may be active at any given time, but only one of them is considered primary. 
     */
    Active: boolean;                                                                        // b

    /**
     * The ICCID of the SIM card.
     * 
     * This may be available before the PIN has been entered depending on the device itself.
     */
    SimIdentifier: string;                                                                  // s

    /**
     * The IMSI of the SIM card, if any.
     */
    Imsi: string;                                                                           // s

    /**
     * The EID of the SIM card, if any.
     */
    Eid: string;                                                                            // s

    /**
     * 
     */
    OperatorIdentifier: string;                                                             // s

    /**
     * The name of the network operator, as given by the SIM card, if known.
     */
    OperatorName: string;                                                                   // s

    /**
     * List of emergency numbers programmed in the SIM card.
     * 
     * These numbers should be treated as numbers for emergency calls in addition to 112 and 911. 
     */
    EmergencyNumbers: string[];                                                             // as

    /**
     * List of preferred networks with access technologies configured in the SIM card.
     * 
     * Each entry contains an operator id string ("MCCMNC") consisting of 5 or 6 digits, and an {@link ModemAccessTechnology ModemAccessTechnology} bitmask. 
     * If the SIM card does not support access technology storage, the mask will be set to {@link ModemAccessTechnology.MM_MODEM_ACCESS_TECHNOLOGY_UNKNOWN MM_MODEM_ACCESS_TECHNOLOGY_UNKNOWN}. 
     */
    PreferredNetworks: {operator_id: string, access_technology: ModemAccessTechnology}[];   // a(su)

    /**
     * Group identifier level 1.
     */
    Gid1: any[];                                                                            // ay

    /**
     * Group identifier level 2.
     */
    Gid2: any[];                                                                            // ay

    /**
     * Indicates whether the current primary SIM is a ESIM or a physical SIM, given as {@link SimType} value.
     */
    SimType: SimType;                                                                       // u

    /**
     * If current SIM is ESIM then this indicates whether there is a profile or not, given as {@link SimEsimStatus} value.
     */
    EsimStatus: SimEsimStatus;                                                              // u

    /**
     * Indicates whether the current SIM is a removable SIM or not, given as a {@link SimRemovability} value.
     */
    Removability: SimRemovability;                                                          // u
}