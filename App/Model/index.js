import members from '../WebserviceModel/members';
import point_statments from '../WebserviceModel/point_statements';
import vouchers from '../WebserviceModel/vouchers';
import products from '../WebserviceModel/products';
import memberships from '../WebserviceModel/memberships';
import companies from '../WebserviceModel/companies';
import point_products from '../WebserviceModel/point_products';
import shops from '../WebserviceModel/shops';
import orders from '../WebserviceModel/orders';
import payments from '../WebserviceModel/payments';
import top_up from '../WebserviceModel/top_up';
import credit_statements from '../WebserviceModel/credit_statements';
import missions from '../WebserviceModel/missions';

import config from './config';

export function registerModels(app) {
  app.model(members);
  app.model(config);
  app.model(point_statments);
  app.model(vouchers);
  app.model(products);
  app.model(memberships);
  app.model(companies);
  app.model(point_products);
  app.model(shops);
  app.model(orders);
  app.model(payments);
  app.model(top_up);
  app.model(credit_statements);
  app.model(missions);
}
