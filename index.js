const { ReportBase } = require("istanbul-lib-report");

/**
 * A custom Istanbul reporter which emits the code coverage summary as an in-memory JSON structure.
 * This requires usage of the singleton pattern, as we need to be able to access the JSON object from our own modules.
 * To use with instanbul, enter the package name '@furball/istanbul-json-in-memory' as the reporter name.
 */
class JsonInMemoryReport extends ReportBase {
  constructor(_opts) {
    if (!JsonInMemoryReport.instance) {
      super();
      this.reportJSON = {};
      JsonInMemoryReport.instance = this
    }
    return JsonInMemoryReport.instance;
  }

  onStart(root, context) {
    this.reportJSON = {};
  }

  writeSummary(filePath, sc) {
    this.reportJSON[JSON.stringify(filePath)] = JSON.stringify(sc);
  }

  onSummary(node) {
    if (!node.isRoot()) {
      return;
    }
    this.writeSummary("total", node.getCoverageSummary());
  }

  onDetail(node) {
    this.writeSummary(node.getFileCoverage().path, node.getCoverageSummary());
  }

  getReport() {
    return this.reportJSON
  }
}

// Make use of singleton pattern
const instance = new JsonInMemoryReport();

module.exports = JsonInMemoryReport