import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { RouteHandler } from '@ioc:Adonis/Core/Route'

export default class HealthController {
  public index: RouteHandler = async ({ response }) => {
    const report = await HealthCheck.getReport()
    return report.healthy ? response.ok(report) : response.badRequest(report)
  }
}
