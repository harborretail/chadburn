'''ModemManager mock template

This creates the expected methods and properties of the main
org.freedesktop.ModemManager object, but no devices.
'''

# This program is free software you can redistribute it and/or modify it under
# the terms of the GNU Lesser General Public License as published by the Free
# Software Foundation either version 3 of the License, or (at your option) any
# later version.  See http://www.gnu.org/copyleft/lgpl.html for the full text
# of the license.

__author__ = 'Nathan Pipe'
__copyright__ = '''
(c) 2012 Canonical Ltd.
(c) 2017 - 2022 Martin Pitt <martin@piware.de>
'''

from typing import List, Dict, Optional
from enum import Enum

import uuid
import binascii

import dbus
from dbusmock import MOCK_IFACE, OBJECT_MANAGER_IFACE, mockobject
import dbusmock


SYSTEM_BUS = True
IS_OBJECT_MANAGER = True
BUS_NAME = 'org.freedesktop.ModemManager1'
#MAIN_IFACE = 'org.freedesktop.ModemManager1'
MAIN_OBJ = '/org/freedesktop'
MANAGER_IFACE = 'org.freedesktop.ModemManager1'
MANAGER_OBJ = '/org/freedesktop/ModemManager1'
MODEM_IFACE = 'org.freedesktop.ModemManager1.Modem'
MODEM_BASE_OBJ = '/org/freedesktop/ModemManager1/Modem/'
MODEM3GPP_IFACE = 'org.freedesktop.ModemManager1.Modem.Modem3gpp'
SIM_IFACE = 'org.freedesktop.ModemManager1.Sim'
SIM_BASE_OBJ = '/org/freedesktop/ModemManager1/SIM/'
BEAERER_IFACE = 'org.freedesktop.ModemManager1.Bearer'
BEARER_BASE_OBJ = '/org/freedesktop/ModemManager1/Bearer/'


class BearerAllowedAuth(Enum):
    # Unknown.
    MM_BEARER_ALLOWED_AUTH_UNKNOWN = 0

    # - - - - - - - - - - bits 0..4 order match Ericsson device bitmap - - - - - - - - - -
    # None.
    MM_BEARER_ALLOWED_AUTH_NONE = 1 << 0

    # PAP.
    MM_BEARER_ALLOWED_AUTH_PAP = 1 << 1

    # CHAP.
    MM_BEARER_ALLOWED_AUTH_CHAP = 1 << 2

    # MSCHAP.
    MM_BEARER_ALLOWED_AUTH_MSCHAP = 1 << 3

    # MSCHAPV2
    MM_BEARER_ALLOWED_AUTH_MSCHAPV2 = 1 << 4

    # EAP.
    MM_BEARER_ALLOWED_AUTH_EAP = 1 << 5


# https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerAccessTypePreference
class BearerAccessTypePreference(Enum):
    # No access type preference, or unknown.
    MM_BEARER_ACCESS_TYPE_PREFERENCE_NONE = 0

    # 3GPP access type only.
    MM_BEARER_ACCESS_TYPE_PREFERENCE_3GPP_ONLY = 1

    # All access types allowed but 3GPP preferred.
    MM_BEARER_ACCESS_TYPE_PREFERENCE_3GPP_PREFERRED = 2

    # Non-3GPP access type only.
    MM_BEARER_ACCESS_TYPE_PREFERENCE_NON_3GPP_ONLY = 3


# https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerApnType
class BearerApnType(Enum):
    # Unknown or unsupported.
    MM_BEARER_APN_TYPE_NONE = 0
    
    # APN used for the initial attach procedure.
    MM_BEARER_APN_TYPE_INITIAL = 1 << 0
    
    # Default connection APN providing access to the Internet.
    MM_BEARER_APN_TYPE_DEFAULT = 1 << 1
    
    # APN providing access to IMS services.
    MM_BEARER_APN_TYPE_IMS = 1 << 2
    
    # APN providing access to MMS services.
    MM_BEARER_APN_TYPE_MMS = 1 << 3
    
    # APN providing access to over-the-air device management procedures.
    MM_BEARER_APN_TYPE_MANAGEMENT = 1 << 4
    
    # APN providing access to voice-over-IP services.
    MM_BEARER_APN_TYPE_VOICE = 1 << 5
    
    # APN providing access to emergency services.
    MM_BEARER_APN_TYPE_EMERGENCY = 1 << 6
    
    # APN providing access to private networks.
    MM_BEARER_APN_TYPE_PRIVATE = 1 << 7
    
    # APN providing access to over-the-air activation sites. Since 1.20.
    MM_BEARER_APN_TYPE_PURCHASE = 1 << 8
    
    # APN providing access to video sharing service. Since 1.20.
    MM_BEARER_APN_TYPE_VIDEO_SHARE = 1 << 9
    
    # APN providing access to a local connection with the device. Since 1.20.
    MM_BEARER_APN_TYPE_LOCAL = 1 << 10
    
    # APN providing access to certain applications allowed by mobile operators. Since 1.20.
    MM_BEARER_APN_TYPE_APP = 1 << 12
    
    # APN providing access to XCAP provisioning on IMS services. Since 1.20.
    MM_BEARER_APN_TYPE_XCAP = 1 << 13
    
    # APN providing access to mobile hotspot tethering. Since 1.20.
    MM_BEARER_APN_TYPE_TETHERING = 1 << 14


