interface PinPosition<T> {
  index: number
  item: T
}

export function generateOrderWithPinned<T>(nonPinned: T[], pinnedList: PinPosition<T>[]): T[] {
  if (pinnedList.length === 0) return nonPinned
  if (nonPinned.length === 0) return pinnedList.map(p => p.item)

  //build array with "holes" where we aren't pinned
  const newList: T[] = new Array(nonPinned.length + pinnedList.length)

  pinnedList.forEach(pinned => {
    newList[pinned.index] = pinned.item
  })

  const nonPinnedClone = nonPinned.slice()
  let index = 0
  while (nonPinnedClone.length > 0) {
    if (newList[index] == null) {
      const val = nonPinnedClone.shift()
      if (val == null) {
        throw new Error('Out of Bounds Error: Ran out of non pinned items')
      }
      newList[index] = val
    }
    index++
  }

  return newList
}
