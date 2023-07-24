import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const donations_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export class donations_value implements att.ArchetypeType {
    constructor(public donor: att.Address, public amount: att.Tez) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.donor.to_mich(), this.amount.to_mich()]);
    }
    equals(v: donations_value): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): donations_value {
        return new donations_value(att.Address.from_mich((input as att.Mpair).args[0]), att.Tez.from_mich((input as att.Mpair).args[1]));
    }
}
export const donations_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%donor"]),
    att.prim_annot_to_mich_type("mutez", ["%amount"])
], []);
export type donations_container = Array<[
    att.Nat,
    donations_value
]>;
export const donations_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%donor"]),
    att.prim_annot_to_mich_type("mutez", ["%amount"])
], []), []);
const reward_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const donate_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Rewards_contract {
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
        const address = (await ex.deploy("./contracts/rewards_contract.arl", {}, params)).address;
        this.address = address;
    }
    async reward(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "reward", reward_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async donate(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "donate", donate_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_reward_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "reward", reward_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_donate_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "donate", donate_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_reward_count(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Int.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_total_donated(): Promise<att.Tez> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Tez.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    async get_donation_id_tracker(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[2]);
        }
        throw new Error("Contract not initialised");
    }
    async get_donations(): Promise<donations_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[3], (x, y) => [att.Nat.from_mich(x), donations_value.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: att.string_to_mich("\"MINIMUM DONATION IS 1TZ\""),
        OPTION_IS_NONE: att.string_to_mich("\"OPTION_IS_NONE\"")
    };
}
export const rewards_contract = new Rewards_contract();
