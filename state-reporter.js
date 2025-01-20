import fs from "fs";
import path from "path";

class CustomReporter {
  constructor() {
    this.resultsFile = path.resolve("./state.json"); // Path to store test data
  }

  // Called when the entire test run starts
  onBegin() {
    console.log("Starting test run...");
    this.testResults = [];
  }

  // Called after each test
  onTestEnd(test, result) {
    // Use titlePath() to get the hierarchy of describe and test titles
    const titlePath = test.titlePath().filter((title) => title !== ""); // Remove empty titles

    // Extract browser name, file path, and test path from titlePath
    const project = titlePath[0]; // 'chromium'
    const filePath = titlePath[1]; // 'emp/employee-service/employee-service.spec.ts'
    const testPath = titlePath.slice(2).join(" › "); // Combine the rest with ' › '
    const line = test.location.line;
    const column = test.location.column;

    // Extract the top-level describe block's text (if available)
    const listTest = `[${project}] › ${filePath}:${line}:${column} › ${testPath}`;

    this.testResults.push({
      name: listTest, // Full test path
      duration: result.duration, // Test duration in ms
    });
  }

  // Called when the entire test run ends
  async onEnd() {
    let existingData = {};
    if (fs.existsSync(this.resultsFile)) {
      existingData = JSON.parse(fs.readFileSync(this.resultsFile, "utf-8"));
    }

    // Merge or update the existing results
    this.testResults.forEach(({ name, duration }) => {
      existingData[name] = duration;
    });

    fs.writeFileSync(this.resultsFile, JSON.stringify(existingData, null, 2));
    console.log("Test results saved to:", this.resultsFile);
  }
}

module.exports = CustomReporter;
