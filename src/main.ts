import * as core from '@actions/core'
import * as fs from 'fs'
import {scan} from './kubesec'

async function run(): Promise<void> {
  try {
    const file: string = core.getInput('kubesec_input_file')
    const url: string = core.getInput('kubesec_url')
    core.debug(`Reading ${file} ...`)
    const input = fs.readFileSync(file).toString()
    core.info(input)
    scan(input, url)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