class BearerIpFamily(Enum):
    # None or unknown.
    MM_BEARER_IP_FAMILY_NONE = 0

    # IPv4.
    MM_BEARER_IP_FAMILY_IPV4 = 1 << 0

    # IPv6.
    MM_BEARER_IP_FAMILY_IPV6 = 1 << 1

    # IPv4 and IPv6.
    MM_BEARER_IP_FAMILY_IPV4V6 = 1 << 2

    # Mask specifying all IP families.
    MM_BEARER_IP_FAMILY_ANY = 0xFFFFFFFF


class BearerIpMethod(Enum):
    # Unknown method.
    MM_BEARER_IP_METHOD_UNKNOWN = 0

    # Use PPP to get the address.
    MM_BEARER_IP_METHOD_PPP = 1

    # Use the provided static IP configuration given by the modem to configure the IP data interface.
    MM_BEARER_IP_METHOD_STATIC = 2

    # Begin DHCP on the data interface to obtain necessary IP configuration details.
    MM_BEARER_IP_METHOD_DHCP = 3


class BearerMultiplexSupport(Enum):
    # Unknown.
    MM_BEARER_MULTIPLEX_SUPPORT_UNKNOWN = 0

    # No multiplex support should be used.
    MM_BEARER_MULTIPLEX_SUPPORT_NONE = 1

    # If available, multiplex support should be used.
    MM_BEARER_MULTIPLEX_SUPPORT_REQUESTED = 2

    # Multiplex support must be used or otherwise the connection attempt will fail.
    MM_BEARER_MULTIPLEX_SUPPORT_REQUIRED = 3

# https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerProfileSource
class BearerProfileSource(Enum):
    # Unknown.
    MM_BEARER_PROFILE_SOURCE_UNKNOWN = 0

    # Profile created by an enterprise IT admin from the OS.
    MM_BEARER_PROFILE_SOURCE_ADMIN = 1

    # Profile created by the user.
    MM_BEARER_PROFILE_SOURCE_USER = 2

    # Profile created by the operator through OMA-DM or similar.
    MM_BEARER_PROFILE_SOURCE_OPERATOR = 3

    # Profile created by the OEM that was included with the modem firmware.
    MM_BEARER_PROFILE_SOURCE_MODEM = 4

    # Profile created by the OS APN database.
    MM_BEARER_PROFILE_SOURCE_DEVICE = 5

# https://www.freedesktop.org/software/ModemManager/doc/latest/ModemManager/ModemManager-Flags-and-Enumerations.html#MMBearerRoamingAllowance
class BearerRoamingAllowance(Enum):
    # No explicit roaming allowance rules.
    MM_BEARER_ROAMING_ALLOWANCE_NONE = 0

    # Home network allowed.
    MM_BEARER_ROAMING_ALLOWANCE_HOME = 1 << 0

    # Partner network allowed.
    MM_BEARER_ROAMING_ALLOWANCE_PARTNER = 1 << 1

    # Non-parter network allowed.
    MM_BEARER_ROAMING_ALLOWANCE_NON_PARTNER = 1 << 2


class BearerType(Enum):
    # Unknown bearer.
    MM_BEARER_TYPE_UNKNOWN = 0

    # Primary context (2G/3G) or default bearer (4G), defined by the user of the API.
    MM_BEARER_TYPE_DEFAULT = 1

    # The initial default bearer established during LTE attach procedure, automatically connected as long as the device is regitered in the LTE network.
    MM_BEARER_TYPE_DEFAULT_ATTACH = 2

    # Secondary context (2G/3G) or dedicated bearer (4G), defined by the user of the API. These bearers use the same IP address used by a primary context or default bearer and provide a dedicated flow for specific traffic with different QoS settings.
    MM_BEARER_TYPE_DEDICATED = 3


