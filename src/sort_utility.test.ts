import { generateOrderWithPinned } from './sort_utility'

describe('sort utility', () => {
	describe('generateOrderWithPinned', () => {
		it('empty pinned list returns non pinned list', () => {
			const nonPinned = [1, 2, 3, 4]
			const result = generateOrderWithPinned(nonPinned, [] as any)

			expect(result).toEqual(nonPinned)
		})

		it('merge pinned with existing list - single item', () => {
			const nonPinned = [1, 3, 4, 5]
			const pinOrder = [
				{
					index: 0,
					item: 2
				}
			]
			const result = generateOrderWithPinned(nonPinned, pinOrder)

			expect(result).toEqual([2, 1, 3, 4, 5])
		})

		it('merge pinned with existing list - two together', () => {
			const nonPinned = [1, 2, 3]
			const pinOrder = [{ index: 1, item: 4 }, { index: 2, item: 5 }]

			const result = generateOrderWithPinned(nonPinned, pinOrder)

			expect(result).toEqual([1, 4, 5, 2, 3])
		})

		it('merge pinned with existing list - all pinned', () => {
			const nonPinned: number[] = []
			const pinOrder = [
				{ index: 0, item: 5 },
				{ index: 1, item: 4 },
				{ index: 2, item: 3 },
				{ index: 3, item: 2 },
				{ index: 4, item: 1 }
			]

			const result = generateOrderWithPinned(nonPinned, pinOrder)

			expect(result).toEqual([5, 4, 3, 2, 1])
		})

		it('merge pinned with existing list - pinned on end', () => {
			const nonPinned = [2, 3, 5]
			const pinOrder = [{ index: 0, item: 4 }, { index: 4, item: 1 }]

			const result = generateOrderWithPinned(nonPinned, pinOrder)

			expect(result).toEqual([4, 2, 3, 5, 1])
		})

		it('merges complex object', () => {
			const nonPinned = [{ id: 1, text: 'one' }, { id: 4, text: 'four' }]
			const pinned = [
				{
					index: 0,
					item: {
						id: 2,
						text: 'two'
					}
				},
				{
					index: 2,
					item: {
						id: 10,
						text: 'ten'
					}
				}
			]

			const result = generateOrderWithPinned(nonPinned, pinned)

			expect(result).toEqual([
				{
					id: 2,
					text: 'two'
				},
				{ id: 1, text: 'one' },
				{
					id: 10,
					text: 'ten'
				},
				{ id: 4, text: 'four' }
			])
		})
	})
})
