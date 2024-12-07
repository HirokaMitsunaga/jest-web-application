import request from "supertest";
import express from "express";
import fs from "fs";
import { createApp } from "../src/app";
import { Expense, Group } from "../src/type";

const GROUP_FILE_PATH = "../data/integration/groups.json";
const EXPENCE_FILE_PATH = "../data/integration/expenses.json";

const testGropus: Group[] = [
  {
    name: "group1",
    members: ["一郎", "次郎", "三郎"],
  },
  {
    name: "group2",
    members: ["太郎", "花子"],
  },
];

const testExoenses: Expense[] = [
  {
    groupName: "group1",
    expenseName: "ランチ",
    payer: "一郎",
    amount: 1000,
  },
];

describe("Integration test", () => {
  let app: express.Express;
  beforeEach(() => {
    fs.writeFileSync(GROUP_FILE_PATH, JSON.stringify(testGropus));
    fs.writeFileSync(EXPENCE_FILE_PATH, JSON.stringify(testExoenses));

    app = createApp(GROUP_FILE_PATH, EXPENCE_FILE_PATH);
  });

  describe("GET /groups", () => {
    it("全てのグループが取得できる", async () => {
      const response = await request(app).get("/groups");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(testGropus);
    });
  });
  describe("POST /groups", () => {
    it("グループが追加できる", async () => {
      const group: Group = { name: "group3", members: ["Ken", "Bob"] };
      const response = await request(app).post("/groups").send(group);
      expect(response.status).toBe(200);
      expect(response.text).toBe("グループの作成が成功しました");
    });
  });
});
