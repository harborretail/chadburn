import { Modem, ModemManager, Modem3gpp, ModemManagerTypes } from '../../src/index';
import * as dbus from 'dbus';
import { TestContext } from './hooks';
import { expect } from 'chai';

describe('Modem3gpp tests', () => {

    it('Modem3gpp exists when it should', async function(this: TestContext) {
        let modem3gpp = await (this.modem0?.getModem3gpp());

        expect(modem3gpp).to.exist;
    });

    it('Modem3gpp properties exist', async function(this: TestContext) {
        let modem3gpp = await (this.modem0?.getModem3gpp());

        expect(modem3gpp?.properties).to.exist;
    });
});