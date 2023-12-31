import type { Version } from "@/configs/types/database";
import { DB } from "../configs";
import { VersionTable } from "../tables/version.table";
import { BaseRepo } from "./base.repo";

export class VersionRepo extends BaseRepo {
  public Table: VersionTable = new VersionTable();

  public async getVersion(): Promise<Version | undefined> {
    const currentVersion = await this.getFirst<Version>();
    return currentVersion;
  }

  public async updateVersion(version: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${this.Table.tableName} SET ${this.Table.columns.version.name} = ?`;
      const statement = DB.prepare(sql, [version]);
      statement.run((error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  public async insertVersion(version: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${this.Table.tableName} (${this.Table.columns.version.name}) VALUES (?)`;
      const statement = DB.prepare(sql, [version]);
      statement.run((error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
}
