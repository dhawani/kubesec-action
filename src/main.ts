import * as core from '@actions/core'
import * as fs from 'fs'
import {scan} from './kubesec'

async function run(): Promise<void> {
  try {
    const file: string = core.getInput('kubesec_input_file')
    const url: string = core.getInput('kubesec_url')
    const minimumScore: number = parseInt(core.getInput('minimum_score'))
    core.info(`Reading ${file} ...`)
    const input = fs.readFileSync(file).toString()
    core.info(input)
    const scanResults = await scan(input, url)
    let failed = false
    for (const scanResult of scanResults) {
      if (scanResult.score < minimumScore) {
        failed = true
      }
      core.info(`::Object::${scanResult.object}`)
      core.info(`::Result::${scanResult.message}`)
      core.info(`::Score ::${scanResult.score}`)
      if (scanResult.scoring && scanResult.scoring.advice && scanResult.scoring.advice.length > 0)
        for (const advice of scanResult.scoring.advice) {
          core.info(`::::Advice for ::${advice.selector}`)
          core.info(`::::::${advice.reason}`)
        }
    }
    if (failed) core.setFailed(`Score was higher than ${minimumScore}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
