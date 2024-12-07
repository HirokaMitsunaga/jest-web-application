import { ExpenseService } from "./expenseService";
import { GroupService } from "./groupService";
import { ExpenseRepository } from "../repositories/expenseRepository";
import { Expense, Group } from "../type";

describe("ExpenseService", () => {
  //Partialを使うことでクラスを全てモック化するのではなく、一部のメソッドのみをモックかすることができる
  let mockGroupService: Partial<GroupService>;
  let mockExpenseRepository: Partial<ExpenseRepository>;
  let expenseService: ExpenseService;

  const group: Group = { name: "group1", members: ["一郎", "次郎"] };
  const expense: Expense = {
    groupName: "group1",
    expenseName: "ランチ",
    amount: 2000,
    payer: "一郎",
  };

  beforeEach(() => {
    mockGroupService = {
      getGroupByName: jest.fn(),
    };
    mockExpenseRepository = {
      loadExpenses: jest.fn(),
      saveExpense: jest.fn(),
    };
    expenseService = new ExpenseService(
      //asをつけて、mockの型をそれぞれ定義する
      //これをやらないと型が違うためエラーになる
      mockExpenseRepository as ExpenseRepository,
      mockGroupService as GroupService
    );
  });

  describe("addExpense", () => {
    it("支出が登録される", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValue(group);
      expenseService.addExpense(expense);
      expect(mockExpenseRepository.saveExpense).toHaveBeenCalledWith(expense);
    });

    it("グループが存在しない場合は、エラーが発生する", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValue(null);
      expect(() => {
        expenseService.addExpense(expense);
      }).toThrowError();
    });

    it("支払い者がグループに存在しない場合は、エラーが発生する", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValue(group);
      //存在しない支払い者をグループに追加
      const nonMemberExpense: Expense = { ...expense, payer: "太郎" };
      expect(() => {
        expenseService.addExpense(nonMemberExpense);
      }).toThrowError();
    });
  });
});
