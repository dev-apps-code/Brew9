export const getResponseMsg = ({props, shopId, key, defaultText}) => {
  const {shopResponses, responses} = props;

  const messages = shopResponses.get(shopId) || new Map();

  return messages.get(key) || responses.get(key) || defaultText;
};

export default function ({shopResponses, responses}, shopId, key, text = '') {
  const messages = shopResponses.get(shopId) || new Map();
  return messages.get(key) || responses.get(key) || text;
}