class ModemAccessTechnology(Enum):
    # The access technology used is unknown.
    MM_MODEM_ACCESS_TECHNOLOGY_UNKNOWN = 0

    # Analog wireline telephone.
    MM_MODEM_ACCESS_TECHNOLOGY_POTS = 1 << 0

    # GSM.
    MM_MODEM_ACCESS_TECHNOLOGY_GSM = 1 << 1

    # Compact GSM.
    MM_MODEM_ACCESS_TECHNOLOGY_GSM_COMPACT = 1 << 2

    # GPRS.
    MM_MODEM_ACCESS_TECHNOLOGY_GPRS = 1 << 3

    # EDGE (ETSI 27.007: "GSM w/EGPRS").
    MM_MODEM_ACCESS_TECHNOLOGY_EDGE = 1 << 4

    # UMTS (ETSI 27.007: "UTRAN").
    MM_MODEM_ACCESS_TECHNOLOGY_UMTS = 1 << 5

    # HSDPA (ETSI 27.007: "UTRAN w/HSDPA").
    MM_MODEM_ACCESS_TECHNOLOGY_HSDPA = 1 << 6

    # HSUPA (ETSI 27.007: "UTRAN w/HSUPA").
    MM_MODEM_ACCESS_TECHNOLOGY_HSUPA = 1 << 7

    # HSPA (ETSI 27.007: "UTRAN w/HSDPA and HSUPA").
    MM_MODEM_ACCESS_TECHNOLOGY_HSPA = 1 << 8

    # HSPA+ (ETSI 27.007: "UTRAN w/HSPA+").
    MM_MODEM_ACCESS_TECHNOLOGY_HSPA_PLUS = 1 << 9

    # CDMA2000 1xRTT.
    MM_MODEM_ACCESS_TECHNOLOGY_1XRTT = 1 << 10

    # CDMA2000 EVDO revision 0.
    MM_MODEM_ACCESS_TECHNOLOGY_EVDO0 = 1 << 11

    # CDMA2000 EVDO revision A.
    MM_MODEM_ACCESS_TECHNOLOGY_EVDOA = 1 << 12

    # CDMA2000 EVDO revision B.
    MM_MODEM_ACCESS_TECHNOLOGY_EVDOB = 1 << 13

    # LTE (ETSI 27.007: "E-UTRAN")
    MM_MODEM_ACCESS_TECHNOLOGY_LTE = 1 << 14

    # Mask specifying all access technologies.
    MM_MODEM_ACCESS_TECHNOLOGY_ANY = 0xFFFFFFFF


