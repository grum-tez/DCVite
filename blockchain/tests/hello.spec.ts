
import {get_account, reset_experiment, set_mockup, set_mockup_now} from "@completium/experiment-ts";
import { Int } from "@completium/archetype-ts-types";

import { poke_contract } from './binding/poke_contract'

import assert from 'assert'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');

/* Initialisation ---------------------------------------------------------- */

describe('Initialisation', async () => {
  it('Reset experiment', async () => {
    await reset_experiment({
      account: 'alice',
      endpoint: 'mockup',
      quiet: true,
    });
  });
  it('set_mockup', async () => {
    set_mockup()
    // await mockup_init()
  });
  it('set_mockup_now', async () => {
    set_mockup_now(new Date(Date.now()))
  });
})

/* Scenario ---------------------------------------------------------------- */

describe('[POKE_CONTRACT] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await poke_contract.deploy({ as: alice })
  });
})

describe('[POKE_CONTRACT] Test Poke Entrypoint', async () => {

  it("Count increments by one", async () => {
    const count_before = await poke_contract.get_poke_count()
    assert(count_before.equals(new Int(0)))

    await poke_contract.poke({ as : alice })

    const count_after = await poke_contract.get_poke_count()
    assert(count_after.equals(new Int(1)))
  })

})