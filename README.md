
# Expense Tracker CLI

Simple command-line tool to record and view expenses.

## Features
- Add, list, delete expenses
- Quick monthly/yearly summaries
- Human-friendly dates and amounts

## Install
Install the CLI however your project requires (example: copy binary or npm/pip install).

## Usage

Show help:
```
$ expense-tracker --help
```

Add an expense:
```
$ expense-tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 1)
```

List expenses (default: today):
```
$ expense-tracker list
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10
```

Delete an expense by ID:
```
$ expense-tracker delete --id 2
# Expense deleted successfully
```

Summary of totals:
```
$ expense-tracker summary
# Total expenses: $30
```

Monthly summary:
```
$ expense-tracker summary --month 8
# Total expenses for August: $20
```

## Examples
Add two expenses and get a summary:
```
$ expense-tracker add --description "Lunch" --amount 20
$ expense-tracker add --description "Dinner" --amount 10
$ expense-tracker summary
# Total expenses: $30
```
](https://roadmap.sh/projects/expense-tracker)
