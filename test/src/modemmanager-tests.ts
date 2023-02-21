import { Modem, ModemManager, ModemManagerTypes } from '../../src/index';
import * as dbus from 'dbus';
import { TestContext } from './hooks';
import { expect } from 'chai';

describe('ModemManager tests', () => {

    it('getModem() valid input', function(this: TestContext) {
        let modem0a: Modem | null = null;
        let modem0b: Modem | undefined = undefined;

        modem0a = this.manager.getModem(0);
        modem0b = this.manager.modems.get('/org/freedesktop/ModemManager1/Modem/0');

        expect(modem0a).to.be.equal(modem0b);
    });

    it('getModem() incorrect input (modem does not exist)', function(this: TestContext) {
        let modem: Modem | null = null;

        modem = this.manager.getModem(1);

        expect(modem).to.be.null
    });
});