import * as process from 'process'
import {runFormatted} from '../src/format'

test('test run without process spawn', async () => {
  process.env['INPUT_KUBESEC_INPUT_FILE'] = './__tests__/test.yaml'
  process.env['INPUT_KUBESEC_URL'] = 'http://localhost:8080/scan'
  process.env['INPUT_MINIMUM_SCORE'] = '5'
  await runFormatted()
})
