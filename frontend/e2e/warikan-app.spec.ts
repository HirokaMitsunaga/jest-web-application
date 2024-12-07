import { test, expect } from "@playwright/test";
import axios from "axios";

test.describe("割り勘アプリ", () => {
  test.beforeEach(async ({ page }) => {
    //バックエンドのinitのエンドポイントへアクセス
    await axios.get("http://localhost:3000/init");
    //pageの遷移を行うためにpalywrightのpageオブジェクトを引数に置いておく
    await page.goto("http://localhost:3001");
  });
});
