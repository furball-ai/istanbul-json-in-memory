# @furball/instanbul-json-in-memory

A custom reporter for Istanbul which outputs code coverage as an in-memory JSON object.

To use with Instanbul, enter `@furball/istanbul-json-in-memory` as the reporter name.

## API

`getReport()` returns the JSON coverage report. Note that this must be called _after_ you run Istanbul.
