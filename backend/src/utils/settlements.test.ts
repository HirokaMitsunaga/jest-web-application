import { Expense, Settlement } from "../type";
import { calculateSettlements } from "./settlements";

describe("calculateSettlements", () => {
  it("精算リストが算出される", () => {
    const expense: Expense[] = [
      {
        groupName: "group1",
        expenseName: "支出１",
        payer: "一郎",
        amount: 300,
      },
      {
        groupName: "group1",
        expenseName: "支出2",
        payer: "次郎",
        amount: 100,
      },
    ];
    const groupMembers = ["一郎", "次郎", "三郎"];
    const expectedSettlements: Settlement[] = [
      { from: "次郎", to: "一郎", amount: 34 },
      { from: "三郎", to: "一郎", amount: 133 },
    ];
    const result = calculateSettlements(expense, groupMembers);
    expect(result).toEqual(expectedSettlements);
  });
});
