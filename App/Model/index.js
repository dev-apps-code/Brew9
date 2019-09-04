
import members from '../WebserviceModel/members'
import point_statments from '../WebserviceModel/point_statements'

export function registerModels(app) {
  app.model(members)
  app.model(point_statments)
}
