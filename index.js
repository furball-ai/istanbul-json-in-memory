const { ReportBase } = require("istanbul-lib-report");

/**
 * A custom Istanbul reporter which emits the code coverage summary as an in-memory JSON structure.
 * This is necessary since all existing Istanbul reporters write metrics to a file, which we don't need here.
 */
class JsonInMemoryReport extends ReportBase {
  constructor(_opts) {
    if (!JsonInMemoryReport.instance) {
      super();
      this.reportJSON = {};
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
    // this.writeSummary(node.getFileCoverage().path, node.getCoverageSummary());
  }

  onEnd() {}

  getReport() {
    return this.reportJSON
  }
}

const instance = new JsonInMemoryReport();
Object.freeze(instance)

module.exports = {
  default: JsonInMemoryReport
}