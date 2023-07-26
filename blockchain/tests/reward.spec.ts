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
  Entrypoint,
} from '@completium/archetype-ts-types'

import { rewards_contract } from './binding/rewards_contract'

import {
  run_scenario_test,
  testParams,
  CallMaker,
  generateCall,
} from '../numinous/index'

import assert from 'assert'
import fs from 'fs'

/* Accounts ---------------------------------------------------------------- */
const alice = get_account('alice')
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
    console.log(rewards_contract.address)
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
    const rew_con_donate = generateCall(rewards_contract, 'donate')
    const donation_amount = new Tez(5, 'tez')
    const alice_before = await alice.get_balance()
    await rew_con_donate([], { as: alice, amount: donation_amount })
    // await rewards_contract.donate({ as: alice, amount: donation_amount })
    const alice_after = await alice.get_balance()

    console.log('alice differece: ', alice_after.minus(alice_before).toString())
  })
})

describe('Make one donation', function () {
  before(async function () {
    //ENTRYPOINT CALLS AND THEIR CALL PARAMETERS
    const rewards_contract_address = rewards_contract.get_address()
    testDataArray = await run_scenario_test(
      //Scenario Description:
      //A test scenario with only one entrypoint call
      [
        {
          description: 'Alice donates 5tz to Frank',
          as: alice,
          amount: new Tez(5, 'tez'),
          contract: rewards_contract,
          entrypoint: 'donate',
          args: [],
          delay_after: 100,
        } as CallMaker,
      ],
      testDataArray
    )
  })

  //LIST OF ACCOUNTS TO TEST AND EXPECTED CHANGES

  let testDataArray: Array<testParams> = [
    {
      account: alice,
      description: 'alice spends 4tz',
      expected_change: -4,
    } as testParams,
    {
      description: 'Frank gets some tz',
      account: frank,
      expected_change: 4,
    } as testParams,
  ]

  //EXECUTE TESTS FROM ARRAY.
  for (const tp of testDataArray) {
    it(`${tp.description}`, function () {
      this.tp = tp
      assert(tp.difference.isLessThanOrEqualTo(tp.tolerance), tp.error_message)
    })
  }

  afterEach(function () {
    if (this.tp && this.tp.info_message) {
      if (this.currentTest?.state === 'failed') {
        console.log(this.tp.error_message)
      } else {
        console.log(this.tp.info_message)
      }
    }
  })
})
