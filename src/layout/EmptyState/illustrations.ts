// Asset imports for official Figma Empty State illustrations (Component Set 5249:482)
import searchResultsColor from './illustrations/search-results-color.svg';
import searchResultsMono from './illustrations/search-results-mono.svg';
import notificationsColor from './illustrations/notifications-color.svg';
import notificationsMono from './illustrations/notifications-mono.svg';
import tasksColor from './illustrations/tasks-color.svg';
import tasksMono from './illustrations/tasks-mono.svg';
import templatesColor from './illustrations/templates-color.svg';
import templatesMono from './illustrations/templates-mono.svg';
import dashboardColor from './illustrations/dashboard-color.svg';
import dashboardMono from './illustrations/dashboard-mono.svg';
import fileManagerColor from './illustrations/file-manager-color.svg';
import fileManagerMono from './illustrations/file-manager-mono.svg';
import calendarColor from './illustrations/calendar-color.svg';
import calendarMono from './illustrations/calendar-mono.svg';
import formsColor from './illustrations/forms-color.svg';
import formsMono from './illustrations/forms-mono.svg';
import inboxColor from './illustrations/inbox-color.svg';
import inboxMono from './illustrations/inbox-mono.svg';
import invoiceColor from './illustrations/invoice-color.svg';
import invoiceMono from './illustrations/invoice-mono.svg';
import teamColor from './illustrations/team-color.svg';
import teamMono from './illustrations/team-mono.svg';
import shoppingCartColor from './illustrations/shopping-cart-color.svg';
import shoppingCartMono from './illustrations/shopping-cart-mono.svg';
import mediaColor from './illustrations/media-color.svg';
import mediaMono from './illustrations/media-mono.svg';
import subscriptionsColor from './illustrations/subscriptions-color.svg';
import subscriptionsMono from './illustrations/subscriptions-mono.svg';
import surveyColor from './illustrations/survey-color.svg';
import surveyMono from './illustrations/survey-mono.svg';
import favoritesColor from './illustrations/favorites-color.svg';
import favoritesMono from './illustrations/favorites-mono.svg';
import contactsColor from './illustrations/contacts-color.svg';
import contactsMono from './illustrations/contacts-mono.svg';
import inventoryColor from './illustrations/inventory-color.svg';
import inventoryMono from './illustrations/inventory-mono.svg';
import chatColor from './illustrations/chat-color.svg';
import chatMono from './illustrations/chat-mono.svg';

export interface EmptyStateIllustrationPair {
  color: string;
  mono: string;
}

export const EMPTY_STATE_ILLUSTRATIONS: Record<string, EmptyStateIllustrationPair> = {
  'search-results': { color: searchResultsColor, mono: searchResultsMono },
  'notifications': { color: notificationsColor, mono: notificationsMono },
  'tasks': { color: tasksColor, mono: tasksMono },
  'templates': { color: templatesColor, mono: templatesMono },
  'dashboard': { color: dashboardColor, mono: dashboardMono },
  'data': { color: dashboardColor, mono: dashboardMono }, // backwards compatibility alias
  'file-manager': { color: fileManagerColor, mono: fileManagerMono },
  'calendar': { color: calendarColor, mono: calendarMono },
  'forms': { color: formsColor, mono: formsMono },
  'inbox': { color: inboxColor, mono: inboxMono },
  'invoice': { color: invoiceColor, mono: invoiceMono },
  'team': { color: teamColor, mono: teamMono },
  'shopping-cart': { color: shoppingCartColor, mono: shoppingCartMono },
  'media': { color: mediaColor, mono: mediaMono },
  'subscriptions': { color: subscriptionsColor, mono: subscriptionsMono },
  'survey': { color: surveyColor, mono: surveyMono },
  'favorites': { color: favoritesColor, mono: favoritesMono },
  'contacts': { color: contactsColor, mono: contactsMono },
  'inventory': { color: inventoryColor, mono: inventoryMono },
  'chat': { color: chatColor, mono: chatMono },
};
