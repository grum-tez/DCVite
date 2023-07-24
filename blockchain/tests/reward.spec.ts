import {
  get_account,
  reset_experiment,
  set_mockup,
  set_mockup_now,
  register_global_constant,
  mockup_init,
} from '@completium/experiment-ts'
import {
  Int,
  Tez,
  Nat,
  elt_to_mich,
  Rational,
} from '@completium/archetype-ts-types'

import { rewards_contract } from './binding/rewards_contract'

import assert from 'assert'
import fs from 'fs'

/* Accounts ---------------------------------------------------------------- */

const frank = get_account('frank')

/* Initialisation ---------------------------------------------------------- */
const michelineMap = JSON.parse(fs.readFileSync('shortMap.json', 'utf-8'))

const GHOSTNET = 'https://ghostnet.ecadinfra.com'

describe('Initialisation', async () => {
  it('Reset experiment', async () => {
    await reset_experiment({
      account: 'frank',
      endpoint: 'mockup',
      quiet: true,
    })
  })
  it('set_mockup', async () => {
    // await mockup_init()
    set_mockup()
  })
  it('set_mockup_now', async () => {
    set_mockup_now(new Date(Date.now()))
  })

  // it('Register map global constant', async () => {
  //   console.log(await register_global_constant(michelineMap, { as: frank }))
  // })
})

/* Scenario ---------------------------------------------------------------- */

describe('[REWARDS_CONTRACT] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await rewards_contract.deploy({ as: frank })
  })
})

// describe('[REWARDS_CONTRACT] Test Reward Entrypoint', async () => {
//   it('Count increments by one', async () => {
//     const count_before = await rewards_contract.get_reward_count()
//     assert(count_before.equals(new Int(0)))

//     await rewards_contract.reward({ as: frank })

//     const count_after = await rewards_contract.get_reward_count()
//     assert(count_after.equals(new Int(1)))
//   })
// })

describe('[REWARDS_CONTRACT] Test DONATE Entrypoint', async () => {
  it('can be called', async () => {
    const donation_amount = new Tez(1, 'tez')
    await rewards_contract.donate({ as: frank, amount: donation_amount })
  })

  it('updates mystery_map', async () => {})
})
