import DBus = require("dbus");
import { Observable } from "rxjs";
import * as ModemManagerTypes from './modem-manager/modman-dbus-types';

export async function objectInterface(bus: DBus.DBusConnection, serviceName: string, objectPath: string, interfaceName: string): Promise<DBus.DBusInterface> {
    return new Promise<DBus.DBusInterface>((resolve, reject) => {
        bus.getInterface(
            serviceName,
            objectPath,
            interfaceName,
            (err: any, iface: DBus.DBusInterface) => {
                if(err) {
                    reject(`Error getting ${interfaceName} interface on ${objectPath}: ${err}`);
                } else {
                    resolve(iface);
                }
            }
    )});
}

export function signal(objectInterface: DBus.DBusInterface, signalName: string): Observable<any[]> {
    return new Observable<any>(observer => {
        const listener = (...args: any[]) => {
            observer.next(args);
        }

        objectInterface.on(signalName, listener);
        return({
            unsubscribe() {
                objectInterface.off(signalName, listener);
            }
        });
    })
}

export async function call(objectInterface: DBus.DBusInterface, methodName: string, options: any, ...args: any[]): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
        if(args.length) {
            args.push(options);
            args.push(
                (err: string, result: any) => {
                    if(err) {
                        reject(`Error calling ${methodName} on ${objectInterface.interfaceName}: ${err}`);
                    } else {
                        resolve(result);
                    }
                }
            );
            objectInterface[methodName](...args); 
        } else {
            objectInterface[methodName](options, (err: string, result: any) => {
                if(err) {
                    reject(`Error calling ${methodName} on ${objectInterface.interfaceName}: ${err}`);
                } else {
                    resolve(result);
                }
            });
        }
    }));
}

export async function getProperty(objectInterface: DBus.DBusInterface, propertyName: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        objectInterface.getProperty(propertyName, (err, result) => {
            if(err) {
                reject(`Error getting property ${propertyName} on ${objectInterface.interfaceName} interface for object ${objectInterface.objectPath}: ${err}`);
            } else {
                resolve(result);
            }
        })
    });
}

export async function setProperty(objectInterface: DBus.DBusInterface, propertyName: string, value: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        objectInterface.setProperty(propertyName, value, (err) => {
            if(err) {
                reject(`Error setting property ${propertyName} on ${objectInterface.interfaceName} interface for object ${objectInterface.objectPath}: ${err}`);
            } else {
                resolve();
            }
        })
    });
}

export async function getAllProperties(objectInterface: DBus.DBusInterface): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        objectInterface.getProperties((err, result) => {
            if(err) {
                reject(`Error getting all properties for object ${objectInterface.objectPath} with interface ${objectInterface.interfaceName}: ${err}`);
            } else {
                resolve(result);
            }
        })
    });
}

export function byteArrayToString(array: number[]): string {
    return String.fromCharCode.apply(String, array);
}

export function stringToByteArray(input: string): number[] {
    let byteArray: number[] = [];
    for(let i = 0; i < input.length; i++) {
        byteArray[i] = input.charCodeAt(i);
    }

    return byteArray;
}

export function int32ToByteArray(int: number): Uint8Array {
    let byteArray = new ArrayBuffer(4); // an Int32 takes 4 bytes
    new DataView(byteArray).setUint32(0, int, false); // byteOffset = 0; litteEndian = false
    
    return new Uint8Array(byteArray);
}

export function int32ToEnumArray(int: number, enumeration: any): string[] {
    let values: string[] = [];
    if(typeof enumeration === 'object' && !Array.isArray(enumeration)) {
        if(int === 0) {
            values = [enumeration[0]];
        } else {
            try {
                while (int > 0) {
                    let bit = int & (~int+1);
                    values.push(enumeration[bit]);
                    int ^= bit;
                }
            } catch(e) {
                throw 'Failed to parse given enumeration, likely from passing in a non-enumeration type';
            }
        }
    } else {
        throw 'Failed to parse given enumeration, likely from passing in a non-enumeration type';
    }
    return values;
}