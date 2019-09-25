
import members from '../WebserviceModel/members'
import point_statments from '../WebserviceModel/point_statements'
import vouchers from '../WebserviceModel/vouchers'
import products from '../WebserviceModel/products'
import memberships from '../WebserviceModel/memberships'
import companies from '../WebserviceModel/companies'
import point_products from '../WebserviceModel/point_products'
import shops from '../WebserviceModel/shops'

export function registerModels(app) {
  app.model(members)
  app.model(point_statments)
  app.model(vouchers)
  app.model(products)
  app.model(memberships)
  app.model(companies)
  app.model(point_products)
  app.model(shops)
}
