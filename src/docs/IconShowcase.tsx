import React, { useState } from 'react';
import { Icon } from '../foundations/icons';
import { Badge } from '../elements/Badge';
import { Toggle } from '../elements/Toggle';
import { Input } from '../elements/Input';

interface IconData {
  name: string;
  category: string;
  tags: string[];
}

const ALL_ICONS: IconData[] = [
  // AI & Extended Reality
  { name: '3d', category: 'AI & Extended Reality', tags: ['3d', 'cube', 'box', 'three dimensional'] },
  { name: 'AI-stars', category: 'AI & Extended Reality', tags: ['ai', 'stars', 'sparkle', 'magic'] },
  { name: 'feather-AI', category: 'AI & Extended Reality', tags: ['ai', 'feather', 'write'] },
  { name: 'music-AI', category: 'AI & Extended Reality', tags: ['ai', 'music', 'sound'] },
  { name: 'VR-goggles', category: 'AI & Extended Reality', tags: ['vr', 'goggles', 'virtual reality', 'headset'] },
  { name: 'gear-AI', category: 'AI & Extended Reality', tags: ['ai', 'gear', 'settings'] },
  { name: 'send-AI', category: 'AI & Extended Reality', tags: ['ai', 'send', 'message'] },
  { name: 'AR', category: 'AI & Extended Reality', tags: ['ar', 'augmented reality', 'camera'] },
  { name: 'magic-wand', category: 'AI & Extended Reality', tags: ['magic', 'wand', 'sparkle', 'ai'] },
  // Buildings & Maps
  { name: 'building-1', category: 'Buildings', tags: ['building', 'office', 'architecture'] },
  { name: 'building-2', category: 'Buildings', tags: ['building', 'office', 'architecture'] },
  { name: 'building-3', category: 'Buildings', tags: ['building', 'office', 'architecture'] },
  { name: 'building-4', category: 'Buildings', tags: ['building', 'office', 'architecture'] },
  { name: 'building-5', category: 'Buildings', tags: ['building', 'office', 'architecture'] },
  { name: 'building-6', category: 'Buildings', tags: ['building', 'office', 'architecture'] },
  { name: 'bank', category: 'Buildings', tags: ['bank', 'finance', 'institution'] },
  // Communication
  { name: 'call', category: 'Communication', tags: ['call', 'phone', 'telephone'] },
  { name: 'call-cross', category: 'Communication', tags: ['call', 'end', 'decline', 'missed'] },
  { name: 'call-outgoing', category: 'Communication', tags: ['call', 'outgoing', 'phone'] },
  { name: 'call-ringing', category: 'Communication', tags: ['call', 'ringing', 'incoming'] },
  { name: 'call-add', category: 'Communication', tags: ['call', 'add', 'plus'] },
  { name: 'call-incoming', category: 'Communication', tags: ['call', 'incoming', 'receive'] },
  { name: 'call-remove', category: 'Communication', tags: ['call', 'remove', 'block'] },
  // Crypto
  { name: 'BTC', category: 'Crypto', tags: ['bitcoin', 'btc', 'crypto', 'currency'] },
  { name: 'NFT', category: 'Crypto', tags: ['nft', 'token', 'crypto', 'digital'] },
  { name: 'NFT-profile', category: 'Crypto', tags: ['nft', 'profile', 'avatar'] },
  { name: 'NFT-remove', category: 'Crypto', tags: ['nft', 'remove', 'delete'] },
  { name: 'ETH', category: 'Crypto', tags: ['ethereum', 'eth', 'crypto', 'currency'] },
  { name: 'NFT-add', category: 'Crypto', tags: ['nft', 'add', 'create'] },
  // Charts & Data
  { name: 'bar-chart-h', category: 'Charts', tags: ['chart', 'bar', 'horizontal', 'data', 'analytics'] },
  { name: 'bar-chart-v', category: 'Charts', tags: ['chart', 'bar', 'vertical', 'data', 'analytics'] },
  { name: 'candles-h', category: 'Charts', tags: ['candle', 'chart', 'trading', 'horizontal'] },
  { name: 'candles-v', category: 'Charts', tags: ['candle', 'chart', 'trading', 'vertical'] },
  { name: 'chart', category: 'Charts', tags: ['chart', 'graph', 'analytics', 'data'] },
  { name: 'chart-down', category: 'Charts', tags: ['chart', 'down', 'decrease', 'loss'] },
  { name: 'chart-up', category: 'Charts', tags: ['chart', 'up', 'increase', 'profit'] },
  { name: 'column', category: 'Charts', tags: ['column', 'layout', 'grid'] },
  { name: 'elements', category: 'Charts', tags: ['elements', 'grid', 'layout'] },
  { name: 'grid', category: 'Charts', tags: ['grid', 'layout', 'table'] },
  { name: 'grid-2', category: 'Charts', tags: ['grid', 'layout', 'tiles'] },
  { name: 'pie-chart', category: 'Charts', tags: ['pie', 'chart', 'analytics', 'data'] },
  { name: 'row', category: 'Charts', tags: ['row', 'layout', 'list'] },
  // Devices
  { name: 'airpod', category: 'Devices', tags: ['airpod', 'earphones', 'audio', 'wireless'] },
  { name: 'battery', category: 'Devices', tags: ['battery', 'power', 'charge'] },
  { name: 'battery-charging', category: 'Devices', tags: ['battery', 'charging', 'power'] },
  { name: 'battery-empty', category: 'Devices', tags: ['battery', 'empty', 'low', 'power'] },
  { name: 'bluetooth', category: 'Devices', tags: ['bluetooth', 'wireless', 'connect'] },
  { name: 'devices', category: 'Devices', tags: ['devices', 'gadgets', 'tech'] },
  { name: 'game-pad', category: 'Devices', tags: ['gamepad', 'controller', 'gaming'] },
  { name: 'headset', category: 'Devices', tags: ['headset', 'headphones', 'audio'] },
  { name: 'headphones', category: 'Devices', tags: ['headphones', 'audio', 'music'] },
  { name: 'keyboard', category: 'Devices', tags: ['keyboard', 'type', 'input'] },
  { name: 'laptop', category: 'Devices', tags: ['laptop', 'computer', 'pc'] },
  { name: 'mobile', category: 'Devices', tags: ['mobile', 'phone', 'smartphone'] },
  { name: 'mouse', category: 'Devices', tags: ['mouse', 'cursor', 'pointer'] },
  { name: 'pc', category: 'Devices', tags: ['pc', 'computer', 'desktop'] },
  { name: 'pc-lock', category: 'Devices', tags: ['pc', 'lock', 'security'] },
  { name: 'pc-speaker', category: 'Devices', tags: ['pc', 'speaker', 'audio'] },
  { name: 'pc-user', category: 'Devices', tags: ['pc', 'user', 'profile'] },
  { name: 'printer', category: 'Devices', tags: ['printer', 'print', 'document'] },
  { name: 'processor', category: 'Devices', tags: ['processor', 'cpu', 'chip'] },
  { name: 'power', category: 'Devices', tags: ['power', 'on', 'off', 'button'] },
  { name: 'server', category: 'Devices', tags: ['server', 'database', 'hosting'] },
  { name: 'server-alt', category: 'Devices', tags: ['server', 'database', 'hosting'] },
  { name: 'signal', category: 'Devices', tags: ['signal', 'wifi', 'network'] },
  { name: 'signal-off', category: 'Devices', tags: ['signal', 'off', 'no network'] },
  { name: 'sim', category: 'Devices', tags: ['sim', 'card', 'mobile'] },
  { name: 'speaker', category: 'Devices', tags: ['speaker', 'audio', 'sound'] },
  { name: 'tablet', category: 'Devices', tags: ['tablet', 'ipad', 'device'] },
  { name: 'tv', category: 'Devices', tags: ['tv', 'television', 'screen'] },
  { name: 'wifi', category: 'Devices', tags: ['wifi', 'wireless', 'internet'] },
  { name: 'wristwatch', category: 'Devices', tags: ['watch', 'time', 'wrist'] },
  // Interface
  { name: 'bell', category: 'Interface', tags: ['bell', 'notification', 'alert'] },
  { name: 'bell-slash', category: 'Interface', tags: ['bell', 'mute', 'notification off'] },
  { name: 'bin', category: 'Interface', tags: ['bin', 'trash', 'delete', 'remove'] },
  { name: 'bookmark', category: 'Interface', tags: ['bookmark', 'save', 'tag'] },
  { name: 'bookmark-add', category: 'Interface', tags: ['bookmark', 'add', 'save'] },
  { name: 'bookmarks', category: 'Interface', tags: ['bookmarks', 'saved', 'collection'] },
  { name: 'check', category: 'Interface', tags: ['check', 'tick', 'done', 'complete'] },
  { name: 'checkbox', category: 'Interface', tags: ['checkbox', 'unchecked', 'form'] },
  { name: 'checkbox-checked', category: 'Interface', tags: ['checkbox', 'checked', 'selected'] },
  { name: 'check-circle', category: 'Interface', tags: ['check', 'circle', 'success', 'done'] },
  { name: 'download', category: 'Interface', tags: ['download', 'save', 'arrow down'] },
  { name: 'dots-h', category: 'Interface', tags: ['dots', 'menu', 'more', 'horizontal', 'ellipsis'] },
  { name: 'dots-v', category: 'Interface', tags: ['dots', 'menu', 'more', 'vertical', 'ellipsis'] },
  { name: 'dots-h-circle', category: 'Interface', tags: ['dots', 'circle', 'more', 'horizontal'] },
  { name: 'dots-v-circle', category: 'Interface', tags: ['dots', 'circle', 'more', 'vertical'] },
  { name: 'emoji', category: 'Interface', tags: ['emoji', 'smile', 'face', 'reaction'] },
  { name: 'emoji-add', category: 'Interface', tags: ['emoji', 'add', 'react'] },
  { name: 'feather', category: 'Interface', tags: ['feather', 'write', 'pen'] },
  { name: 'feather-add', category: 'Interface', tags: ['feather', 'add', 'compose'] },
  { name: 'filter', category: 'Interface', tags: ['filter', 'sort', 'funnel'] },
  { name: 'filter-alt', category: 'Interface', tags: ['filter', 'sort', 'funnel', 'alt'] },
  { name: 'heart', category: 'Interface', tags: ['heart', 'like', 'love', 'favorite'] },
  { name: 'home', category: 'Interface', tags: ['home', 'house', 'dashboard'] },
  { name: 'home-alt', category: 'Interface', tags: ['home', 'house', 'dashboard', 'alt'] },
  { name: 'flag', category: 'Interface', tags: ['flag', 'report', 'mark'] },
  { name: 'info-circle', category: 'Interface', tags: ['info', 'circle', 'information', 'help'] },
  { name: 'info-triangle', category: 'Interface', tags: ['info', 'warning', 'triangle', 'alert'] },
  { name: 'info-hexagon', category: 'Interface', tags: ['info', 'hexagon', 'information'] },
  { name: 'lifebuoy', category: 'Interface', tags: ['lifebuoy', 'help', 'support', 'rescue'] },
  { name: 'bulb', category: 'Interface', tags: ['bulb', 'idea', 'light', 'tip'] },
  { name: 'bulb-slash', category: 'Interface', tags: ['bulb', 'slash', 'off', 'no idea'] },
  { name: 'link', category: 'Interface', tags: ['link', 'chain', 'url', 'connect'] },
  { name: 'link-detach', category: 'Interface', tags: ['link', 'detach', 'unlink', 'break'] },
  { name: 'minus', category: 'Interface', tags: ['minus', 'subtract', 'remove'] },
  { name: 'minus-circle', category: 'Interface', tags: ['minus', 'circle', 'remove', 'subtract'] },
  { name: 'paper-clip', category: 'Interface', tags: ['paperclip', 'attach', 'attachment'] },
  { name: 'pin', category: 'Interface', tags: ['pin', 'location', 'mark'] },
  { name: 'pin-alt', category: 'Interface', tags: ['pin', 'alt', 'location'] },
  { name: 'pencil', category: 'Interface', tags: ['pencil', 'edit', 'write'] },
  { name: 'pencil-edit', category: 'Interface', tags: ['pencil', 'edit', 'modify'] },
  { name: 'plus-circle', category: 'Interface', tags: ['plus', 'circle', 'add', 'create'] },
  { name: 'plus', category: 'Interface', tags: ['plus', 'add', 'create', 'new'] },
  { name: 'radio-button', category: 'Interface', tags: ['radio', 'button', 'select', 'option'] },
  { name: 'radio-selected', category: 'Interface', tags: ['radio', 'selected', 'active', 'checked'] },
  { name: 'search', category: 'Interface', tags: ['search', 'find', 'magnify', 'look'] },
  { name: 'send', category: 'Interface', tags: ['send', 'submit', 'paper plane'] },
  { name: 'send-alt', category: 'Interface', tags: ['send', 'submit', 'alt'] },
  { name: 'settings', category: 'Interface', tags: ['settings', 'gear', 'preferences', 'config'] },
  { name: 'settings-2', category: 'Interface', tags: ['settings', 'gear', 'config', 'preferences'] },
  { name: 'settings-3', category: 'Interface', tags: ['settings', 'gear', 'sliders', 'config'] },
  { name: 'share', category: 'Interface', tags: ['share', 'export', 'social'] },
  { name: 'share-alt', category: 'Interface', tags: ['share', 'export', 'alt'] },
  { name: 'sign-in', category: 'Interface', tags: ['sign in', 'login', 'enter', 'access'] },
  { name: 'sign-out', category: 'Interface', tags: ['sign out', 'logout', 'exit'] },
  { name: 'suitcase', category: 'Interface', tags: ['suitcase', 'bag', 'travel', 'work'] },
  { name: 'multiply', category: 'Interface', tags: ['multiply', 'close', 'x', 'times'] },
  { name: 'multiply-circle', category: 'Interface', tags: ['multiply', 'circle', 'close', 'remove'] },
  { name: 'question-circle', category: 'Interface', tags: ['question', 'circle', 'help', 'faq'] },
  { name: 'upload', category: 'Interface', tags: ['upload', 'share', 'arrow up'] },
  { name: 'verified', category: 'Interface', tags: ['verified', 'check', 'badge', 'trusted'] },
  { name: 'zoom-in', category: 'Interface', tags: ['zoom in', 'magnify', 'scale up'] },
  { name: 'zoom-out', category: 'Interface', tags: ['zoom out', 'shrink', 'scale down'] },
  { name: 'store', category: 'Interface', tags: ['store', 'shop', 'market'] },
  // Commerce
  { name: 'bag', category: 'Commerce', tags: ['bag', 'shopping', 'purchase'] },
  { name: 'box-1', category: 'Commerce', tags: ['box', 'package', 'delivery'] },
  { name: 'cart', category: 'Commerce', tags: ['cart', 'shopping', 'basket'] },
  { name: 'cart-add', category: 'Commerce', tags: ['cart', 'add', 'plus'] },
  { name: 'cart-check', category: 'Commerce', tags: ['cart', 'check', 'purchased'] },
  { name: 'cart-cross', category: 'Commerce', tags: ['cart', 'remove', 'cancel'] },
  { name: 'cart-minus', category: 'Commerce', tags: ['cart', 'minus', 'remove'] },
  // Education
  { name: 'book', category: 'Education', tags: ['book', 'read', 'learn'] },
  { name: 'books', category: 'Education', tags: ['books', 'library', 'read'] },
  { name: 'book-open', category: 'Education', tags: ['book', 'open', 'read', 'study'] },
  { name: 'conical-flask', category: 'Education', tags: ['flask', 'science', 'lab', 'chemistry'] },
  { name: 'graduating-cap', category: 'Education', tags: ['graduate', 'cap', 'degree', 'academic'] },
  { name: 'target', category: 'Education', tags: ['target', 'goal', 'aim', 'objective'] },
  // Files & Cloud
  { name: 'clipboard', category: 'Files', tags: ['clipboard', 'copy', 'notes', 'paste'] },
  { name: 'cloud', category: 'Files', tags: ['cloud', 'storage', 'upload'] },
  { name: 'cloud-info', category: 'Files', tags: ['cloud', 'info', 'storage'] },
  { name: 'cloud-upload', category: 'Files', tags: ['cloud', 'upload', 'save'] },
  { name: 'cloud-download', category: 'Files', tags: ['cloud', 'download', 'get'] },
  { name: 'cloud-slash', category: 'Files', tags: ['cloud', 'slash', 'offline', 'no cloud'] },
  { name: 'copy', category: 'Files', tags: ['copy', 'duplicate', 'clipboard'] },
  { name: 'file', category: 'Files', tags: ['file', 'document', 'page'] },
  { name: 'file-alt', category: 'Files', tags: ['file', 'document', 'alt'] },
  { name: 'file-cloud', category: 'Files', tags: ['file', 'cloud', 'storage'] },
  { name: 'file-code', category: 'Files', tags: ['file', 'code', 'script'] },
  { name: 'file-download', category: 'Files', tags: ['file', 'download', 'save'] },
  { name: 'file-upload', category: 'Files', tags: ['file', 'upload', 'share'] },
  { name: 'folder', category: 'Files', tags: ['folder', 'directory', 'files'] },
  { name: 'folder-cloud', category: 'Files', tags: ['folder', 'cloud', 'storage'] },
  { name: 'folder-add', category: 'Files', tags: ['folder', 'add', 'new', 'create'] },
  { name: 'folder-cross', category: 'Files', tags: ['folder', 'cross', 'remove', 'delete'] },
  { name: 'folder-download', category: 'Files', tags: ['folder', 'download', 'save'] },
  { name: 'folder-lock', category: 'Files', tags: ['folder', 'lock', 'secure', 'private'] },
  { name: 'folder-move', category: 'Files', tags: ['folder', 'move', 'transfer'] },
  { name: 'folder-shield', category: 'Files', tags: ['folder', 'shield', 'protect', 'secure'] },
  { name: 'folder-upload', category: 'Files', tags: ['folder', 'upload', 'share'] },
  { name: 'folder-user', category: 'Files', tags: ['folder', 'user', 'profile', 'personal'] },
  { name: 'save', category: 'Files', tags: ['save', 'disk', 'store', 'floppy'] },
  // Finance
  { name: 'card', category: 'Finance', tags: ['card', 'credit', 'payment'] },
  { name: 'card-add', category: 'Finance', tags: ['card', 'add', 'new'] },
  { name: 'card-cross', category: 'Finance', tags: ['card', 'cross', 'declined', 'remove'] },
  { name: 'card-fund', category: 'Finance', tags: ['card', 'fund', 'money'] },
  { name: 'card-in', category: 'Finance', tags: ['card', 'in', 'deposit', 'receive'] },
  { name: 'card-out', category: 'Finance', tags: ['card', 'out', 'withdraw', 'send'] },
  { name: 'card-remove', category: 'Finance', tags: ['card', 'remove', 'delete'] },
  { name: 'card-tick', category: 'Finance', tags: ['card', 'tick', 'success', 'approved'] },
  { name: 'card-withdraw', category: 'Finance', tags: ['card', 'withdraw', 'cash'] },
  { name: 'coins', category: 'Finance', tags: ['coins', 'money', 'currency'] },
  { name: 'coins-alt', category: 'Finance', tags: ['coins', 'money', 'currency', 'alt'] },
  { name: 'coin-stack', category: 'Finance', tags: ['coins', 'stack', 'money'] },
  { name: 'coin-swap', category: 'Finance', tags: ['coins', 'swap', 'exchange'] },
  { name: 'division', category: 'Finance', tags: ['division', 'divide', 'math'] },
  { name: 'dollar', category: 'Finance', tags: ['dollar', 'usd', 'money', 'currency'] },
  { name: 'euro', category: 'Finance', tags: ['euro', 'eur', 'money', 'currency'] },
  { name: 'money', category: 'Finance', tags: ['money', 'cash', 'currency'] },
  { name: 'money-1', category: 'Finance', tags: ['money', 'cash', 'bill'] },
  { name: 'money-2', category: 'Finance', tags: ['money', 'cash', 'bill'] },
  { name: 'naira', category: 'Finance', tags: ['naira', 'ngn', 'nigeria', 'currency'] },
  { name: 'pounds', category: 'Finance', tags: ['pounds', 'gbp', 'sterling', 'currency'] },
  { name: 'yen', category: 'Finance', tags: ['yen', 'jpy', 'japan', 'currency'] },
  { name: 'receipt', category: 'Finance', tags: ['receipt', 'invoice', 'bill', 'purchase'] },
  { name: 'ticket', category: 'Finance', tags: ['ticket', 'voucher', 'coupon'] },
  { name: 'wallet', category: 'Finance', tags: ['wallet', 'money', 'pay'] },
  { name: 'wallet-add', category: 'Finance', tags: ['wallet', 'add', 'fund', 'topup'] },
  { name: 'wallet-remove', category: 'Finance', tags: ['wallet', 'remove', 'deduct'] },
  { name: 'wallet-cross', category: 'Finance', tags: ['wallet', 'cross', 'blocked', 'remove'] },
  { name: 'wallet-check', category: 'Finance', tags: ['wallet', 'check', 'success', 'approved'] },
  { name: 'wallet-fund', category: 'Finance', tags: ['wallet', 'fund', 'money', 'deposit'] },
  { name: 'wallet-withdraw', category: 'Finance', tags: ['wallet', 'withdraw', 'cash'] },
  // Health
  { name: 'first-aid', category: 'Health', tags: ['first aid', 'medical', 'emergency', 'health'] },
  { name: 'health-plus', category: 'Health', tags: ['health', 'plus', 'medical', 'add'] },
  { name: 'heart-beat', category: 'Health', tags: ['heartbeat', 'pulse', 'health', 'vital'] },
  { name: 'heart-beat-wave', category: 'Health', tags: ['heartbeat', 'wave', 'ecg', 'pulse'] },
  // Design & Media
  { name: 'beizer-curve', category: 'Design & Media', tags: ['bezier', 'curve', 'path', 'design'] },
  { name: 'backward', category: 'Design & Media', tags: ['backward', 'rewind', 'previous'] },
  { name: 'brush', category: 'Design & Media', tags: ['brush', 'paint', 'draw', 'design'] },
  { name: 'camera', category: 'Design & Media', tags: ['camera', 'photo', 'picture'] },
  { name: 'camera-slash', category: 'Design & Media', tags: ['camera', 'off', 'no camera'] },
  { name: 'color-picker', category: 'Design & Media', tags: ['color', 'picker', 'dropper', 'eyedropper'] },
  { name: 'crop', category: 'Design & Media', tags: ['crop', 'trim', 'resize', 'edit'] },
  { name: 'corner', category: 'Design & Media', tags: ['corner', 'radius', 'border', 'design'] },
  { name: 'cursor', category: 'Design & Media', tags: ['cursor', 'pointer', 'mouse', 'select'] },
  { name: 'forward', category: 'Design & Media', tags: ['forward', 'fast forward', 'skip'] },
  { name: 'image', category: 'Design & Media', tags: ['image', 'photo', 'picture', 'gallery'] },
  { name: 'image-add', category: 'Design & Media', tags: ['image', 'add', 'upload', 'plus'] },
  { name: 'image-circle', category: 'Design & Media', tags: ['image', 'circle', 'avatar', 'profile'] },
  { name: 'image-cross', category: 'Design & Media', tags: ['image', 'cross', 'remove', 'delete'] },
  { name: 'image-check', category: 'Design & Media', tags: ['image', 'check', 'verified', 'ok'] },
  { name: 'image-remove', category: 'Design & Media', tags: ['image', 'remove', 'delete'] },
  { name: 'layer', category: 'Design & Media', tags: ['layer', 'stack', 'design', 'photoshop'] },
  { name: 'list-add', category: 'Design & Media', tags: ['list', 'add', 'plus', 'create'] },
  { name: 'loudspeaker', category: 'Design & Media', tags: ['loudspeaker', 'megaphone', 'announce'] },
  { name: 'media', category: 'Design & Media', tags: ['media', 'video', 'play', 'film'] },
  { name: 'music', category: 'Design & Media', tags: ['music', 'audio', 'sound', 'note'] },
  { name: 'music-note', category: 'Design & Media', tags: ['music', 'note', 'audio', 'song'] },
  { name: 'microphone', category: 'Design & Media', tags: ['microphone', 'mic', 'record', 'audio'] },
  { name: 'microphone-slash', category: 'Design & Media', tags: ['microphone', 'mute', 'off', 'no mic'] },
  { name: 'next', category: 'Design & Media', tags: ['next', 'skip', 'forward', 'media'] },
  { name: 'paint-brush', category: 'Design & Media', tags: ['paint', 'brush', 'draw', 'art'] },
  { name: 'paint-bucket', category: 'Design & Media', tags: ['paint', 'bucket', 'fill', 'color'] },
  { name: 'pause', category: 'Design & Media', tags: ['pause', 'stop', 'media', 'player'] },
  { name: 'play', category: 'Design & Media', tags: ['play', 'start', 'media', 'video'] },
  { name: 'playlist', category: 'Design & Media', tags: ['playlist', 'queue', 'music', 'list'] },
  { name: 'previous', category: 'Design & Media', tags: ['previous', 'back', 'rewind', 'media'] },
  { name: 'repeat', category: 'Design & Media', tags: ['repeat', 'loop', 'replay'] },
  { name: 'scissor', category: 'Design & Media', tags: ['scissor', 'cut', 'trim', 'clip'] },
  { name: 'screenshot', category: 'Design & Media', tags: ['screenshot', 'capture', 'screen'] },
  { name: 'repeat-once', category: 'Design & Media', tags: ['repeat', 'once', 'loop', 'one'] },
  { name: 'shuffle', category: 'Design & Media', tags: ['shuffle', 'random', 'mix', 'music'] },
  { name: 'stop', category: 'Design & Media', tags: ['stop', 'halt', 'end', 'media'] },
  { name: 'video', category: 'Design & Media', tags: ['video', 'camera', 'film', 'record'] },
  { name: 'video-slash', category: 'Design & Media', tags: ['video', 'off', 'no camera', 'mute'] },
  { name: 'voice-note', category: 'Design & Media', tags: ['voice', 'note', 'audio', 'record'] },
  { name: 'volume', category: 'Design & Media', tags: ['volume', 'sound', 'audio', 'speaker'] },
  { name: 'volume-low', category: 'Design & Media', tags: ['volume', 'low', 'quiet', 'audio'] },
  { name: 'volume-mute', category: 'Design & Media', tags: ['volume', 'mute', 'silent', 'off'] },
  { name: 'volume-slash', category: 'Design & Media', tags: ['volume', 'slash', 'mute', 'off'] },
  // Messaging
  { name: 'mail', category: 'Messaging', tags: ['mail', 'email', 'message', 'inbox'] },
  { name: 'mail-add', category: 'Messaging', tags: ['mail', 'add', 'compose', 'new'] },
  { name: 'mail-check', category: 'Messaging', tags: ['mail', 'check', 'read', 'sent'] },
  { name: 'mail-cross', category: 'Messaging', tags: ['mail', 'cross', 'remove', 'decline'] },
  { name: 'mail-remove', category: 'Messaging', tags: ['mail', 'remove', 'delete', 'trash'] },
  { name: 'message', category: 'Messaging', tags: ['message', 'chat', 'bubble', 'text'] },
  { name: 'message-alt', category: 'Messaging', tags: ['message', 'chat', 'bubble', 'alt'] },
  { name: 'messages', category: 'Messaging', tags: ['messages', 'chats', 'conversation'] },
  // Nature
  { name: 'flower', category: 'Nature', tags: ['flower', 'bloom', 'plant', 'nature'] },
  { name: 'plant-2', category: 'Nature', tags: ['plant', 'leaf', 'green', 'nature'] },
  { name: 'plant', category: 'Nature', tags: ['plant', 'leaf', 'nature', 'grow'] },
  // Development
  { name: 'bot', category: 'Development', tags: ['bot', 'robot', 'ai', 'automation'] },
  { name: 'branch', category: 'Development', tags: ['branch', 'git', 'fork', 'code'] },
  { name: 'bug', category: 'Development', tags: ['bug', 'error', 'issue', 'debug'] },
  { name: 'code', category: 'Development', tags: ['code', 'brackets', 'dev', 'programming'] },
  { name: 'code-2', category: 'Development', tags: ['code', 'alt', 'dev', 'programming'] },
  { name: 'data', category: 'Development', tags: ['data', 'database', 'storage'] },
  { name: 'fork', category: 'Development', tags: ['fork', 'git', 'branch', 'merge'] },
  { name: 'merge', category: 'Development', tags: ['merge', 'git', 'branch', 'combine'] },
  { name: 'pull-request', category: 'Development', tags: ['pull request', 'pr', 'git', 'review'] },
  { name: 'terminal', category: 'Development', tags: ['terminal', 'console', 'command', 'cli'] },
  // Security
  { name: 'eye', category: 'Security', tags: ['eye', 'view', 'visible', 'show'] },
  { name: 'eye-slash', category: 'Security', tags: ['eye', 'slash', 'hidden', 'password'] },
  { name: 'face-id', category: 'Security', tags: ['face id', 'biometric', 'scan', 'recognition'] },
  { name: 'fingerprint', category: 'Security', tags: ['fingerprint', 'biometric', 'touch id', 'scan'] },
  { name: 'key', category: 'Security', tags: ['key', 'password', 'unlock', 'access'] },
  { name: 'lock', category: 'Security', tags: ['lock', 'secure', 'private', 'closed'] },
  { name: 'lock-open', category: 'Security', tags: ['lock', 'open', 'unlocked', 'access'] },
  { name: 'scan', category: 'Security', tags: ['scan', 'qr', 'barcode', 'camera'] },
  { name: 'shield', category: 'Security', tags: ['shield', 'security', 'protect', 'safe'] },
  { name: 'shield-cross', category: 'Security', tags: ['shield', 'cross', 'blocked', 'unsafe'] },
  { name: 'shield-tick', category: 'Security', tags: ['shield', 'tick', 'verified', 'protected'] },
  { name: 'QR-code', category: 'Security', tags: ['qr', 'code', 'scan', 'barcode'] },
  // Typography
  { name: 'underline', category: 'Typography', tags: ['underline', 'text', 'format', 'style'] },
  { name: 'align-center', category: 'Typography', tags: ['align', 'center', 'text', 'format'] },
  { name: 'align-justify', category: 'Typography', tags: ['align', 'justify', 'text', 'format'] },
  { name: 'align-left', category: 'Typography', tags: ['align', 'left', 'text', 'format'] },
  { name: 'align-right', category: 'Typography', tags: ['align', 'right', 'text', 'format'] },
  { name: 'at', category: 'Typography', tags: ['at', 'mention', 'email', 'symbol'] },
  { name: 'bold', category: 'Typography', tags: ['bold', 'text', 'format', 'strong'] },
  { name: 'hashtag', category: 'Typography', tags: ['hashtag', 'hash', 'tag', 'social'] },
  { name: 'heading', category: 'Typography', tags: ['heading', 'title', 'h1', 'text'] },
  { name: 'italics', category: 'Typography', tags: ['italics', 'italic', 'text', 'format'] },
  { name: 'line-height', category: 'Typography', tags: ['line height', 'spacing', 'text', 'format'] },
  { name: 'list', category: 'Typography', tags: ['list', 'bullet', 'items', 'ul', 'ol'] },
  { name: 'paragraph-spacing', category: 'Typography', tags: ['paragraph', 'spacing', 'text', 'format'] },
  { name: 'quote', category: 'Typography', tags: ['quote', 'blockquote', 'text', 'speech'] },
  { name: 'strikethrough', category: 'Typography', tags: ['strikethrough', 'strike', 'text', 'delete'] },
  { name: 'subscript', category: 'Typography', tags: ['subscript', 'sub', 'text', 'format'] },
  { name: 'superscript', category: 'Typography', tags: ['superscript', 'sup', 'text', 'format'] },
  { name: 'text', category: 'Typography', tags: ['text', 'font', 'type', 'letter'] },
  // Social
  { name: 'badge', category: 'Social', tags: ['badge', 'award', 'achievement', 'label'] },
  { name: 'dislike', category: 'Social', tags: ['dislike', 'thumbs down', 'negative'] },
  { name: 'gem', category: 'Social', tags: ['gem', 'diamond', 'jewel', 'premium'] },
  { name: 'gift', category: 'Social', tags: ['gift', 'present', 'reward', 'celebrate'] },
  { name: 'like', category: 'Social', tags: ['like', 'thumbs up', 'positive', 'approve'] },
  { name: 'support', category: 'Social', tags: ['support', 'help', 'headset', 'service'] },
  { name: 'trophy', category: 'Social', tags: ['trophy', 'award', 'win', 'achievement'] },
  // Lifestyle
  { name: 'tissue', category: 'Lifestyle', tags: ['tissue', 'paper', 'clean', 'wipe'] },
  { name: 'ball', category: 'Lifestyle', tags: ['ball', 'sport', 'play', 'game'] },
  { name: 'bed', category: 'Lifestyle', tags: ['bed', 'sleep', 'rest', 'hotel'] },
  { name: 'cup', category: 'Lifestyle', tags: ['cup', 'coffee', 'drink', 'cafe'] },
  { name: 'lamp', category: 'Lifestyle', tags: ['lamp', 'light', 'desk', 'home'] },
  { name: 'newspaper', category: 'Lifestyle', tags: ['newspaper', 'news', 'read', 'press'] },
  { name: 'palette', category: 'Lifestyle', tags: ['palette', 'color', 'art', 'design', 'paint'] },
  { name: 'shower', category: 'Lifestyle', tags: ['shower', 'bath', 'clean', 'water'] },
  { name: 'sofa', category: 'Lifestyle', tags: ['sofa', 'couch', 'seat', 'furniture', 'home'] },
  // Time & Calendar
  { name: 'alarm-clock', category: 'Time & Calendar', tags: ['alarm', 'clock', 'wake', 'timer'] },
  { name: 'calendar', category: 'Time & Calendar', tags: ['calendar', 'date', 'schedule', 'event'] },
  { name: 'calendar-add', category: 'Time & Calendar', tags: ['calendar', 'add', 'new event', 'schedule'] },
  { name: 'calendar-alt', category: 'Time & Calendar', tags: ['calendar', 'alt', 'date', 'schedule'] },
  { name: 'calendar-cross', category: 'Time & Calendar', tags: ['calendar', 'cross', 'cancel', 'remove'] },
  { name: 'calendar-remove', category: 'Time & Calendar', tags: ['calendar', 'remove', 'delete', 'cancel'] },
  { name: 'calendar-tick', category: 'Time & Calendar', tags: ['calendar', 'tick', 'confirmed', 'booked'] },
  { name: 'clock', category: 'Time & Calendar', tags: ['clock', 'time', 'hour', 'watch'] },
  { name: 'history', category: 'Time & Calendar', tags: ['history', 'recent', 'past', 'undo'] },
  { name: 'snooze', category: 'Time & Calendar', tags: ['snooze', 'alarm', 'sleep', 'delay'] },
  { name: 'stopwatch', category: 'Time & Calendar', tags: ['stopwatch', 'timer', 'time', 'speed'] },
  // Transport
  { name: 'airplane', category: 'Transport', tags: ['airplane', 'flight', 'travel', 'air'] },
  { name: 'bicycle', category: 'Transport', tags: ['bicycle', 'bike', 'cycle', 'travel'] },
  { name: 'box', category: 'Transport', tags: ['box', 'package', 'delivery', 'ship'] },
  { name: 'bus', category: 'Transport', tags: ['bus', 'transit', 'public', 'transport'] },
  { name: 'car', category: 'Transport', tags: ['car', 'vehicle', 'drive', 'auto'] },
  { name: 'compass', category: 'Transport', tags: ['compass', 'navigate', 'direction', 'explore'] },
  { name: 'globe', category: 'Transport', tags: ['globe', 'world', 'earth', 'international'] },
  { name: 'globe-alt', category: 'Transport', tags: ['globe', 'world', 'earth', 'alt'] },
  { name: 'gps', category: 'Transport', tags: ['gps', 'location', 'navigate', 'map'] },
  { name: 'map', category: 'Transport', tags: ['map', 'location', 'navigate', 'direction'] },
  { name: 'map-alt', category: 'Transport', tags: ['map', 'alt', 'navigate', 'direction'] },
  { name: 'map-marker', category: 'Transport', tags: ['map', 'marker', 'pin', 'location'] },
  { name: 'navigation', category: 'Transport', tags: ['navigation', 'direction', 'arrow', 'location'] },
  { name: 'navigation-alt', category: 'Transport', tags: ['navigation', 'alt', 'direction', 'arrow'] },
  { name: 'road-sign', category: 'Transport', tags: ['road sign', 'traffic', 'direction', 'sign'] },
  { name: 'rocket', category: 'Transport', tags: ['rocket', 'launch', 'space', 'fast'] },
  { name: 'rocket-alt', category: 'Transport', tags: ['rocket', 'launch', 'alt', 'space'] },
  { name: 'route', category: 'Transport', tags: ['route', 'path', 'direction', 'map'] },
  { name: 'ship', category: 'Transport', tags: ['ship', 'boat', 'sea', 'transport'] },
  { name: 'taxi', category: 'Transport', tags: ['taxi', 'cab', 'car', 'ride'] },
  { name: 'truck', category: 'Transport', tags: ['truck', 'delivery', 'cargo', 'ship'] },
  { name: 'train', category: 'Transport', tags: ['train', 'rail', 'transit', 'transport'] },
  // Weather
  { name: 'cloud-2', category: 'Weather', tags: ['cloud', 'sky', 'weather', 'overcast'] },
  { name: 'cloud-lightning', category: 'Weather', tags: ['cloud', 'lightning', 'storm', 'thunder'] },
  { name: 'cloud-rain', category: 'Weather', tags: ['cloud', 'rain', 'weather', 'water'] },
  { name: 'clouds', category: 'Weather', tags: ['clouds', 'sky', 'weather', 'overcast'] },
  { name: 'cloud-snowy', category: 'Weather', tags: ['cloud', 'snow', 'winter', 'cold'] },
  { name: 'lightning', category: 'Weather', tags: ['lightning', 'bolt', 'storm', 'electric'] },
  { name: 'lightning-off', category: 'Weather', tags: ['lightning', 'off', 'no power', 'calm'] },
  { name: 'moon', category: 'Weather', tags: ['moon', 'night', 'dark', 'crescent'] },
  { name: 'moon-cloud', category: 'Weather', tags: ['moon', 'cloud', 'night', 'weather'] },
  { name: 'moon-stars', category: 'Weather', tags: ['moon', 'stars', 'night', 'sky'] },
  { name: 'snowflake', category: 'Weather', tags: ['snowflake', 'snow', 'winter', 'cold', 'ice'] },
  { name: 'star', category: 'Weather', tags: ['star', 'favorite', 'rate', 'sky'] },
  { name: 'stars', category: 'Weather', tags: ['stars', 'sky', 'night', 'rate'] },
  { name: 'sun', category: 'Weather', tags: ['sun', 'sunny', 'weather', 'bright', 'day'] },
  { name: 'sun-cloud', category: 'Weather', tags: ['sun', 'cloud', 'partly cloudy', 'weather'] },
  { name: 'thermometer', category: 'Weather', tags: ['thermometer', 'temperature', 'hot', 'cold'] },
  { name: 'water-drop', category: 'Weather', tags: ['water', 'drop', 'rain', 'liquid'] },
  // Users
  { name: 'user', category: 'Users', tags: ['user', 'person', 'profile', 'account'] },
  { name: 'user-add', category: 'Users', tags: ['user', 'add', 'invite', 'plus'] },
  { name: 'user-circle', category: 'Users', tags: ['user', 'circle', 'avatar', 'profile'] },
  { name: 'user-cross', category: 'Users', tags: ['user', 'cross', 'remove', 'block'] },
  { name: 'user-group', category: 'Users', tags: ['user', 'group', 'team', 'people'] },
  { name: 'user-heart', category: 'Users', tags: ['user', 'heart', 'love', 'favorite'] },
  { name: 'user-remove', category: 'Users', tags: ['user', 'remove', 'delete', 'block'] },
  { name: 'users', category: 'Users', tags: ['users', 'team', 'group', 'people'] },
  { name: 'user-tick', category: 'Users', tags: ['user', 'tick', 'verified', 'approved'] },
  // Arrows & Navigation
  { name: 'arrow-down', category: 'Arrows', tags: ['arrow', 'down', 'direction'] },
  { name: 'arrow-down-left', category: 'Arrows', tags: ['arrow', 'down left', 'diagonal'] },
  { name: 'arrow-down-right', category: 'Arrows', tags: ['arrow', 'down right', 'diagonal'] },
  { name: 'arrow-expand', category: 'Arrows', tags: ['arrow', 'expand', 'fullscreen', 'open'] },
  { name: 'arrow-left', category: 'Arrows', tags: ['arrow', 'left', 'back', 'previous'] },
  { name: 'arrow-right', category: 'Arrows', tags: ['arrow', 'right', 'forward', 'next'] },
  { name: 'arrow-shrink', category: 'Arrows', tags: ['arrow', 'shrink', 'compress', 'collapse'] },
  { name: 'arrow-up', category: 'Arrows', tags: ['arrow', 'up', 'scroll top', 'increase'] },
  { name: 'arrow-up-left', category: 'Arrows', tags: ['arrow', 'up left', 'diagonal'] },
  { name: 'arrow-up-right', category: 'Arrows', tags: ['arrow', 'up right', 'diagonal'] },
  { name: 'arrow-up-split', category: 'Arrows', tags: ['arrow', 'split', 'branch', 'fork'] },
  { name: 'chevron-down', category: 'Arrows', tags: ['chevron', 'down', 'expand', 'dropdown'] },
  { name: 'chevron-h', category: 'Arrows', tags: ['chevron', 'horizontal', 'double', 'expand'] },
  { name: 'chevron-left', category: 'Arrows', tags: ['chevron', 'left', 'back', 'previous'] },
  { name: 'chevron-right', category: 'Arrows', tags: ['chevron', 'right', 'next', 'forward'] },
  { name: 'chevron-up', category: 'Arrows', tags: ['chevron', 'up', 'collapse', 'scroll'] },
  { name: 'chevron-v', category: 'Arrows', tags: ['chevron', 'vertical', 'double', 'sort'] },
  { name: 'corner-down-left', category: 'Arrows', tags: ['corner', 'down left', 'return', 'enter'] },
  { name: 'corner-down-right', category: 'Arrows', tags: ['corner', 'down right', 'redirect'] },
  { name: 'corner-left-down', category: 'Arrows', tags: ['corner', 'left down', 'turn'] },
  { name: 'corner-left-up', category: 'Arrows', tags: ['corner', 'left up', 'turn'] },
  { name: 'corner-right-down', category: 'Arrows', tags: ['corner', 'right down', 'turn'] },
  { name: 'corner-right-up', category: 'Arrows', tags: ['corner', 'right up', 'turn'] },
  { name: 'corner-up-left', category: 'Arrows', tags: ['corner', 'up left', 'turn'] },
  { name: 'corner-up-right', category: 'Arrows', tags: ['corner', 'up right', 'turn'] },
  { name: 'expand', category: 'Arrows', tags: ['expand', 'fullscreen', 'open', 'maximize'] },
  { name: 'move', category: 'Arrows', tags: ['move', 'drag', 'direction', 'pan'] },
  { name: 'refresh', category: 'Arrows', tags: ['refresh', 'reload', 'sync', 'update'] },
  { name: 'redo', category: 'Arrows', tags: ['redo', 'forward', 'repeat', 'undo'] },
  { name: 'rotate-left', category: 'Arrows', tags: ['rotate', 'left', 'counterclockwise', 'undo'] },
  { name: 'rotate-right', category: 'Arrows', tags: ['rotate', 'right', 'clockwise', 'redo'] },
  { name: 'shrink', category: 'Arrows', tags: ['shrink', 'compress', 'minimize', 'collapse'] },
  { name: 'shrink-alt', category: 'Arrows', tags: ['shrink', 'alt', 'compress', 'minimize'] },
  { name: 'switch-diagonal', category: 'Arrows', tags: ['switch', 'diagonal', 'swap', 'exchange'] },
  { name: 'switch-horizontal', category: 'Arrows', tags: ['switch', 'horizontal', 'swap', 'exchange'] },
  { name: 'switch-vertical', category: 'Arrows', tags: ['switch', 'vertical', 'swap', 'exchange'] },
  { name: 'undo', category: 'Arrows', tags: ['undo', 'back', 'revert', 'previous'] },
];

