import fs from 'fs'
import {
  Int,
  Tez,
  Nat,
  elt_to_mich,
  Rational,
} from '@completium/archetype-ts-types'

function F(x) {
  var C = 1.06586348016531
  return -1.06586348016531 * Math.pow(1 / (x + 1), 1.161) + C
}

// Helper function to find the greatest common divisor (gcd) of two numbers

function createMapping() {
  let mapping = []

  for (let i = 0; i <= 1000; i++) {
    let x = (i * 10) / 1000
    let fx = F(x)

    // In Tezos, numbers must be integers. We represent decimal numbers as fractions
    // fx = Math.round(fx * 1000000)

    const eltNode = elt_to_mich(
      new Rational(x).to_mich(),
      new Rational(fx).to_mich()
    )

    mapping.push(eltNode)

    // const q = 7
    // if (mapping.length == q) {
    //   break // We only want the first q entries
    // }
  }

  // Sort the mapping by the keys (fractions) in ascending order.
  // mapping.sort((a, b) => {
  //   let aNumerator = parseInt(a.args[0].args[0].int)
  //   let aDenominator = parseInt(a.args[0].args[1].int)
  //   let bNumerator = parseInt(b.args[0].args[0].int)
  //   let bDenominator = parseInt(b.args[0].args[1].int)

  //   return aNumerator / aDenominator - bNumerator / bDenominator
  // })

  return mapping
}

let mapping = createMapping()

function sortMichelineMap(michelineMap) {
  // Parse JSON string
  // const parsedMap = JSON.parse(michelineMap)

  // Sort by the values of the 'args' key
  michelineMap.sort((a, b) => {
    const aKey = [
      parseInt(a.args[0].args[0].int),
      parseInt(a.args[0].args[1].int),
    ]
    const bKey = [
      parseInt(b.args[0].args[0].int),
      parseInt(b.args[0].args[1].int),
    ]
    return aKey[0] - bKey[0] || aKey[1] - bKey[1]
  })

  // Convert back to JSON string
  return michelineMap
}

const sorted_mapping = sortMichelineMap(mapping)

fs.writeFile(
  'shortMap.json',
  JSON.stringify(sorted_mapping, null, 2),
  (err) => {
    if (err) throw err
    console.log('The file was successfully saved!')

    // Printing the first 5 elements of the mapping to the console
    console.log(JSON.stringify(sorted_mapping, null, 2))
  }
)
