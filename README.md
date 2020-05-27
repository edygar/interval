# Shell interval helper

Quick deno helper to call given command each given time.

## Installation:

```sh
deno install -f --allow-run -n interval https://raw.githubusercontent.com/edygar/interval/master/mod.ts
```

## Usage

First argument is the amount of time in seconds or specified unit (milliseconds, seconds, minutes, and day available)
and the rest is the command that's going to be run

```sh
interval 10 cmd-to-execute --arg1 arg2 …
interval 10s cmd-to-execute --arg1 arg2 …
interval 2m cmd-to-execute --arg1 arg2 …
```