class ModemBand(Enum):
    # Unknown or invalid band.
    MM_MODEM_BAND_UNKNOWN = 0

    # - - - - - - - - - - GSM/UMTS bands - - - - - - - - - -
    # GSM/GPRS/EDGE 900 MHz.
    MM_MODEM_BAND_EGSM = 1

    # GSM/GPRS/EDGE 1800 MHz.
    MM_MODEM_BAND_DCS = 2

    # GSM/GPRS/EDGE 1900 MHz.
    MM_MODEM_BAND_PCS = 3

    # GSM/GPRS/EDGE 850 MHz.
    MM_MODEM_BAND_G850 = 4

    # WCDMA 2100 MHz (Class I).
    MM_MODEM_BAND_U2100 = 5

    # WCDMA 3GPP 1800 MHz (Class III).
    MM_MODEM_BAND_U1800 = 6

    # WCDMA 3GPP AWS 1700/2100 MHz (Class IV).
    MM_MODEM_BAND_U17IV = 7

    # WCDMA 3GPP UMTS 800 MHz (Class VI).
    MM_MODEM_BAND_U800 = 8

    # WCDMA 3GPP UMTS 850 MHz (Class V).
    MM_MODEM_BAND_U850 = 9

    # WCDMA 3GPP UMTS 900 MHz (Class VIII).
    MM_MODEM_BAND_U900 = 10

    # WCDMA 3GPP UMTS 1700 MHz (Class IX).
    MM_MODEM_BAND_U17IX = 11

    # WCDMA 3GPP UMTS 1900 MHz (Class II).
    MM_MODEM_BAND_U1900 = 12

    # WCDMA 3GPP UMTS 2600 MHz (Class VII, internal).
    MM_MODEM_BAND_U2600 = 13

    # - - - - - - - - - - LTE bands - - - - - - - - - -
    # E-UTRAN band I.
    MM_MODEM_BAND_EUTRAN_I = 31

    # E-UTRAN band II.
    MM_MODEM_BAND_EUTRAN_II = 32

    # E-UTRAN band III.
    MM_MODEM_BAND_EUTRAN_III = 33

    # E-UTRAN band IV.
    MM_MODEM_BAND_EUTRAN_IV = 34

    # E-UTRAN band V.
    MM_MODEM_BAND_EUTRAN_V = 35

    # E-UTRAN band VI.
    MM_MODEM_BAND_EUTRAN_VI = 36

    # E-UTRAN band VII.
    MM_MODEM_BAND_EUTRAN_VII = 37

    # E-UTRAN band VIII.
    MM_MODEM_BAND_EUTRAN_VIII = 38

    # E-UTRAN band IX.
    MM_MODEM_BAND_EUTRAN_IX = 39

    # E-UTRAN band X.
    MM_MODEM_BAND_EUTRAN_X = 40

    # E-UTRAN band XI.
    MM_MODEM_BAND_EUTRAN_XI = 41

    # E-UTRAN band XII.
    MM_MODEM_BAND_EUTRAN_XII = 42

    # E-UTRAN band XIII.
    MM_MODEM_BAND_EUTRAN_XIII = 43

    # E-UTRAN band XIV.
    MM_MODEM_BAND_EUTRAN_XIV = 44

    # E-UTRAN band XVII.
    MM_MODEM_BAND_EUTRAN_XVII = 47

    # E-UTRAN band XVIII.
    MM_MODEM_BAND_EUTRAN_XVIII = 48

    # E-UTRAN band XIX.
    MM_MODEM_BAND_EUTRAN_XIX = 49

    # E-UTRAN band XX.
    MM_MODEM_BAND_EUTRAN_XX = 50

    # E-UTRAN band XXI.
    MM_MODEM_BAND_EUTRAN_XXI = 51

    # E-UTRAN band XXII.
    MM_MODEM_BAND_EUTRAN_XXII = 52

    # E-UTRAN band XXIII.
    MM_MODEM_BAND_EUTRAN_XXIII = 53

    # E-UTRAN band XXIV.
    MM_MODEM_BAND_EUTRAN_XXIV = 54

    # E-UTRAN band XXV.
    MM_MODEM_BAND_EUTRAN_XXV = 55

    # E-UTRAN band XXVI.
    MM_MODEM_BAND_EUTRAN_XXVI = 56

    # E-UTRAN band XXXIII.
    MM_MODEM_BAND_EUTRAN_XXXIII = 63

    # E-UTRAN band XXXIV.
    MM_MODEM_BAND_EUTRAN_XXXIV = 64

    # E-UTRAN band XXXV.
    MM_MODEM_BAND_EUTRAN_XXXV = 65

    # E-UTRAN band XXXVI.
    MM_MODEM_BAND_EUTRAN_XXXVI = 66

    # E-UTRAN band XXXVII.
    MM_MODEM_BAND_EUTRAN_XXXVII = 67

    # E-UTRAN band XXXVIII.
    MM_MODEM_BAND_EUTRAN_XXXVIII = 68

    # E-UTRAN band XXXIX.
    MM_MODEM_BAND_EUTRAN_XXXIX = 69

    # E-UTRAN band XL.
    MM_MODEM_BAND_EUTRAN_XL = 70

    # E-UTRAN band XLI.
    MM_MODEM_BAND_EUTRAN_XLI = 71

    # E-UTRAN band XLII.
    MM_MODEM_BAND_EUTRAN_XLII = 72

    # E-UTRAN band XLIII.
    MM_MODEM_BAND_EUTRAN_XLIII = 73
    
    # - - - - - - - - - - CDMA Band Classes (see 3GPP2 C.S0057-C) - - - - - - - - - -
    # CDMA Band Class 0 (US Cellular 850MHz).
    MM_MODEM_BAND_CDMA_BC0_CELLULAR_800 = 128

    # CDMA Band Class 1 (US PCS 1900MHz).
    MM_MODEM_BAND_CDMA_BC1_PCS_1900 = 129

    # CDMA Band Class 2 (UK TACS 900MHz).
    MM_MODEM_BAND_CDMA_BC2_TACS = 130

    # CDMA Band Class 3 (Japanese TACS).
    MM_MODEM_BAND_CDMA_BC3_JTACS = 131

    # CDMA Band Class 4 (Korean PCS).
    MM_MODEM_BAND_CDMA_BC4_KOREAN_PCS = 132

    # CDMA Band Class 5 (NMT 450MHz).
    MM_MODEM_BAND_CDMA_BC5_NMT450 = 134

    # CDMA Band Class 6 (IMT2000 2100MHz).
    MM_MODEM_BAND_CDMA_BC6_IMT2000 = 135

    # CDMA Band Class 7 (Cellular 700MHz).
    MM_MODEM_BAND_CDMA_BC7_CELLULAR_700 = 136

    # CDMA Band Class 8 (1800MHz).
    MM_MODEM_BAND_CDMA_BC8_1800 = 137

    # CDMA Band Class 9 (900MHz).
    MM_MODEM_BAND_CDMA_BC9_900 = 138

    # CDMA Band Class 10 (US Secondary 800).
    MM_MODEM_BAND_CDMA_BC10_SECONDARY_800 = 139

    # CDMA Band Class 11 (European PAMR 400MHz).
    MM_MODEM_BAND_CDMA_BC11_PAMR_400 = 140

    # CDMA Band Class 12 (PAMR 800MHz).
    MM_MODEM_BAND_CDMA_BC12_PAMR_800 = 141

    # CDMA Band Class 13 (IMT2000 2500MHz Expansion).
    MM_MODEM_BAND_CDMA_BC13_IMT2000_2500 = 142

    # CDMA Band Class 14 (More US PCS 1900MHz).
    MM_MODEM_BAND_CDMA_BC14_PCS2_1900 = 143

    # CDMA Band Class 15 (AWS 1700MHz).
    MM_MODEM_BAND_CDMA_BC15_AWS = 144

    # CDMA Band Class 16 (US 2500MHz).
    MM_MODEM_BAND_CDMA_BC16_US_2500 = 145

    # CDMA Band Class 17 (US 2500MHz Forward Link Only).
    MM_MODEM_BAND_CDMA_BC17_US_FLO_2500 = 146

    # CDMA Band Class 18 (US 700MHz Public Safety).
    MM_MODEM_BAND_CDMA_BC18_US_PS_700 = 147

    # CDMA Band Class 19 (US Lower 700MHz). 
    MM_MODEM_BAND_CDMA_BC19_US_LOWER_700 = 148

    # - - - - - - - - - - All/Any - - - - - - - - - -
    # For certain operations, allow the modem to select a band automatically.
    MM_MODEM_BAND_ANY = 256


