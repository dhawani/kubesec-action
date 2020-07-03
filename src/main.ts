import * as core from '@actions/core'
import * as fs from "fs";

async function run(): Promise<void> {
  try {
    const file: string = core.getInput('kubesec_input_file')
    core.debug(`Reading ${file} ...`)
    const input = fs.readFileSync(file).toString()
    core.debug(input)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
