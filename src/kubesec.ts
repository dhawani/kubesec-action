import * as restm from 'typed-rest-client/HttpClient'

interface ScanResult {
  object: string
  valid: boolean
  message: string
  score: number
  scoring: ScanScoring
}

interface ScanAdvice {
  selector: string
  reason: string
}

interface ScanScoring {
  advice: ScanAdvice[]
}
export async function scan(file: string, url: string = 'http://localhost:8080/scan'): Promise<ScanResult[]> {
  const client: restm.HttpClient = new restm.HttpClient('Github Kubescan Action')
  const response = await client.post(url, file)
  if (response.message.statusCode === 200) {
    const message = await response.readBody()
    return JSON.parse(message)
  } else {
    throw new Error('Fetch')
  }
}
