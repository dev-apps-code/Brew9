
import members from '../WebserviceModel/members'
import point_statments from '../WebserviceModel/point_statements'
import vouchers from '../WebserviceModel/vouchers'
import products from '../WebserviceModel/products'
import memberships from '../WebserviceModel/memberships.js'

export function registerModels(app) {
  app.model(members)
  app.model(point_statments)
  app.model(vouchers)
  app.model(products)
  app.model(memberships)
}
