import { expect } from "chai";
import { sum, sub, mult, div } from "../src/main.js";

describe("Calc", () => {
    describe("Smoke tests", () => {
    })

    describe("Sum", () => {
        it("should return 4 when `sum(2, 2)`", () => {
            expect(sum(2, 2)).to.be.equal(4)
        })
    })

    describe("Sub", () => {
        it("should return 4 when `sub(6, 2)`", () => {
            expect(sub(6, 2)).to.be.equal(4)
        })
    })

    describe("Mult", () => {
        it("should return 30 when `mult(6, 5)`", () => {
            expect(mult(6, 5)).to.be.equal(30)
        })
    })

    describe("Div", () => {
        it("should return 5 when `div(40, 8)`", () => {
            expect(div(40, 8)).to.be.equal(5)
        })

        it('should return "division by zero is not possible" when divide by 0', () => {
            expect(div(40, 0)).to.be.equal("division by 0 is not possible")
        })
    })
})