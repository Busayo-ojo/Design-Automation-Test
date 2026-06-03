import React, { useState } from 'react';
import { Icon } from '../elements/Icon/Icon';
import { Toggle } from '../elements/Toggle';
import { Input } from '../elements/Input';

interface IconData {
  name: string;
  category: string;
  tags: string[];
}

const ALL_ICONS: IconData[] = [
  {
    "name": "3d",
    "category": "✨ AI & VR",
    "tags": [
      "3d"
    ]
  },
  {
    "name": "AI-stars",
    "category": "✨ AI & VR",
    "tags": [
      "AI",
      "stars",
      "magic",
      "sparkles",
      "ai"
    ]
  },
  {
    "name": "airplane",
    "category": "🚗 Transport",
    "tags": [
      "airplane",
      "transport"
    ]
  },
  {
    "name": "airpod",
    "category": "💻 Devices",
    "tags": [
      "airpod",
      "devices"
    ]
  },
  {
    "name": "alarm-clock",
    "category": "⏰ Time",
    "tags": [
      "alarm",
      "clock",
      "time",
      "secure",
      "security"
    ]
  },
  {
    "name": "align-center",
    "category": "📝 Texts",
    "tags": [
      "align",
      "center",
      "texts"
    ]
  },
  {
    "name": "align-justify",
    "category": "📝 Texts",
    "tags": [
      "align",
      "justify",
      "texts"
    ]
  },
  {
    "name": "align-left",
    "category": "📝 Texts",
    "tags": [
      "align",
      "left",
      "texts"
    ]
  },
  {
    "name": "align-right",
    "category": "📝 Texts",
    "tags": [
      "align",
      "right",
      "texts"
    ]
  },
  {
    "name": "AR",
    "category": "✨ AI & VR",
    "tags": [
      "AR"
    ]
  },
  {
    "name": "arrow-down",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "down",
      "arrows"
    ]
  },
  {
    "name": "arrow-down-left",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "down",
      "left",
      "arrows"
    ]
  },
  {
    "name": "arrow-down-right",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "down",
      "right",
      "arrows"
    ]
  },
  {
    "name": "arrow-expand",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "expand",
      "arrows"
    ]
  },
  {
    "name": "arrow-left",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "left",
      "arrows"
    ]
  },
  {
    "name": "arrow-right",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "right",
      "arrows"
    ]
  },
  {
    "name": "arrow-shrink",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "shrink",
      "arrows"
    ]
  },
  {
    "name": "arrow-up",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "up",
      "arrows"
    ]
  },
  {
    "name": "arrow-up-left",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "up",
      "left",
      "arrows"
    ]
  },
  {
    "name": "arrow-up-right",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "up",
      "right",
      "arrows"
    ]
  },
  {
    "name": "arrow-up-split",
    "category": "➡️ Arrows",
    "tags": [
      "arrow",
      "up",
      "split",
      "arrows"
    ]
  },
  {
    "name": "at",
    "category": "📝 Texts",
    "tags": [
      "at",
      "texts"
    ]
  },
  {
    "name": "backward",
    "category": "🎧 Media",
    "tags": [
      "backward",
      "media"
    ]
  },
  {
    "name": "badge",
    "category": "🏆 Support",
    "tags": [
      "badge",
      "support"
    ]
  },
  {
    "name": "bag",
    "category": "🛍️ Ecommerce",
    "tags": [
      "bag",
      "ecommerce"
    ]
  },
  {
    "name": "ball",
    "category": "🎨 Things",
    "tags": [
      "ball",
      "things"
    ]
  },
  {
    "name": "bank",
    "category": "🏡 Buildings",
    "tags": [
      "bank",
      "buildings"
    ]
  },
  {
    "name": "bar-chart-h",
    "category": "📊 Dashboard",
    "tags": [
      "bar",
      "chart",
      "h",
      "dashboard"
    ]
  },
  {
    "name": "bar-chart-v",
    "category": "📊 Dashboard",
    "tags": [
      "bar",
      "chart",
      "v",
      "dashboard"
    ]
  },
  {
    "name": "battery",
    "category": "💻 Devices",
    "tags": [
      "battery",
      "devices"
    ]
  },
  {
    "name": "battery-charging",
    "category": "💻 Devices",
    "tags": [
      "battery",
      "charging",
      "devices"
    ]
  },
  {
    "name": "battery-empty",
    "category": "💻 Devices",
    "tags": [
      "battery",
      "empty",
      "devices"
    ]
  },
  {
    "name": "bed",
    "category": "🎨 Things",
    "tags": [
      "bed",
      "things"
    ]
  },
  {
    "name": "beizer-curve",
    "category": "🎧 Media",
    "tags": [
      "beizer",
      "curve",
      "media"
    ]
  },
  {
    "name": "bell",
    "category": "🔔 Essentials",
    "tags": [
      "bell",
      "essentials"
    ]
  },
  {
    "name": "bell-slash",
    "category": "🔔 Essentials",
    "tags": [
      "bell",
      "slash",
      "essentials"
    ]
  },
  {
    "name": "bicycle",
    "category": "🚗 Transport",
    "tags": [
      "bicycle",
      "transport"
    ]
  },
  {
    "name": "bin",
    "category": "🔔 Essentials",
    "tags": [
      "bin",
      "essentials",
      "delete",
      "remove"
    ]
  },
  {
    "name": "bluetooth",
    "category": "💻 Devices",
    "tags": [
      "bluetooth",
      "devices"
    ]
  },
  {
    "name": "bold",
    "category": "📝 Texts",
    "tags": [
      "bold",
      "texts"
    ]
  },
  {
    "name": "book",
    "category": "📚 Education",
    "tags": [
      "book",
      "education"
    ]
  },
  {
    "name": "book-open",
    "category": "📚 Education",
    "tags": [
      "book",
      "open",
      "education"
    ]
  },
  {
    "name": "bookmark",
    "category": "🔔 Essentials",
    "tags": [
      "bookmark",
      "essentials"
    ]
  },
  {
    "name": "bookmark-add",
    "category": "🔔 Essentials",
    "tags": [
      "bookmark",
      "add",
      "essentials"
    ]
  },
  {
    "name": "bookmarks",
    "category": "🔔 Essentials",
    "tags": [
      "bookmarks",
      "essentials"
    ]
  },
  {
    "name": "books",
    "category": "📚 Education",
    "tags": [
      "books",
      "education"
    ]
  },
  {
    "name": "bot",
    "category": "🐞 Programming",
    "tags": [
      "bot",
      "programming"
    ]
  },
  {
    "name": "box",
    "category": "🚗 Transport",
    "tags": [
      "box",
      "transport"
    ]
  },
  {
    "name": "box-1",
    "category": "🛍️ Ecommerce",
    "tags": [
      "box",
      "1",
      "ecommerce"
    ]
  },
  {
    "name": "branch",
    "category": "🐞 Programming",
    "tags": [
      "branch",
      "programming"
    ]
  },
  {
    "name": "brush",
    "category": "🎧 Media",
    "tags": [
      "brush",
      "media"
    ]
  },
  {
    "name": "BTC",
    "category": "💎 Crypto",
    "tags": [
      "BTC",
      "crypto"
    ]
  },
  {
    "name": "bug",
    "category": "🐞 Programming",
    "tags": [
      "bug",
      "programming"
    ]
  },
  {
    "name": "building-1",
    "category": "🏡 Buildings",
    "tags": [
      "building",
      "1",
      "buildings"
    ]
  },
  {
    "name": "building-2",
    "category": "🏡 Buildings",
    "tags": [
      "building",
      "2",
      "buildings"
    ]
  },
  {
    "name": "building-3",
    "category": "🏡 Buildings",
    "tags": [
      "building",
      "3",
      "buildings"
    ]
  },
  {
    "name": "building-4",
    "category": "🏡 Buildings",
    "tags": [
      "building",
      "4",
      "buildings"
    ]
  },
  {
    "name": "building-5",
    "category": "🏡 Buildings",
    "tags": [
      "building",
      "5",
      "buildings"
    ]
  },
  {
    "name": "building-6",
    "category": "🏡 Buildings",
    "tags": [
      "building",
      "6",
      "buildings"
    ]
  },
  {
    "name": "bulb",
    "category": "🔔 Essentials",
    "tags": [
      "bulb",
      "essentials"
    ]
  },
  {
    "name": "bulb-slash",
    "category": "🔔 Essentials",
    "tags": [
      "bulb",
      "slash",
      "essentials"
    ]
  },
  {
    "name": "bus",
    "category": "🚗 Transport",
    "tags": [
      "bus",
      "transport"
    ]
  },
  {
    "name": "calendar",
    "category": "⏰ Time",
    "tags": [
      "calendar",
      "time"
    ]
  },
  {
    "name": "calendar-add",
    "category": "⏰ Time",
    "tags": [
      "calendar",
      "add",
      "time"
    ]
  },
  {
    "name": "calendar-alt",
    "category": "⏰ Time",
    "tags": [
      "calendar",
      "alt",
      "time"
    ]
  },
  {
    "name": "calendar-cross",
    "category": "⏰ Time",
    "tags": [
      "calendar",
      "cross",
      "time"
    ]
  },
  {
    "name": "calendar-remove",
    "category": "⏰ Time",
    "tags": [
      "calendar",
      "remove",
      "time"
    ]
  },
  {
    "name": "calendar-tick",
    "category": "⏰ Time",
    "tags": [
      "calendar",
      "tick",
      "time"
    ]
  },
  {
    "name": "call",
    "category": "☎️ Call",
    "tags": [
      "call"
    ]
  },
  {
    "name": "call-add",
    "category": "☎️ Call",
    "tags": [
      "call",
      "add"
    ]
  },
  {
    "name": "call-cross",
    "category": "☎️ Call",
    "tags": [
      "call",
      "cross"
    ]
  },
  {
    "name": "call-incoming",
    "category": "☎️ Call",
    "tags": [
      "call",
      "incoming"
    ]
  },
  {
    "name": "call-outgoing",
    "category": "☎️ Call",
    "tags": [
      "call",
      "outgoing"
    ]
  },
  {
    "name": "call-remove",
    "category": "☎️ Call",
    "tags": [
      "call",
      "remove"
    ]
  },
  {
    "name": "call-ringing",
    "category": "☎️ Call",
    "tags": [
      "call",
      "ringing"
    ]
  },
  {
    "name": "camera",
    "category": "🎧 Media",
    "tags": [
      "camera",
      "media"
    ]
  },
  {
    "name": "camera-slash",
    "category": "🎧 Media",
    "tags": [
      "camera",
      "slash",
      "media"
    ]
  },
  {
    "name": "candles-h",
    "category": "📊 Dashboard",
    "tags": [
      "candles",
      "h",
      "dashboard"
    ]
  },
  {
    "name": "candles-v",
    "category": "📊 Dashboard",
    "tags": [
      "candles",
      "v",
      "dashboard"
    ]
  },
  {
    "name": "car",
    "category": "🚗 Transport",
    "tags": [
      "car",
      "transport"
    ]
  },
  {
    "name": "card",
    "category": "💰 Finance",
    "tags": [
      "card",
      "finance"
    ]
  },
  {
    "name": "card-add",
    "category": "💰 Finance",
    "tags": [
      "card",
      "add",
      "finance"
    ]
  },
  {
    "name": "card-cross",
    "category": "💰 Finance",
    "tags": [
      "card",
      "cross",
      "finance"
    ]
  },
  {
    "name": "card-fund",
    "category": "💰 Finance",
    "tags": [
      "card",
      "fund",
      "finance"
    ]
  },
  {
    "name": "card-in",
    "category": "💰 Finance",
    "tags": [
      "card",
      "in",
      "finance"
    ]
  },
  {
    "name": "card-out",
    "category": "💰 Finance",
    "tags": [
      "card",
      "out",
      "finance"
    ]
  },
  {
    "name": "card-remove",
    "category": "💰 Finance",
    "tags": [
      "card",
      "remove",
      "finance"
    ]
  },
  {
    "name": "card-tick",
    "category": "💰 Finance",
    "tags": [
      "card",
      "tick",
      "finance"
    ]
  },
  {
    "name": "card-withdraw",
    "category": "💰 Finance",
    "tags": [
      "card",
      "withdraw",
      "finance"
    ]
  },
  {
    "name": "cart",
    "category": "🛍️ Ecommerce",
    "tags": [
      "cart",
      "ecommerce"
    ]
  },
  {
    "name": "cart-add",
    "category": "🛍️ Ecommerce",
    "tags": [
      "cart",
      "add",
      "ecommerce"
    ]
  },
  {
    "name": "cart-check",
    "category": "🛍️ Ecommerce",
    "tags": [
      "cart",
      "check",
      "ecommerce"
    ]
  },
  {
    "name": "cart-cross",
    "category": "🛍️ Ecommerce",
    "tags": [
      "cart",
      "cross",
      "ecommerce"
    ]
  },
  {
    "name": "cart-minus",
    "category": "🛍️ Ecommerce",
    "tags": [
      "cart",
      "minus",
      "ecommerce"
    ]
  },
  {
    "name": "chart",
    "category": "📊 Dashboard",
    "tags": [
      "chart",
      "dashboard"
    ]
  },
  {
    "name": "chart-down",
    "category": "📊 Dashboard",
    "tags": [
      "chart",
      "down",
      "dashboard"
    ]
  },
  {
    "name": "chart-up",
    "category": "📊 Dashboard",
    "tags": [
      "chart",
      "up",
      "dashboard"
    ]
  },
  {
    "name": "chat",
    "category": "📥 Messaging",
    "tags": [
      "chat",
      "messaging"
    ]
  },
  {
    "name": "chat-alt",
    "category": "📥 Messaging",
    "tags": [
      "chat",
      "alt",
      "messaging"
    ]
  },
  {
    "name": "chats",
    "category": "📥 Messaging",
    "tags": [
      "chats",
      "messaging"
    ]
  },
  {
    "name": "check",
    "category": "🔔 Essentials",
    "tags": [
      "check",
      "essentials"
    ]
  },
  {
    "name": "check-circle",
    "category": "🔔 Essentials",
    "tags": [
      "check",
      "circle",
      "essentials"
    ]
  },
  {
    "name": "checkbox",
    "category": "🔔 Essentials",
    "tags": [
      "checkbox",
      "essentials"
    ]
  },
  {
    "name": "checkbox-checked",
    "category": "🔔 Essentials",
    "tags": [
      "checkbox",
      "checked",
      "essentials"
    ]
  },
  {
    "name": "chevron-down",
    "category": "➡️ Arrows",
    "tags": [
      "chevron",
      "down",
      "arrows"
    ]
  },
  {
    "name": "chevron-h",
    "category": "➡️ Arrows",
    "tags": [
      "chevron",
      "h",
      "arrows"
    ]
  },
  {
    "name": "chevron-left",
    "category": "➡️ Arrows",
    "tags": [
      "chevron",
      "left",
      "arrows"
    ]
  },
  {
    "name": "chevron-right",
    "category": "➡️ Arrows",
    "tags": [
      "chevron",
      "right",
      "arrows"
    ]
  },
  {
    "name": "chevron-up",
    "category": "➡️ Arrows",
    "tags": [
      "chevron",
      "up",
      "arrows"
    ]
  },
  {
    "name": "chevron-v",
    "category": "➡️ Arrows",
    "tags": [
      "chevron",
      "v",
      "arrows"
    ]
  },
  {
    "name": "clipboard",
    "category": "📁 Files",
    "tags": [
      "clipboard",
      "files"
    ]
  },
  {
    "name": "clock",
    "category": "⏰ Time",
    "tags": [
      "clock",
      "time",
      "secure",
      "security"
    ]
  },
  {
    "name": "cloud",
    "category": "📁 Files",
    "tags": [
      "cloud",
      "files"
    ]
  },
  {
    "name": "cloud",
    "category": "🌤️ Weather",
    "tags": [
      "cloud",
      "weather"
    ]
  },
  {
    "name": "cloud-download",
    "category": "📁 Files",
    "tags": [
      "cloud",
      "download",
      "files"
    ]
  },
  {
    "name": "cloud-info",
    "category": "📁 Files",
    "tags": [
      "cloud",
      "info",
      "files"
    ]
  },
  {
    "name": "cloud-lightning",
    "category": "🌤️ Weather",
    "tags": [
      "cloud",
      "lightning",
      "weather"
    ]
  },
  {
    "name": "cloud-rain",
    "category": "🌤️ Weather",
    "tags": [
      "cloud",
      "rain",
      "weather"
    ]
  },
  {
    "name": "cloud-slash",
    "category": "📁 Files",
    "tags": [
      "cloud",
      "slash",
      "files"
    ]
  },
  {
    "name": "cloud-snowy",
    "category": "🌤️ Weather",
    "tags": [
      "cloud",
      "snowy",
      "weather"
    ]
  },
  {
    "name": "cloud-upload",
    "category": "📁 Files",
    "tags": [
      "cloud",
      "upload",
      "files"
    ]
  },
  {
    "name": "clouds",
    "category": "🌤️ Weather",
    "tags": [
      "clouds",
      "weather"
    ]
  },
  {
    "name": "code",
    "category": "🐞 Programming",
    "tags": [
      "code",
      "programming"
    ]
  },
  {
    "name": "code-2",
    "category": "🐞 Programming",
    "tags": [
      "code",
      "2",
      "programming"
    ]
  },
  {
    "name": "coin-stack",
    "category": "💰 Finance",
    "tags": [
      "coin",
      "stack",
      "finance"
    ]
  },
  {
    "name": "coin-swap",
    "category": "💰 Finance",
    "tags": [
      "coin",
      "swap",
      "finance"
    ]
  },
  {
    "name": "coins",
    "category": "💰 Finance",
    "tags": [
      "coins",
      "finance"
    ]
  },
  {
    "name": "coins-alt",
    "category": "💰 Finance",
    "tags": [
      "coins",
      "alt",
      "finance"
    ]
  },
  {
    "name": "color-picker",
    "category": "🎧 Media",
    "tags": [
      "color",
      "picker",
      "media"
    ]
  },
  {
    "name": "column",
    "category": "📊 Dashboard",
    "tags": [
      "column",
      "dashboard"
    ]
  },
  {
    "name": "compass",
    "category": "🚗 Transport",
    "tags": [
      "compass",
      "transport"
    ]
  },
  {
    "name": "conical-flask",
    "category": "📚 Education",
    "tags": [
      "conical",
      "flask",
      "education"
    ]
  },
  {
    "name": "copy",
    "category": "📁 Files",
    "tags": [
      "copy",
      "files"
    ]
  },
  {
    "name": "corner",
    "category": "🎧 Media",
    "tags": [
      "corner",
      "media"
    ]
  },
  {
    "name": "corner-down-left",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "down",
      "left",
      "arrows"
    ]
  },
  {
    "name": "corner-down-right",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "down",
      "right",
      "arrows"
    ]
  },
  {
    "name": "corner-left-down",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "left",
      "down",
      "arrows"
    ]
  },
  {
    "name": "corner-left-up",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "left",
      "up",
      "arrows"
    ]
  },
  {
    "name": "corner-right-down",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "right",
      "down",
      "arrows"
    ]
  },
  {
    "name": "corner-right-up",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "right",
      "up",
      "arrows"
    ]
  },
  {
    "name": "corner-up-left",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "up",
      "left",
      "arrows"
    ]
  },
  {
    "name": "corner-up-right",
    "category": "➡️ Arrows",
    "tags": [
      "corner",
      "up",
      "right",
      "arrows"
    ]
  },
  {
    "name": "crop",
    "category": "🎧 Media",
    "tags": [
      "crop",
      "media"
    ]
  },
  {
    "name": "cup",
    "category": "🎨 Things",
    "tags": [
      "cup",
      "things"
    ]
  },
  {
    "name": "cursor",
    "category": "🎧 Media",
    "tags": [
      "cursor",
      "media"
    ]
  },
  {
    "name": "data",
    "category": "🐞 Programming",
    "tags": [
      "data",
      "programming"
    ]
  },
  {
    "name": "devices",
    "category": "💻 Devices",
    "tags": [
      "devices"
    ]
  },
  {
    "name": "dislike",
    "category": "🏆 Support",
    "tags": [
      "dislike",
      "support"
    ]
  },
  {
    "name": "division",
    "category": "💰 Finance",
    "tags": [
      "division",
      "finance"
    ]
  },
  {
    "name": "dollar",
    "category": "💰 Finance",
    "tags": [
      "dollar",
      "finance"
    ]
  },
  {
    "name": "dots-h",
    "category": "🔔 Essentials",
    "tags": [
      "dots",
      "h",
      "essentials"
    ]
  },
  {
    "name": "dots-h-circle",
    "category": "🔔 Essentials",
    "tags": [
      "dots",
      "h",
      "circle",
      "essentials"
    ]
  },
  {
    "name": "dots-v",
    "category": "🔔 Essentials",
    "tags": [
      "dots",
      "v",
      "essentials"
    ]
  },
  {
    "name": "dots-v-circle",
    "category": "🔔 Essentials",
    "tags": [
      "dots",
      "v",
      "circle",
      "essentials"
    ]
  },
  {
    "name": "download",
    "category": "🔔 Essentials",
    "tags": [
      "download",
      "essentials"
    ]
  },
  {
    "name": "elements",
    "category": "📊 Dashboard",
    "tags": [
      "elements",
      "dashboard"
    ]
  },
  {
    "name": "emoji",
    "category": "🔔 Essentials",
    "tags": [
      "emoji",
      "essentials"
    ]
  },
  {
    "name": "emoji-add",
    "category": "🔔 Essentials",
    "tags": [
      "emoji",
      "add",
      "essentials"
    ]
  },
  {
    "name": "ETH",
    "category": "💎 Crypto",
    "tags": [
      "ETH",
      "crypto"
    ]
  },
  {
    "name": "euro",
    "category": "💰 Finance",
    "tags": [
      "euro",
      "finance"
    ]
  },
  {
    "name": "expand",
    "category": "➡️ Arrows",
    "tags": [
      "expand",
      "arrows"
    ]
  },
  {
    "name": "eye",
    "category": "🔐 Security",
    "tags": [
      "eye",
      "security"
    ]
  },
  {
    "name": "eye-slash",
    "category": "🔐 Security",
    "tags": [
      "eye",
      "slash",
      "security"
    ]
  },
  {
    "name": "face-id",
    "category": "🔐 Security",
    "tags": [
      "face",
      "id",
      "security"
    ]
  },
  {
    "name": "feather",
    "category": "🔔 Essentials",
    "tags": [
      "feather",
      "essentials"
    ]
  },
  {
    "name": "feather-add",
    "category": "🔔 Essentials",
    "tags": [
      "feather",
      "add",
      "essentials"
    ]
  },
  {
    "name": "feather-AI",
    "category": "✨ AI & VR",
    "tags": [
      "feather",
      "AI"
    ]
  },
  {
    "name": "file",
    "category": "📁 Files",
    "tags": [
      "file",
      "files"
    ]
  },
  {
    "name": "file-alt",
    "category": "📁 Files",
    "tags": [
      "file",
      "alt",
      "files"
    ]
  },
  {
    "name": "file-cloud",
    "category": "📁 Files",
    "tags": [
      "file",
      "cloud",
      "files"
    ]
  },
  {
    "name": "file-code",
    "category": "📁 Files",
    "tags": [
      "file",
      "code",
      "files"
    ]
  },
  {
    "name": "file-download",
    "category": "📁 Files",
    "tags": [
      "file",
      "download",
      "files"
    ]
  },
  {
    "name": "file-upload",
    "category": "📁 Files",
    "tags": [
      "file",
      "upload",
      "files"
    ]
  },
  {
    "name": "filter",
    "category": "🔔 Essentials",
    "tags": [
      "filter",
      "essentials"
    ]
  },
  {
    "name": "filter-alt",
    "category": "🔔 Essentials",
    "tags": [
      "filter",
      "alt",
      "essentials"
    ]
  },
  {
    "name": "fingerprint",
    "category": "🔐 Security",
    "tags": [
      "fingerprint",
      "security"
    ]
  },
  {
    "name": "first-aid",
    "category": "⛑️ Health",
    "tags": [
      "first",
      "aid",
      "health"
    ]
  },
  {
    "name": "flag",
    "category": "🔔 Essentials",
    "tags": [
      "flag",
      "essentials"
    ]
  },
  {
    "name": "flower",
    "category": "🌻 Nature",
    "tags": [
      "flower",
      "nature"
    ]
  },
  {
    "name": "folder",
    "category": "📁 Files",
    "tags": [
      "folder",
      "files"
    ]
  },
  {
    "name": "folder-add",
    "category": "📁 Files",
    "tags": [
      "folder",
      "add",
      "files"
    ]
  },
  {
    "name": "folder-cloud",
    "category": "📁 Files",
    "tags": [
      "folder",
      "cloud",
      "files"
    ]
  },
  {
    "name": "folder-cross",
    "category": "📁 Files",
    "tags": [
      "folder",
      "cross",
      "files"
    ]
  },
  {
    "name": "folder-download",
    "category": "📁 Files",
    "tags": [
      "folder",
      "download",
      "files"
    ]
  },
  {
    "name": "folder-lock",
    "category": "📁 Files",
    "tags": [
      "folder",
      "lock",
      "files",
      "secure",
      "security"
    ]
  },
  {
    "name": "folder-move",
    "category": "📁 Files",
    "tags": [
      "folder",
      "move",
      "files"
    ]
  },
  {
    "name": "folder-shield",
    "category": "📁 Files",
    "tags": [
      "folder",
      "shield",
      "files"
    ]
  },
  {
    "name": "folder-upload",
    "category": "📁 Files",
    "tags": [
      "folder",
      "upload",
      "files"
    ]
  },
  {
    "name": "folder-user",
    "category": "📁 Files",
    "tags": [
      "folder",
      "user",
      "files"
    ]
  },
  {
    "name": "fork",
    "category": "🐞 Programming",
    "tags": [
      "fork",
      "programming"
    ]
  },
  {
    "name": "forward",
    "category": "🎧 Media",
    "tags": [
      "forward",
      "media"
    ]
  },
  {
    "name": "game-pad",
    "category": "💻 Devices",
    "tags": [
      "game",
      "pad",
      "devices"
    ]
  },
  {
    "name": "gear-AI",
    "category": "✨ AI & VR",
    "tags": [
      "gear",
      "AI"
    ]
  },
  {
    "name": "gem",
    "category": "🏆 Support",
    "tags": [
      "gem",
      "support"
    ]
  },
  {
    "name": "gift",
    "category": "🏆 Support",
    "tags": [
      "gift",
      "support"
    ]
  },
  {
    "name": "globe",
    "category": "🚗 Transport",
    "tags": [
      "globe",
      "transport"
    ]
  },
  {
    "name": "globe-alt",
    "category": "🚗 Transport",
    "tags": [
      "globe",
      "alt",
      "transport"
    ]
  },
  {
    "name": "gps",
    "category": "🚗 Transport",
    "tags": [
      "gps",
      "transport"
    ]
  },
  {
    "name": "graduating cap",
    "category": "📚 Education",
    "tags": [
      "graduating cap",
      "education"
    ]
  },
  {
    "name": "grid",
    "category": "📊 Dashboard",
    "tags": [
      "grid",
      "dashboard"
    ]
  },
  {
    "name": "grid-2",
    "category": "📊 Dashboard",
    "tags": [
      "grid",
      "2",
      "dashboard"
    ]
  },
  {
    "name": "hashtag",
    "category": "📝 Texts",
    "tags": [
      "hashtag",
      "texts"
    ]
  },
  {
    "name": "heading",
    "category": "📝 Texts",
    "tags": [
      "heading",
      "texts"
    ]
  },
  {
    "name": "headphones",
    "category": "💻 Devices",
    "tags": [
      "headphones",
      "devices"
    ]
  },
  {
    "name": "headset",
    "category": "💻 Devices",
    "tags": [
      "headset",
      "devices"
    ]
  },
  {
    "name": "health-plus",
    "category": "⛑️ Health",
    "tags": [
      "health",
      "plus"
    ]
  },
  {
    "name": "heart",
    "category": "🔔 Essentials",
    "tags": [
      "heart",
      "essentials"
    ]
  },
  {
    "name": "heart-beat",
    "category": "⛑️ Health",
    "tags": [
      "heart",
      "beat",
      "health"
    ]
  },
  {
    "name": "heart-beat-wave",
    "category": "⛑️ Health",
    "tags": [
      "heart",
      "beat",
      "wave",
      "health"
    ]
  },
  {
    "name": "history",
    "category": "⏰ Time",
    "tags": [
      "history",
      "time"
    ]
  },
  {
    "name": "home",
    "category": "🔔 Essentials",
    "tags": [
      "home",
      "essentials"
    ]
  },
  {
    "name": "home-alt",
    "category": "🔔 Essentials",
    "tags": [
      "home",
      "alt",
      "essentials"
    ]
  },
  {
    "name": "image",
    "category": "🎧 Media",
    "tags": [
      "image",
      "media"
    ]
  },
  {
    "name": "image-add",
    "category": "🎧 Media",
    "tags": [
      "image",
      "add",
      "media"
    ]
  },
  {
    "name": "image-check",
    "category": "🎧 Media",
    "tags": [
      "image",
      "check",
      "media"
    ]
  },
  {
    "name": "image-circle",
    "category": "🎧 Media",
    "tags": [
      "image",
      "circle",
      "media"
    ]
  },
  {
    "name": "image-cross",
    "category": "🎧 Media",
    "tags": [
      "image",
      "cross",
      "media"
    ]
  },
  {
    "name": "image-remove",
    "category": "🎧 Media",
    "tags": [
      "image",
      "remove",
      "media"
    ]
  },
  {
    "name": "info-circle",
    "category": "🔔 Essentials",
    "tags": [
      "info",
      "circle",
      "essentials"
    ]
  },
  {
    "name": "info-hexagon",
    "category": "🔔 Essentials",
    "tags": [
      "info",
      "hexagon",
      "essentials"
    ]
  },
  {
    "name": "info-triangle",
    "category": "🔔 Essentials",
    "tags": [
      "info",
      "triangle",
      "essentials"
    ]
  },
  {
    "name": "italics",
    "category": "📝 Texts",
    "tags": [
      "italics",
      "texts"
    ]
  },
  {
    "name": "key",
    "category": "🔐 Security",
    "tags": [
      "key",
      "security"
    ]
  },
  {
    "name": "keyboard",
    "category": "💻 Devices",
    "tags": [
      "keyboard",
      "devices"
    ]
  },
  {
    "name": "lamp",
    "category": "🎨 Things",
    "tags": [
      "lamp",
      "things"
    ]
  }
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

  const color = colorMode === 'custom' ? customColor : colorMode;
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

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
      marginTop: '20px'
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

        return (
          <details key={cat} style={{ marginBottom: '32px' }} open>
            <summary style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#344054',
              borderBottom: '2px solid #F0F2F5',
              paddingBottom: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              {cat}
              <span style={{ fontSize: '12px', color: '#667085', fontWeight: '400', background: '#F0F2F5', padding: '2px 8px', borderRadius: '12px' }}>
                {catIcons.length} {catIcons.length === 1 ? 'icon' : 'icons'}
              </span>
            </summary>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '16px'
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
          </details>
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
