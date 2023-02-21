import { ModemManagerTypes } from '../../src/index';
import * as util from '../../src/util';
import { expect } from 'chai';

describe('int32ToEnumArray tests', () => {
    it('checking negative number + valid enum', () => {
        expect(util.int32ToEnumArray(-1, ModemManagerTypes.ModemCapability)).to.be.empty;
    });

    it('checking valid number + nullish enum', () => {
        expect(util.int32ToEnumArray.bind(util, 1, null)).to.throw('Failed to parse given enumeration, likely from passing in a non-enumeration type');
    });

    it('checking valid number + non-enum type', () => {
        expect(util.int32ToEnumArray.bind(util, 1, [1,2,3])).to.throw('Failed to parse given enumeration, likely from passing in a non-enumeration type');
    });

    it('checking 0 + valid enum', () => {
        expect(util.int32ToEnumArray(0, ModemManagerTypes.ModemCapability)).to.deep.equal(['MM_MODEM_CAPABILITY_NONE']);
    });

    it('checking single entry returned', () => {
        expect(util.int32ToEnumArray(1, ModemManagerTypes.ModemCapability)).to.deep.equal(['MM_MODEM_CAPABILITY_POTS']);
    });

    it('checking multiple entries returned', () => {
        expect(util.int32ToEnumArray(6, ModemManagerTypes.ModemCapability)).to.deep.equal(['MM_MODEM_CAPABILITY_CDMA_EVDO', 'MM_MODEM_CAPABILITY_GSM_UMTS']);
    });
});