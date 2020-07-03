import {scan} from '../src/kubesec'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'


test('scan demo file', async () => {
  const demoFile = `apiVersion: v1
kind: Pod
metadata:
  name: kubesec-demo
spec:
  containers:
    - name: kubesec-demo
      image: gcr.io/google-samples/node-hello:1.0
      securityContext:
        readOnlyRootFilesystem: true`
  let scanResults = await scan(demoFile);
  console.log(scanResults)
  //expect(delta).toBeGreaterThan(450)
})