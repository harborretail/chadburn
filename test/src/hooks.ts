import * as dbus from 'dbus';
import {ModemManager, Modem} from '../../src/index';

export type InjectableContext = Readonly<{
    
}>

export type TestContext = Mocha.Context & InjectableContext;

export const mochaHooks = (): Mocha.RootHookObject => {
    return {
        async beforeAll(this: Mocha.Context) {
            const bus = dbus.getBus('system');
            const manager = await ModemManager.init(bus);
            const modem0 = manager.modems.get(Array.from(manager.modems.keys())[0]);
            const context: InjectableContext = {
                bus,
                manager,
                modem0
            };

            Object.assign(this, context);
        },

        afterAll(this: TestContext) {
            this.manager?.close();
            this.bus?.disconnect();
        },
    };
}