class ModemCapability(Enum):
    # Modem has no capabilities.
    MM_MODEM_CAPABILITY_NONE = 0

    # Modem supports the analog wired telephone network (ie 56k dialup) and does not have wireless/cellular capabilities.
    MM_MODEM_CAPABILITY_POTS = 1 << 0

    # Modem supports at least one of CDMA 1xRTT, EVDO revision 0, EVDO revision A, or EVDO revision B.
    MM_MODEM_CAPABILITY_CDMA_EVDO = 1 << 1

    # Modem supports at least one of GSM, GPRS, EDGE, UMTS, HSDPA, HSUPA, or HSPA+ packet switched data capability.
    MM_MODEM_CAPABILITY_GSM_UMTS = 1 << 2

    # Modem has LTE data capability.
    MM_MODEM_CAPABILITY_LTE = 1 << 3

    # Modem has LTE Advanced data capability.
    MM_MODEM_CAPABILITY_LTE_ADVANCED = 1 << 4

    # Modem has Iridium capabilities.
    MM_MODEM_CAPABILITY_IRIDIUM = 1 << 5

    # Mask specifying all capabilities.
    MM_MODEM_CAPABILITY_ANY = 0xFFFFFFFF

class ModemCdmaRmProtocol(Enum):
    # Unknown protocol.
    MM_MODEM_CDMA_RM_PROTOCOL_UNKNOWN = 0

    # Asynchronous data or fax.
    MM_MODEM_CDMA_RM_PROTOCOL_ASYNC = 1

    # Packet data service, Relay Layer Rm interface.
    MM_MODEM_CDMA_RM_PROTOCOL_PACKET_RELAY = 2

    # Packet data service, Network Layer Rm interface, PPP.
    MM_MODEM_CDMA_RM_PROTOCOL_PACKET_NETWORK_PPP = 3

    # Packet data service, Network Layer Rm interface, SLIP.
    MM_MODEM_CDMA_RM_PROTOCOL_PACKET_NETWORK_SLIP = 4

    # STU-III service.
    MM_MODEM_CDMA_RM_PROTOCOL_STU_III = 5


