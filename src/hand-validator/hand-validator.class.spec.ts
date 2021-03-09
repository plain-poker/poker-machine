import {HandValidator} from "./hand-validator.class";
import {Card, CardColor, CardValue} from "../model/card.interface";

describe('detect pairs', () => {

	it('should detect pairs (mid case)', () => {
		const cards: Card[] = [
			[CardColor.CLUBS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FOUR],
			[CardColor.SPADES, CardValue.QUEEN],
		]
		const result = HandValidator.hasPair(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.CLUBS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.EIGHT],
		])
	});

	it('should detect pairs (bad case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FOUR],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.EIGHT],
		]
		const result = HandValidator.hasPair(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
		])
	});

	it('should not detect non pairs if theere are nonee', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FOUR],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.ACE],
		]
		const result = HandValidator.hasPair(cards);
		expect(result).toBeUndefined();
	});

});

describe('detect two pairs', () => {

	it('should detect two pairs (bad case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.EIGHT],
		]
		const result = HandValidator.hasTwoPairs(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.SPADES, CardValue.JACK],
		])
	});

	it('should not detect two pairs if there are none', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.ACE],
		]
		const result = HandValidator.hasTwoPairs(cards);
		expect(result).toBeUndefined();
	});

});

describe('detect triplets', () => {

	it('should detect two pairs (bad case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
		]
		const result = HandValidator.hasTriplet(cards);
		expect(result).toBeDefined();
		expect(result).toStrictEqual([
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.EIGHT],
		])
	});

	it('should not detect two pairs if there are none', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.CLUBS, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TWO],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.CLUBS, CardValue.ACE],
		]
		const result = HandValidator.hasTriplet(cards);
		expect(result).toBeUndefined();
	});

});

