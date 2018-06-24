# Installation

`npm install -g manage-t1`

or

`yarn global add manage-t1`

# Usage

See:

`manage-t1 --help`

## Configuration

Uses `dotenv`, so either via a `.env` file or environment variables:

```bash
T1_HOST=127.0.0.1
T1_USERNAME=admin # Defaults to admin
T1_PASSWORD=admin
T1_PORT=80 # Defaults to 80
T1_PROTO=http # Defaults to http
```

This config _does not_ apply to the `schedule` command.

## Generic API Usage

```bash
$ manage-t1 get getAutoTuneStatus
success:   true
isRunning: true
isTuning:  false
mode:      performance
```

## Scheduler

See: https://github.com/mattbailey/manage-t1/blob/master/automate.sample.json

Will start a scheduler process to manage timing of API functions:

`manage-t1 schedule automate.json`
