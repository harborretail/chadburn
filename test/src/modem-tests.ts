import { Modem, ModemManager, ModemManagerTypes } from '../../src/index';
import * as dbus from 'dbus';
import { expect } from 'chai';
import { TestContext } from './hooks';

describe('Modem tests', () => {

    it('verify Modem creation', function(this: TestContext) {
        expect(this.modem0?.properties.Manufacturer).to.deep.equal('HarborDigital');
        expect(this.modem0?.properties.Model).to.deep.equal('ModemManager-Mock');
        expect(this.modem0?.properties.DeviceIdentifier).to.contain('HarborDigital:ModemManager-Mock');
    });

    it('verifying Modem prettyProperties - SupportedCapabilities', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.SupportedCapabilities).to.deep.equal([ [ 'MM_MODEM_CAPABILITY_CDMA_EVDO', 'MM_MODEM_CAPABILITY_LTE' ] ]);
    });

    it('verifying Modem prettyProperties - CurrentCapabilities', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.CurrentCapabilities).to.deep.equal([ 'MM_MODEM_CAPABILITY_CDMA_EVDO', 'MM_MODEM_CAPABILITY_LTE' ]);
    });

    it('verifying Modem prettyProperties - Ports', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.Ports).to.deep.equal({
            ttyACM3: 'MM_MODEM_PORT_TYPE_UNKNOWN',
            wwx000011121314: 'MM_MODEM_PORT_TYPE_NET',
            ttyACM5: 'MM_MODEM_PORT_TYPE_UNKNOWN',
            ttyACM0: 'MM_MODEM_PORT_TYPE_AT',
            ttyACM1: 'MM_MODEM_PORT_TYPE_UNKNOWN',
            ttyACM2: 'MM_MODEM_PORT_TYPE_UNKNOWN'
        });
    });

    it('verifying Modem prettyProperties - UnlockRequired', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.UnlockRequired).to.deep.equal('MM_MODEM_LOCK_NONE');
    });

    it('verifying Modem prettyProperties - State', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.State).to.deep.equal('MM_MODEM_STATE_REGISTERED');
    });

    it('verifying Modem prettyProperties - StateFailedReason', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.StateFailedReason).to.deep.equal('MM_MODEM_STATE_FAILED_REASON_NONE');
    });

    it('verifying Modem prettyProperties - AccessTechnologies', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.AccessTechnologies).to.deep.equal(['MM_MODEM_ACCESS_TECHNOLOGY_EVDO0', 'MM_MODEM_ACCESS_TECHNOLOGY_LTE']);
    });

    it('verifying Modem prettyProperties - SignalQuality', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.SignalQuality).to.deep.equal({ quality: 76, recent: true });
    });

    it('verifying Modem prettyProperties - PowerState', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.PowerState).to.deep.equal('MM_MODEM_POWER_STATE_ON');
    });

    it('verifying Modem prettyProperties - SupportedModes', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.SupportedModes).to.deep.equal([ { modes: ['MM_MODEM_MODE_3G', 'MM_MODEM_MODE_4G'], preferred: 'MM_MODEM_MODE_4G' } ]);
    });

    it('verifying Modem prettyProperties - CurrentModes', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.CurrentModes).to.deep.equal({ modes: ['MM_MODEM_MODE_3G', 'MM_MODEM_MODE_4G'], preferred: 'MM_MODEM_MODE_4G' });
    });

    it('verifying Modem prettyProperties - SupportedBands', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.SupportedBands).to.deep.equal([ 'MM_MODEM_BAND_UNKNOWN' ]);
    });

    it('verifying Modem prettyProperties - CurrentBands', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.CurrentBands).to.deep.equal([ 'MM_MODEM_BAND_UNKNOWN' ]);
    });

    it('verifying Modem prettyProperties - SupportedIpFamilies', function(this: TestContext) {
        let prettyProperties = this.modem0?.prettyProperties;
        expect(prettyProperties.SupportedIpFamilies).to.deep.equal([ 'MM_BEARER_IP_FAMILY_IPV4', 'MM_BEARER_IP_FAMILY_IPV6', 'MM_BEARER_IP_FAMILY_IPV4V6' ]);
    });
});