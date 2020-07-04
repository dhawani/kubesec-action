import * as core from '@actions/core'
import * as fs from 'fs'
import {scan} from './kubesec'
import {table, getBorderCharacters, TableUserConfig} from 'table'
import chalk from 'chalk'

const tablePrintConfig: TableUserConfig = {
  border: getBorderCharacters(`norc`),
  drawHorizontalLine: (index, size) => {
    return index === 0 || index === 1 || index === size
  }
}

export async function runFormatted(): Promise<void> {
  try {
    const file: string = core.getInput('kubesec_input_file')
    const url: string = core.getInput('kubesec_url')
    const minimumScore: number = parseInt(core.getInput('minimum_score'))
    core.info(`Reading ${file} ...`)
    const input = fs.readFileSync(file).toString()
    const scanResults = await scan(input, url)
    let failed = false
    for (const scanResult of scanResults) {
      let color = 'green'
      if (scanResult.score > minimumScore) {
        failed = true
        color = 'red'
      }
      const result = []
      result.push(['Object', scanResult.object])
      result.push(['Result', scanResult.message])
      result.push(['Score', scanResult.score])
      core.info(chalk.keyword(color)(table(result, tablePrintConfig)))
      if (scanResult.scoring && scanResult.scoring.advise && scanResult.scoring.advise.length > 0) {
        const data = [['Selector', 'Advice']]
        for (const advice of scanResult.scoring.advise) {
          data.push([advice.selector, advice.reason])
        }
        core.info(table(data, tablePrintConfig))
      }
    }
    if (failed) {
      core.setFailed(`Score was higher than ${minimumScore}`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}