const BRAND_COLORS = [
  { name: 'Default (currentColor)', value: 'currentColor' },
  { name: 'FMDQ Blue (primary-700)', value: 'primary-700' },
  { name: 'FMDQ Gold (fmdq-gold)', value: 'fmdq-gold' },
  { name: 'FMDQ Grey (fmdq-grey)', value: 'fmdq-grey' },
  { name: 'Success (success-500)', value: 'success-500' },
  { name: 'Warning (warning-500)', value: 'warning-500' },
  { name: 'Error (error-500)', value: 'error-500' }
];

const COLOR_OPTIONS = [
  ...BRAND_COLORS.map(c => ({ label: c.name, value: c.value })),
  { label: 'Custom Color...', value: 'custom' }
];

const SIZES = [
  { label: '10px (XXS)', value: '10px' },
  { label: '12px (XS)', value: '12px' },
  { label: '14px (SM)', value: '14px' },
  { label: '16px (MD)', value: '16px' },
  { label: '18px (L)', value: '18px' },
  { label: '20px (XL)', value: '20px' },
  { label: '24px (XXL)', value: '24px' },
  { label: '32px (XXXL)', value: '32px' }
];

export const IconShowcase: React.FC = () => {
  const [search, setSearch] = useState('');
  const [variant, setVariant] = useState<'linear' | 'bold'>('linear');
  const [colorMode, setColorMode] = useState('currentColor');
  const [customColor, setCustomColor] = useState('');
  const [size, setSize] = useState('24px');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const getResolvedColorValue = (val: string): string => {
    if (!val) return 'currentColor';
    const trimmed = val.trim();
    if (
      trimmed.startsWith('var(') ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('rgb') ||
      trimmed.startsWith('hsl') ||
      trimmed.toLowerCase() === 'currentcolor'
    ) {
      return trimmed;
    }
    const normalized = trimmed.toLowerCase().replace(/[\s_]+/g, '-');
    if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(normalized)) {
      return `var(--color-${normalized})`;
    }
    return trimmed;
  };

  // Resolve token names (e.g. "fmdq-gold") to valid CSS values (e.g. "var(--color-fmdq-gold)")
  const color = getResolvedColorValue(colorMode === 'custom' ? customColor : colorMode);

  const filteredIcons = ALL_ICONS.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase()) ||
      icon.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  const categories = Array.from(new Set(ALL_ICONS.map(i => i.category)));

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div style={{
      fontFamily: '"DM Sans", sans-serif',
      color: '#101828',
      background: '#FFFFFF',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #E4E7EC',
      boxShadow: '0px 4px 20px rgba(16, 24, 40, 0.05)',
      marginTop: '20px',
      position: 'relative',
    }}>
      {/* Override input width cap within the controls panel */}
      <style>{`
        .icon-controls-grid .fmdqui-input-container {
          width: 100% !important;
        }
      `}</style>

      {/* ── Controls Toolbar ── */}
      <div className="icon-controls-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        margin: '0px 0 32px 0',
        background: '#F9FAFB',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #F0F2F5'
      }}>
        {/* Search Field */}
        <div>
          <Input
            label="Search Icons"
            hasLabel={true}
            hasLeftIcon={true}
            hasRightIcon={false}
            hasHelperText={false}
            placeholder="Type name or tag (e.g. magic)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Variant Style Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="fmdqui-input__label" style={{ fontSize: '14px', fontWeight: 500, lineHeight: '20px', color: 'var(--color-neutral-900)', display: 'block' }}>Variant Style</span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '36px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#344054' }}>
              <Toggle
                type="Radio"
                name="variant-style"
                active={variant === 'linear'}
                onChange={() => setVariant('linear')}
              />
              Linear
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#344054' }}>
              <Toggle
                type="Radio"
                name="variant-style"
                active={variant === 'bold'}
                onChange={() => setVariant('bold')}
              />
              Bold
            </label>
          </div>
        </div>

        {/* Color Customizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Input
            label="Icon Color"
            state="input dropdown"
            hasLabel={true}
            hasLeftIcon={false}
            hasRightIcon={true}
            hasHelperText={false}
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
            options={COLOR_OPTIONS}
            placeholder=""
          />
          {colorMode === 'custom' && (
            <div style={{ marginTop: '8px' }}>
              <Input
                label="Custom Color Value"
                hasLabel={false}
                hasLeftIcon={false}
                hasRightIcon={false}
                hasHelperText={false}
                placeholder="e.g. primary 600"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Size Customizer */}
        <div>
          <Input
            label="Icon Size"
            state="input dropdown"
            hasLabel={true}
            hasLeftIcon={false}
            hasRightIcon={true}
            hasHelperText={false}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            options={SIZES}
            placeholder=""
          />
        </div>
      </div>

      {/* ── Category / Icon Grid ── */}
      {categories.map(cat => {
        const catIcons = filteredIcons.filter(i => i.category === cat);
        if (catIcons.length === 0) return null;
        // Auto-expand when search is active; otherwise use manual toggle state
        const isOpen = search.length > 0 || openCategories.has(cat);

        return (
          <div key={cat} style={{ marginBottom: isOpen ? '24px' : '0' }}>
            {/* Sticky collapsible header */}
            <button
              onClick={() => toggleCategory(cat)}
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                border: 'none',
                borderBottom: `2px solid ${isOpen ? '#E4E7EC' : '#F0F2F5'}`,
                padding: '12px 0 10px 0',
                cursor: 'pointer',
                textAlign: 'left',
                outline: 'none',
                boxShadow: isOpen ? '0 10px 8px -4px rgba(16, 24, 40, 0.06)' : 'none',
              }}
            >
              {/* Chevron using Icon library */}
              <Icon
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={isOpen ? '#1D326D' : '#667085'}
                style={{ flexShrink: 0, transition: 'color 0.15s ease' }}
              />
              <span style={{
                fontSize: '15px',
                fontWeight: '700',
                color: isOpen ? '#1D326D' : '#344054',
                flex: 1,
                transition: 'color 0.15s ease',
              }}>
                {cat}
              </span>
              {/* Count badge using Badge component */}
              <Badge color="blue" type="accent" size="sm">
                {catIcons.length} {catIcons.length === 1 ? 'icon' : 'icons'}
              </Badge>
            </button>

            {/* Collapsible icon grid */}
            {isOpen && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '16px',
                paddingTop: '16px',
              }}>
                {catIcons.map(icon => {
                  const isSelected = selectedIcon?.name === icon.name;

                  return (
                    <button
                      key={icon.name}
                      onClick={() => setSelectedIcon(isSelected ? null : icon)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        background: isSelected ? '#FEF6E7' : '#FFFFFF',
                        border: isSelected ? '1px solid #CC9933' : '1px solid #E4E7EC',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease-in-out',
                        outline: 'none',
                        boxShadow: isSelected ? '0px 4px 12px rgba(204, 153, 51, 0.15)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#1D326D';
                          e.currentTarget.style.background = '#F9FAFB';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#E4E7EC';
                          e.currentTarget.style.background = '#FFFFFF';
                          e.currentTarget.style.transform = 'none';
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        height: '48px',
                        background: '#F9FAFB',
                        borderRadius: '8px',
                        border: '1px solid #F0F2F5'
                      }}>
                        <Icon
                          name={icon.name}
                          variant={variant}
                          color={color}
                          size={size}
                        />
                      </div>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: isSelected ? '#CC9933' : '#344054',
                        wordBreak: 'break-all',
                        textAlign: 'center'
                      }}>
                        {icon.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {filteredIcons.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#667085' }}>
          <p style={{ fontSize: '16px', fontWeight: '500' }}>No icons found matching "{search}"</p>
          <p style={{ fontSize: '14px', marginTop: '4px' }}>Try searching for a different keyword or tag.</p>
        </div>
      )}

      {/* ── Selected Icon Detail Drawer ── */}
      {selectedIcon && (
        <div style={{
          marginTop: '32px',
          padding: '24px',
          background: '#FEF6E7',
          border: '1px solid #FBE2B7',
          borderRadius: '12px',
          display: 'grid',
          gridTemplateColumns: '80px 1fr',
          gap: '24px',
          alignItems: 'center',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          {/* Visual Showcase */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #FBE2B7',
            boxShadow: '0px 4px 10px rgba(16, 24, 40, 0.03)'
          }}>
            <Icon
              name={selectedIcon.name}
              variant={variant}
              color={color}
              size="40px"
            />
          </div>

          {/* Details & Code Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1D326D', margin: 0 }}>
                {selectedIcon.name}
              </h4>
              <span style={{ fontSize: '12px', color: '#667085', background: '#FFFFFF', padding: '2px 8px', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
                Category: {selectedIcon.category}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* HTML Snippet */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                <span style={{ width: '90px', fontSize: '11px', fontWeight: '700', color: '#667085', textTransform: 'uppercase' }}>HTML/CSS</span>
                <code style={{ flex: 1, fontSize: '12px', color: '#099137', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {`<span class="fmdq-icon fmdq-icon-${selectedIcon.name}${variant === 'bold' ? ' style-bold' : ''}"${color !== 'currentColor' ? ` style="--icon-color: ${getResolvedColorValue(color)};"` : ''}></span>`}
                </code>
                <button
                  onClick={() => handleCopy(
                    `<span class="fmdq-icon fmdq-icon-${selectedIcon.name}${variant === 'bold' ? ' style-bold' : ''}"${color !== 'currentColor' ? ` style="--icon-color: ${getResolvedColorValue(color)};"` : ''}></span>`,
                    'html'
                  )}
                  style={{
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: '1px solid #D0D5DD',
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    color: copiedText === 'html' ? '#099137' : '#344054'
                  }}
                >
                  {copiedText === 'html' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* React Snippet */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                <span style={{ width: '90px', fontSize: '11px', fontWeight: '700', color: '#667085', textTransform: 'uppercase' }}>React</span>
                <code style={{ flex: 1, fontSize: '12px', color: '#099137', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {`<Icon name="${selectedIcon.name}"${variant === 'bold' ? ' variant="bold"' : ''}${color !== 'currentColor' ? ` color="${color}"` : ''}${size !== '24px' ? ` size="${size}"` : ''} />`}
                </code>
                <button
                  onClick={() => handleCopy(
                    `<Icon name="${selectedIcon.name}"${variant === 'bold' ? ' variant="bold"' : ''}${color !== 'currentColor' ? ` color="${color}"` : ''}${size !== '24px' ? ` size="${size}"` : ''} />`,
                    'react'
                  )}
                  style={{
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: '1px solid #D0D5DD',
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    color: copiedText === 'react' ? '#099137' : '#344054'
                  }}
                >
                  {copiedText === 'react' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* CSS Token */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                <span style={{ width: '90px', fontSize: '11px', fontWeight: '700', color: '#667085', textTransform: 'uppercase' }}>CSS Token</span>
                <code style={{ flex: 1, fontSize: '12px', color: '#099137', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {`var(--icon-${selectedIcon.name}-${variant})`}
                </code>
                <button
                  onClick={() => handleCopy(
                    `var(--icon-${selectedIcon.name}-${variant})`,
                    'css'
                  )}
                  style={{
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: '1px solid #D0D5DD',
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    color: copiedText === 'css' ? '#099137' : '#344054'
                  }}
                >
                  {copiedText === 'css' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