class ModemLock(Enum):
    # Lock reason unknown.
    MM_MODEM_LOCK_UNKNOWN = 0

    # Modem is unlocked.
    MM_MODEM_LOCK_NONE = 1

    # SIM requires the PIN code.
    MM_MODEM_LOCK_SIM_PIN = 2

    # SIM requires the PIN2 code.
    MM_MODEM_LOCK_SIM_PIN2 = 3

    # SIM requires the PUK code.
    MM_MODEM_LOCK_SIM_PUK = 4

    # SIM requires the PUK2 code.
    MM_MODEM_LOCK_SIM_PUK2 = 5

    # Modem requires the service provider PIN code.
    MM_MODEM_LOCK_PH_SP_PIN = 6

    # Modem requires the service provider PUK code.
    MM_MODEM_LOCK_PH_SP_PUK = 7

    # Modem requires the network PIN code.
    MM_MODEM_LOCK_PH_NET_PIN = 8

    # Modem requires the network PUK code.
    MM_MODEM_LOCK_PH_NET_PUK = 9

    # Modem requires the PIN code.
    MM_MODEM_LOCK_PH_SIM_PIN = 10

    # Modem requires the corporate PIN code.
    MM_MODEM_LOCK_PH_CORP_PIN = 11

    # Modem requires the corporate PUK code.
    MM_MODEM_LOCK_PH_CORP_PUK = 12

    # Modem requires the PH-FSIM PIN code.
    MM_MODEM_LOCK_PH_FSIM_PIN = 13

    # Modem requires the PH-FSIM PUK code.
    MM_MODEM_LOCK_PH_FSIM_PUK = 14

    # Modem requires the network subset PIN code.
    MM_MODEM_LOCK_PH_NETSUB_PIN = 15

    # Modem requires the network subset PUK code.
    MM_MODEM_LOCK_PH_NETSUB_PUK = 16


class ModemMode(Enum):
    # None.
    MM_MODEM_MODE_NONE = 0

    # CSD, GSM, and other circuit-switched technologies.
    MM_MODEM_MODE_CS = 1 << 0

    # GPRS, EDGE.
    MM_MODEM_MODE_2G = 1 << 1

    # UMTS, HSxPA.
    MM_MODEM_MODE_3G = 1 << 2

    # LTE.
    MM_MODEM_MODE_4G = 1 << 3

    # 5GNR. Since 1.14.
    MM_MODEM_MODE_5G = 1 << 4

    # Any mode can be used (only this value allowed for POTS modems).
    MM_MODEM_MODE_ANY = 0xFFFFFFFF


class ModemPortType(Enum):
    # Unknown.
    MM_MODEM_PORT_TYPE_UNKNOWN = 1

    # Net port.
    MM_MODEM_PORT_TYPE_NET = 2

    # AT port.
    MM_MODEM_PORT_TYPE_AT = 3

    # QCDM port.
    MM_MODEM_PORT_TYPE_QCDM = 4

    # GPS port.
    MM_MODEM_PORT_TYPE_GPS = 5

    # QMI port.
    MM_MODEM_PORT_TYPE_QMI = 6

    # MBIM port.
    MM_MODEM_PORT_TYPE_MBIM = 7


class ModemPowerState(Enum):
    # Unknown power state.
    MM_MODEM_POWER_STATE_UNKNOWN = 0

    # Off.
    MM_MODEM_POWER_STATE_OFF = 1

    # Low-power mode.
    MM_MODEM_POWER_STATE_LOW = 2

    # Full power mode.
    MM_MODEM_POWER_STATE_ON = 3


class ModemState(Enum):
    # The modem is unusable.
    MM_MODEM_STATE_FAILED = -1

    # State unknown or not reportable.
    MM_MODEM_STATE_UNKNOWN = 0

    # The modem is currently being initialized.
    MM_MODEM_STATE_INITIALIZING = 1

    # The modem needs to be unlocked.
    MM_MODEM_STATE_LOCKED = 2

    # The modem is not enabled and is powered down.
    MM_MODEM_STATE_DISABLED = 3

    # The modem is currently transitioning to the MM_MODEM_STATE_DISABLED state.
    MM_MODEM_STATE_DISABLING = 4

    # The modem is currently transitioning to the MM_MODEM_STATE_ENABLED state.
    MM_MODEM_STATE_ENABLING = 5

    # The modem is enabled and powered on but not registered with a network provider and not available for data connections.
    MM_MODEM_STATE_ENABLED = 6

    # The modem is searching for a network provider to register with.
    MM_MODEM_STATE_SEARCHING = 7

    # The modem is registered with a network provider, and data connections and messaging may be available for use.
    MM_MODEM_STATE_REGISTERED = 8

    # 
    #  The modem is disconnecting and deactivating the last active packet data bearer. 
    #  This state will not be entered if more than one packet data bearer is active and one of the active bearers is deactivated.
    
    MM_MODEM_STATE_DISCONNECTING = 9

    # 
    #  The modem is activating and connecting the first packet data bearer. 
    #  Subsequent bearer activations when another bearer is already active do not cause this state to be entered.
    
    MM_MODEM_STATE_CONNECTING = 10

    # One or more packet data bearers is active and connected.
    MM_MODEM_STATE_CONNECTED = 11


