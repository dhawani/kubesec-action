import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_KUBESEC_INPUT_FILE'] = './__tests__/test.yaml'
  process.env['INPUT_KUBESEC_URL'] = 'http://localhost:8080/scan'
  process.env['INPUT_MINIMUM_SCORE'] = '5'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
