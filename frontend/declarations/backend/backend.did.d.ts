import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface MaintenanceItem {
  'id' : bigint,
  'title' : string,
  'currentHours' : number,
  'nextDue' : string,
}
export type Result = { 'ok' : MaintenanceItem } |
  { 'err' : string };
export interface _SERVICE {
  'createItem' : ActorMethod<[string, string, number], Result>,
  'getItems' : ActorMethod<[], Array<MaintenanceItem>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