class ModemStateChangeReason(Enum):
    # Reason unknown or not reportable.
    MM_MODEM_STATE_CHANGE_REASON_UNKNOWN = 0

    # State change was requested by an interface user.
    MM_MODEM_STATE_CHANGE_REASON_USER_REQUESTED = 1

    # State change was caused by a system suspend.
    MM_MODEM_STATE_CHANGE_REASON_SUSPEND = 2

    # State change was caused by an unrecoverable error.
    MM_MODEM_STATE_CHANGE_REASON_FAILURE = 3


class ModemStateFailedReason(Enum):
    # No error.
    MM_MODEM_STATE_FAILED_REASON_NONE = 0

    # Unknown error.
    MM_MODEM_STATE_FAILED_REASON_UNKNOWN = 1

    # SIM is required but missing.
    MM_MODEM_STATE_FAILED_REASON_SIM_MISSING = 2

    # SIM is available, but unusable (e.g. permanently locked).
    MM_MODEM_STATE_FAILED_REASON_SIM_ERROR = 3

def getManagedModems(self, objects):
    paths = [path for path in objects if MODEM_BASE_OBJ in path]
    modems = {}

    for path in paths:
        modems[path] = {MODEM_IFACE: dbusmock.get_object(path).GetAll(MODEM_IFACE),
                        'org.freedesktop.DBus.Properties': {}}
    print(modems)

    return dbus.Dictionary(modems, signature='oa{sa{sv}}')

