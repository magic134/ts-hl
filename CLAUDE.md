# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a Node.js/TypeScript project that wraps a MySQL database for a game (幻灵). It maps each SQL table to a TypeScript model class plus a data class, and provides higher-level service classes for multi-table operations.

## Common commands

- Build the project: `npm run build` (compiles `src/` to `dist/` via `tsc -b`)
- Watch mode: `npm run watch`
- Run the entry point with ts-node: `npm run tsnode` (runs `src/ExcelToJson.ts`, not `src/index.ts`)
- Run `src/index.ts` directly: `npx ts-node src/index.ts`

There are no tests, lint scripts, or formatting scripts in this repo.

## High-level architecture

### Database layer

- `src/dbClient/DbClient.ts` is the only database client. It creates a raw `mysql` connection, exposes `connect()`, `close()`, generic CRUD helpers (`find`, `create`, `update`, `delete`), and a raw `query(sql, params)` method for custom SQL.
- The connection config is hardcoded in `DbClient.ts`. It uses GBK charset with `flags: ['NO_CHARSET_CONVERSION']` to handle Chinese text correctly.
- **Note:** `README.md` and `README_COMPLETE.md` say the client is at `src/db/DbClient.ts`, but the actual file is `src/dbClient/DbClient.ts`.

### Table models

- `src/db/*.ts` contains one file per SQL table. Each file exports two classes:
  - `XxxData`: a data class with public fields and game-default values (often including Chinese defaults).
  - `Xxx`: a model class that takes a `DbClient` and implements `findXxx`, `createXxx`, `updateXxx`, `deleteXxx`, plus `connect()`/`close()` passthroughs.
- `src/db/index.ts` is a barrel file that re-exports every model and data class.
- `createXxx` methods validate required fields before inserting. `updateXxx` and `deleteXxx` throw if the condition object is empty.
- Table schemas live in `sql/`.

### Services

- `src/service/*.ts` holds higher-level business operations that compose models or use raw SQL. Examples:
  - `YxRegister.ts`: creates an `account`, a `yx_user`, and a `yx_pet`, then updates the user's active pet.
  - `YxRegister2.ts`: creates three `account` rows and stores their IDs in the `qq` table.
  - `YxGetUsers.ts` / `YxGetItems.ts`: perform cross-table queries using `DbClient.query`.

### Entry point

- `src/index.ts` is a scratch/demo file with several test functions. Most are commented out; only `testYxUserOperate()` runs by default. Uncomment other blocks to run them.

## Important conventions

- Always pass the same `DbClient` instance to related models within a transaction/logical unit; services usually create one `DbClient`, `connect()`, do work, then `close()` in a `finally` block.
- For joins, aggregations, or any query that doesn't fit the generic CRUD helpers, use `db.query(sql, params)` directly.
- Fields in `XxxData` classes have default values. When creating records, instantiate the data class and override only the fields you need.
- The project uses CommonJS output (`tsconfig.json`: `"module": "CommonJS"`) and targets ES2017.
