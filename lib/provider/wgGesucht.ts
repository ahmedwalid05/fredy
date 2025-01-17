import utils from '../utils.js';
import { Listing, ProviderConfig, ProviderJobInformation } from './provider.js';
let appliedBlackList = [];
function normalize(o: Listing): Listing {
  return o;
}
function applyBlacklist(o: Listing): boolean {
  const titleNotBlacklisted = !utils.isOneOf(o.title, appliedBlackList);
  const descNotBlacklisted = !utils.isOneOf(o.description, appliedBlackList);
  return o.id != null && titleNotBlacklisted && descNotBlacklisted;
}
const config: ProviderConfig = {
  url: null,
  crawlContainer: '#main_column .wgg_card',
  sortByDateParam: 'sort_column=0&sort_order=0',
  crawlFields: {
    id: '@data-id',
    description: '.row .noprint .col-xs-11 |removeNewline |trim',
    price: '.middle .col-xs-3 |removeNewline |trim',
    size: '.middle .text-right |removeNewline |trim',
    title: '.truncate_title a |removeNewline |trim',
    link: '.truncate_title a@href',
  },
  normalize: normalize,
  filter: applyBlacklist,
};
export const init = (sourceConfig: ProviderJobInformation, blacklist) => {
  config.url = sourceConfig.url;
  appliedBlackList = blacklist || [];
};
export const metaInformation = {
  name: 'Wg gesucht',
  baseUrl: 'https://www.wg-gesucht.de/',
  id: 'wgGesucht',
};
export { config };
