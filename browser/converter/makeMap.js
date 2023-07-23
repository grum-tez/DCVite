import { writeFileSync } from 'fs'

function generateMichelineMap() {
  const map = { value: [] }

  for (let i = 0; i <= 1000; i++) {
    map.value.push({
      prim: 'Elt',
      args: [
        {
          prim: 'Pair',
          args: [{ int: String(i) }, { int: '1000' }],
        },
        {
          prim: 'Pair',
          args: [{ int: String(i) }, { int: '1' }],
        },
      ],
    })
  }

  return map
}

writeFileSync('map.tz', JSON.stringify(generateMichelineMap(), null, 2))
