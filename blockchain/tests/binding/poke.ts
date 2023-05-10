import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const poke_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Poke {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/poke.arl", {}, params)).address;
        this.address = address;
    }
    async poke(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "poke", poke_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_poke_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "poke", poke_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_pokers(): Promise<Array<att.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list((storage as att.Mpair).args[0], x => { return att.Address.from_mich(x); });
        }
        throw new Error("Contract not initialised");
    }
    async get_count(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Int.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const poke = new Poke();