def load(mock, parameters):
    # Main object
    manager_props = {'Version': parameters.get('Version', '1.20.0')}
    manager_methods = [('ScanDevices', '', '', ''),
                       ('SetLogging', 's', '', '')]
    mock.AddObject(MANAGER_OBJ,
                   MANAGER_IFACE,
                   manager_props,
                   manager_methods)
    mock.object_manager_emit_added(MANAGER_OBJ)

    obj = dbusmock.get_object(MANAGER_OBJ)
    obj.getManagedModems = getManagedModems
    obj.AddMethod('org.freedesktop.DBus.ObjectManager', 'GetManagedObjects', '', 'a{oa{sa{sv}}}', 'ret = self.getManagedModems(self, objects)')

    # Sample Modem
    modem_props = {'Sim': dbus.ObjectPath(SIM_BASE_OBJ + '0'), # o
                   'SimSlots': dbus.Array([dbus.ObjectPath(SIM_BASE_OBJ + '0')], signature='o'), # ao
                   'PrimarySimSlot': dbus.UInt32(0), # u
                   'Bearers': dbus.Array([], signature='o'), # ao
                   'SupportedCapabilities': dbus.Array([ModemCapability.MM_MODEM_CAPABILITY_CDMA_EVDO.value + ModemCapability.MM_MODEM_CAPABILITY_LTE.value], signature='u'), # au
                   'CurrentCapabilities': dbus.UInt32(ModemCapability.MM_MODEM_CAPABILITY_CDMA_EVDO.value + ModemCapability.MM_MODEM_CAPABILITY_LTE.value), # u
                   'MaxBearers': dbus.UInt32(2), # u
                   'MaxActiveBearers': dbus.UInt32(1), # u
                   'MaxActiveMultiplexedBearers': dbus.UInt32(0), # u
                   'Manufacturer': 'HarborDigital', # s
                   'Model': 'ModemManager-Mock', # s
                   'Revision': 'v1', # s
                   'CarrierConfiguration': '', # s
                   'CarrierConfigurationRevision': '', # s
                   'HardwareRevision': '', # s
                   'DeviceIdentifier': 'HarborDigital:ModemManager-Mock:v1', # s
                   'Device': 'not-real', # s
                   'Drivers': dbus.Array([], signature='s'), # as
                   'Plugin': 'python-dbusmock', # s
                   'PrimaryPort': 'ttyACM0', # s
                   'Ports': dbus.Array([('ttyACM3', 3), ('ttyACM3', 1), ('wwx000011121314', 2), ('ttyACM5', 1), ('ttyACM0', 3), ('ttyACM1', 1), ('ttyACM2', 1), ], signature='(su)'), # a(su)
                   'EquipmentIdentifier': '12456test', # s
                   'UnlockRequired': dbus.UInt32(ModemLock.MM_MODEM_LOCK_NONE.value), # u
                   'UnlockRetries': dbus.Dictionary({}, signature='uu'), # a{uu}
                   'State': dbus.Int32(ModemState.MM_MODEM_STATE_REGISTERED.value), # i
                   'StateFailedReason': dbus.UInt32(ModemStateFailedReason.MM_MODEM_STATE_FAILED_REASON_NONE.value), # u
                   'AccessTechnologies': ModemAccessTechnology.MM_MODEM_ACCESS_TECHNOLOGY_LTE.value + ModemAccessTechnology.MM_MODEM_ACCESS_TECHNOLOGY_EVDO0.value, # u
                   'SignalQuality': dbus.Struct((dbus.UInt32(76), dbus.Boolean(True)), signature='ub'), # (ub)
                   'OwnNumbers': dbus.Array([], signature='s'), # as
                   'PowerState': ModemPowerState.MM_MODEM_POWER_STATE_ON.value, # u
                   'SupportedModes': dbus.Array([dbus.Struct((ModemMode.MM_MODEM_MODE_4G.value + ModemMode.MM_MODEM_MODE_3G.value, ModemMode.MM_MODEM_MODE_4G.value), signature='uu')], signature='(uu)'), # a(uu)
                   'CurrentModes': dbus.Struct((ModemMode.MM_MODEM_MODE_4G.value + ModemMode.MM_MODEM_MODE_3G.value, ModemMode.MM_MODEM_MODE_4G.value), signature='uu'), # (uu)
                   'SupportedBands': dbus.Array([ModemBand.MM_MODEM_BAND_UNKNOWN.value], signature='u'), # au
                   'CurrentBands': dbus.Array([ModemBand.MM_MODEM_BAND_UNKNOWN.value], signature='u'), # au
                   'SupportedIpFamilies': dbus.UInt32(BearerIpFamily.MM_BEARER_IP_FAMILY_IPV4V6.value + BearerIpFamily.MM_BEARER_IP_FAMILY_IPV4.value + BearerIpFamily.MM_BEARER_IP_FAMILY_IPV6.value)} # u
    modem_methods = [('Ope', '', '', '')]
    mock.AddObject(MODEM_BASE_OBJ + '0',
                   MODEM_IFACE,
                   modem_props,
                   modem_methods)
    mock.object_manager_emit_added(MODEM_BASE_OBJ + '0')

    # Sample SIM
    sim_props = {'Active': True,                                            # b
                 'SimIdentifier': '11111111111111111111',                   # s
                 'Imsi': '111111111111111',                                 # s
                 'Eid': '',                                                 # s
                 'OperatorIdentifier': '310030',                            # s
                 'OperatorName': 'Harbor-test',                             # s
                 'EmergencyNumbers': dbus.Array([], signature='s'),         # as
                 'PreferredNetworks': dbus.Array([('310030', 0)], signature='(su)')}            # a(su)
    sim_methods = [('Ope', '', '', '')]

    mock.AddObject(SIM_BASE_OBJ + '0',
                   SIM_IFACE,
                   sim_props,
                   sim_methods)
    mock.object_manager_emit_added(SIM_BASE_OBJ + '0')

    modem3gpp_props = {'Imei': '111111111111111',
                       'RegistrationState': 1,
                       'OperatorCode': '310410',
                       'OperatorName': 'AT&T',
                       'EnabledFacilityLocks': 0,
                       'SubscriptionState': 0,
                       'EpsUeModeOperation': 4,
                       'Pco': dbus.Array([], signature='(ubay)'),
                       'InitialEpsBearer': '/',
                       'InitialEpsBearerSettings': dbus.Dictionary({}, signature='sv'),
                       'PacketServiceState': 0,
                       'Nr5gRegistrationSettings': dbus.Dictionary({}, signature='sv')}
    modem3gpp_methods = [('Register', 's', '', ''),
                         ('Scan', '', 'aa{sv}', ''),
                         ('SetEpsUeModeOperation', 'u', '', ''),
                         ('SetInitialEpsBearerSettings', 'a{sv}', '', ''),
                         ('SetNr5gRegistrationSettings', 'a{sv}', '', ''),
                         ('DisableFacilityLock', '(us)', '', ''),
                         ('SetPacketServiceState', 'u', '', '')]
    
    obj = dbusmock.get_object(MODEM_BASE_OBJ + '0')
    obj.AddProperties(MODEM3GPP_IFACE,
                      modem3gpp_props)
    obj.AddMethods(MODEM3GPP_IFACE,
                   modem3gpp_methods)

