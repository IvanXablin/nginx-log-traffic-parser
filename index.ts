import fs from "fs/promises"

export type TrafficAccountingID = {
  pid: number
  from: number
  to: number
  accounting_id: string
  requests: number
  bytes_in: number
  bytes_out: number
}

const regexNumber: RegExp = /[^\d]/g

const parser = async (path: string): Promise<TrafficAccountingID[]> => {
  const arrayOfTrafficAccountingID: TrafficAccountingID[] = []

  const logs: string = await fs.readFile(path, { encoding: "utf8" })
  const arrayOfLogs: string[] = logs.split('\n')

  const arrayOfFilteredLogs = arrayOfLogs.filter(
    (item: string) => !item.includes('start http') && !item.includes('stop http')
  )

  for (let line of arrayOfFilteredLogs) {
    const traffic: TrafficAccountingID = {
      pid: 0,
      from: 0,
      to: 0,
      accounting_id: '',
      requests: 0,
      bytes_in: 0,
      bytes_out: 0
    }

    if (line === '') {
      continue
    }

    for (let item of line.split('|')) {
      if (item.includes('pid')) {
        const pid = item.split(' ').pop()
        if (pid) {
          traffic.pid = parseInt(pid.replace(regexNumber, ''))
        }
      }
      if (item.includes('from')) {
        traffic.from = parseInt(item.replace(regexNumber, ''))
      }
      if (item.includes('to')) {
        traffic.to = parseInt(item.replace(regexNumber, ''))
      }
      if (item.includes('accounting_id')) {
        traffic.accounting_id = item.slice(item.indexOf(':') + 1, item.length)
      }
      if (item.includes('requests')) {
        traffic.requests = parseInt(item.replace(regexNumber, ''))
      }
      if (item.includes('bytes_in')) {
        traffic.bytes_in = parseInt(item.replace(regexNumber, ''))
      }
      if (item.includes('bytes_out')) {
        traffic.bytes_out = parseInt(item.replace(regexNumber, ''))
      }
      
      else {
        continue
      }
    }
    arrayOfTrafficAccountingID.push(traffic)
  }
  return arrayOfTrafficAccountingID
} 

export default parser