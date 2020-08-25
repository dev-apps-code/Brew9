export const getResponseMsg = ({ props, shopId, key, defaultText }) => {
  const { shopResponses, responses } = props;

  const shopMessages = shopResponses.get(shopId) || new Map();

  return shopMessages.get(key) || responses.get(key) || defaultText;
};