describe('straight', () => {

	it('should detect straight (good case)', () => {
		const cards: Card[] = [
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.NINE],
			[CardColor.DIAMONDS, CardValue.TEN],
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.THREE],
		]
		const result = HandValidator.hasStraight(cards);
		expect(result).toBeDefined();
		const firstStraight = result![0];
		expect(firstStraight).toStrictEqual([
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TEN],
			[CardColor.CLUBS, CardValue.NINE],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
		])
	});

	it('should detect straight (mid case)', () => {
		const cards: Card[] = [
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.CLUBS, CardValue.FOUR],
			[CardColor.HEARTS, CardValue.TWO],
			[CardColor.SPADES, CardValue.FIVE],
			[CardColor.HEARTS, CardValue.THREE],
			[CardColor.CLUBS, CardValue.THREE],
			[CardColor.DIAMONDS, CardValue.FIVE],
		]
		const result = HandValidator.hasStraight(cards);
		expect(result).toBeDefined();
		const firstStraight = result![0];
		expect(firstStraight).toStrictEqual([
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.SPADES, CardValue.FIVE],
			[CardColor.CLUBS, CardValue.FOUR],
			[CardColor.HEARTS, CardValue.THREE],
			[CardColor.HEARTS, CardValue.TWO],
		]);
	});

	it('should detect straight (worst case)', () => {
		const cards: Card[] = [
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TEN],
			[CardColor.CLUBS, CardValue.NINE],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.THREE],
		]
		const result = HandValidator.hasStraight(cards);
		expect(result).toBeDefined();
		const firstStraight = result![0];
		expect(firstStraight).toStrictEqual([
			[CardColor.SPADES, CardValue.JACK],
			[CardColor.DIAMONDS, CardValue.TEN],
			[CardColor.CLUBS, CardValue.NINE],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
		])
	});

	it('should detect straight (worst case)', () => {
		const cards: Card[] = [
			[CardColor.SPADES, CardValue.QUEEN],
			[CardColor.DIAMONDS, CardValue.TEN],
			[CardColor.CLUBS, CardValue.NINE],
			[CardColor.HEARTS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.SPADES, CardValue.EIGHT],
			[CardColor.CLUBS, CardValue.THREE],
		]
		const result = HandValidator.hasStraight(cards);
		expect(result).toBeUndefined();
	});

	it('should detect straight (worst case)', () => {
		const cards: Card[] = [
			[CardColor.SPADES, CardValue.TWO],
			[CardColor.DIAMONDS, CardValue.FOUR],
			[CardColor.CLUBS, CardValue.THREE],
			[CardColor.HEARTS, CardValue.FIVE],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.CLUBS, CardValue.EIGHT],
		];
		const result = HandValidator.hasStraight(cards);
		expect(result).toBeDefined();
		const [first, second, third] = result!;
		expect(first).toStrictEqual([
			[CardColor.CLUBS, CardValue.EIGHT],
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.HEARTS, CardValue.FIVE],
			[CardColor.DIAMONDS, CardValue.FOUR],
		]);
		expect(second).toStrictEqual([
			[CardColor.HEARTS, CardValue.SEVEN],
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.HEARTS, CardValue.FIVE],
			[CardColor.DIAMONDS, CardValue.FOUR],
			[CardColor.CLUBS, CardValue.THREE],
		]);
		expect(third).toStrictEqual([
			[CardColor.SPADES, CardValue.SIX],
			[CardColor.HEARTS, CardValue.FIVE],
			[CardColor.DIAMONDS, CardValue.FOUR],
			[CardColor.CLUBS, CardValue.THREE],
			[CardColor.SPADES, CardValue.TWO],
		]);
	});

	describe('check flush', () => {

		it ('should detect a flush (5 cards)', () => {
			const cards: Card[] = [
				[CardColor.SPADES, CardValue.TWO],
				[CardColor.DIAMONDS, CardValue.ACE],
				[CardColor.SPADES, CardValue.THREE],
				[CardColor.HEARTS, CardValue.FIVE],
				[CardColor.SPADES, CardValue.SEVEN],
				[CardColor.SPADES, CardValue.QUEEN],
				[CardColor.SPADES, CardValue.EIGHT],
			];
			const flush = HandValidator.hasFlush(cards);
			expect(flush).toBeDefined();
			expect(flush).toStrictEqual([
				[CardColor.SPADES, CardValue.QUEEN],
				[CardColor.SPADES, CardValue.EIGHT],
				[CardColor.SPADES, CardValue.SEVEN],
				[CardColor.SPADES, CardValue.THREE],
				[CardColor.SPADES, CardValue.TWO],
			]);
		});

		it ('should detect a flush (6 cards)', () => {
			const cards: Card[] = [
				[CardColor.SPADES, CardValue.TWO],
				[CardColor.DIAMONDS, CardValue.ACE],
				[CardColor.SPADES, CardValue.THREE],
				[CardColor.SPADES, CardValue.ACE],
				[CardColor.SPADES, CardValue.SEVEN],
				[CardColor.SPADES, CardValue.QUEEN],
				[CardColor.SPADES, CardValue.EIGHT],
			];
			const flush = HandValidator.hasFlush(cards);
			expect(flush).toBeDefined();
			expect(flush).toStrictEqual([
				[CardColor.SPADES, CardValue.ACE],
				[CardColor.SPADES, CardValue.QUEEN],
				[CardColor.SPADES, CardValue.EIGHT],
				[CardColor.SPADES, CardValue.SEVEN],
				[CardColor.SPADES, CardValue.THREE],
			]);
		});

		it ('should detect a flush (6 cards)', () => {
			const cards: Card[] = [
				[CardColor.SPADES, CardValue.TWO],
				[CardColor.SPADES, CardValue.TEN],
				[CardColor.SPADES, CardValue.THREE],
				[CardColor.SPADES, CardValue.ACE],
				[CardColor.SPADES, CardValue.SEVEN],
				[CardColor.SPADES, CardValue.QUEEN],
				[CardColor.SPADES, CardValue.EIGHT],
			];
			const flush = HandValidator.hasFlush(cards);
			expect(flush).toBeDefined();
			expect(flush).toStrictEqual([
				[CardColor.SPADES, CardValue.ACE],
				[CardColor.SPADES, CardValue.QUEEN],
				[CardColor.SPADES, CardValue.TEN],
				[CardColor.SPADES, CardValue.EIGHT],
				[CardColor.SPADES, CardValue.SEVEN],
			]);
		});

		it ('should not detect a flush (4 cards)', () => {
			const cards: Card[] = [
				[CardColor.SPADES, CardValue.TWO],
				[CardColor.DIAMONDS, CardValue.TEN],
				[CardColor.SPADES, CardValue.THREE],
				[CardColor.SPADES, CardValue.ACE],
				[CardColor.DIAMONDS, CardValue.SEVEN],
				[CardColor.SPADES, CardValue.QUEEN],
				[CardColor.DIAMONDS, CardValue.EIGHT],
			];
			const flush = HandValidator.hasFlush(cards);
			expect(flush).toBeUndefined();
		});

	});

});
