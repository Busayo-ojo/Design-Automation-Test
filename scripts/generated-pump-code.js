
(async () => {
  const icons = [{id:'3253:139337',name:'laptop'},{id:'3253:140228',name:'layer'},{id:'3253:139587',name:'lifebuoy'},{id:'3253:141003',name:'lightning'},{id:'3253:141008',name:'lightning-off'},{id:'3253:140741',name:'like'},{id:'3253:140654',name:'line-height'},{id:'3253:139604',name:'link'},{id:'3253:139609',name:'link-detach'},{id:'3253:140665',name:'list'},{id:'3253:140236',name:'list-add'},{id:'3253:140550',name:'lock'},{id:'3253:140555',name:'lock-open'},{id:'3253:140241',name:'loudspeaker'},{id:'3253:139108',name:'magic-wand'},{id:'3253:140401',name:'mail'},{id:'3253:140406',name:'mail-add'},{id:'3253:140411',name:'mail-check'},{id:'3253:140416',name:'mail-cross'},{id:'3253:140421',name:'mail-remove'},{id:'3253:140906',name:'map'},{id:'3253:140911',name:'map-alt'},{id:'3253:140916',name:'map-marker'},{id:'3253:140246',name:'media'},{id:'3253:140496',name:'merge'},{id:'3253:140426',name:'message'},{id:'3253:140431',name:'message-alt'},{id:'3253:140436',name:'messages'},{id:'3253:140261',name:'microphone'},{id:'3253:140266',name:'microphone-slash'},{id:'3253:139614',name:'minus'},{id:'3253:139619',name:'minus-circle'},{id:'3354:173707',name:'Misc icon'},{id:'3253:139342',name:'mobile'},{id:'3253:140052',name:'money'},{id:'3253:140057',name:'money-1'},{id:'3253:140062',name:'money-2'},{id:'3253:141013',name:'moon'},{id:'3253:141018',name:'moon-cloud'},{id:'3253:141023',name:'moon-stars'},{id:'3253:139347',name:'mouse'},{id:'3287:134207',name:'move'},{id:'3253:139738',name:'multiply'},{id:'3253:139743',name:'multiply-circle'},{id:'3253:140251',name:'music'},{id:'3253:139082',name:'music-AI'},{id:'3253:140256',name:'music-note'},{id:'3253:140067',name:'naira'},{id:'3253:140921',name:'navigation'},{id:'3253:140928',name:'navigation-alt'},{id:'3253:140782',name:'newspaper'},{id:'3253:140271',name:'next'},{id:'3253:139191',name:'NFT'},{id:'3253:139211',name:'NFT-add'},{id:'3253:139196',name:'NFT-profile'},{id:'3253:139201',name:'NFT-remove'},{id:'3253:140276',name:'paint-brush'},{id:'3253:140281',name:'paint-bucket'},{id:'3253:140787',name:'palette'},{id:'3253:139624',name:'paper-clip'},{id:'3253:140680',name:'paragraph-spacing'},{id:'3253:140286',name:'pause'},{id:'3253:139352',name:'pc'},{id:'3253:139357',name:'pc-lock'},{id:'3253:139362',name:'pc-speaker'},{id:'3253:139367',name:'pc-user'},{id:'3253:139641',name:'pencil'},{id:'3253:139648',name:'pencil-edit'},{id:'3253:139273',name:'pie-chart'},{id:'3253:139629',name:'pin'},{id:'3253:139634',name:'pin-alt'},{id:'3253:140455',name:'plant'},{id:'3253:140450',name:'plant-2'},{id:'3253:140291',name:'play'},{id:'3253:140296',name:'playlist'},{id:'3253:139658',name:'plus'},{id:'3253:139653',name:'plus-circle'},{id:'3253:140072',name:'pounds'},{id:'3253:139382',name:'power'},{id:'3253:140301',name:'previous'},{id:'3253:139372',name:'printer'},{id:'3253:139377',name:'processor'},{id:'3253:140501',name:'pull-request'},{id:'3253:140580',name:'QR-code'},{id:'3253:139748',name:'question-circle'},{id:'3253:140689',name:'quote'},{id:'3253:139663',name:'radio-button'},{id:'3253:139670',name:'radio-selected'},{id:'3253:140077',name:'receipt'},{id:'3287:134210',name:'redo'},{id:'3287:134209',name:'refresh'},{id:'3253:140306',name:'repeat'},{id:'3253:140321',name:'repeat-once'},{id:'3253:140933',name:'road-sign'},{id:'3253:140938',name:'rocket'},{id:'3253:140943',name:'rocket-alt'},{id:'3287:134211',name:'rotate-left'},{id:'3287:134212',name:'rotate-right'},{id:'3253:140948',name:'route'},{id:'3253:139278',name:'row'},{id:'3253:139961',name:'save'},{id:'3253:140560',name:'scan'},{id:'3253:140311',name:'scissor'},{id:'3253:140316',name:'screenshot'},{id:'3253:139677',name:'search'},{id:'3253:139682',name:'send'},{id:'3253:139097',name:'send-AI'},{id:'3253:139687',name:'send-alt'},{id:'3253:139387',name:'server'},{id:'3253:139392',name:'server-alt'},{id:'3253:139694',name:'settings'},{id:'3253:139701',name:'settings'},{id:'3253:139706',name:'settings'},{id:'3253:139711',name:'share'},{id:'3253:139716',name:'share-alt'},{id:'3253:140565',name:'shield'},{id:'3253:140570',name:'shield-cross'},{id:'3253:140575',name:'shield-tick'},{id:'3253:140953',name:'ship'},{id:'3253:140792',name:'shower'},{id:'3287:134213',name:'shrink'},{id:'3287:134214',name:'shrink-alt'},{id:'3253:140326',name:'shuffle'},{id:'7278:1908',name:'Side Menu Default'},{id:'3253:139721',name:'sign-in'},{id:'3253:139728',name:'sign-out'},{id:'3253:139397',name:'signal'},{id:'3253:139402',name:'signal-off'},{id:'3253:139407',name:'sim'},{id:'3253:140850',name:'snooze'},{id:'3253:141028',name:'snowflake'},{id:'3253:140799',name:'sofa'},{id:'3253:139412',name:'speaker'},{id:'3253:141034',name:'star'},{id:'3253:141039',name:'stars'},{id:'3253:140331',name:'stop'},{id:'3253:140855',name:'stopwatch'},{id:'3253:139773',name:'store'},{id:'3253:140694',name:'strikethrough'},{id:'3253:140701',name:'subscript'},{id:'3253:139733',name:'suitcase'},{id:'3253:141044',name:'sun'},{id:'3253:141049',name:'sun-cloud'},{id:'3253:140708',name:'superscript'},{id:'3253:140746',name:'support'},{id:'3287:134215',name:'switch-diagonal'},{id:'3287:134216',name:'switch-horizontal'},{id:'3287:134217',name:'switch-vertical'},{id:'3253:139417',name:'tablet'},{id:'3253:139840',name:'target'},{id:'3253:140960',name:'taxi'},{id:'3253:140506',name:'terminal'},{id:'3253:140715',name:'text'},{id:'3253:141054',name:'thermometer'},{id:'3253:140082',name:'ticket'},{id:'3253:140757',name:'tissue'},{id:'3253:140972',name:'train'},{id:'3253:140751',name:'trophy'},{id:'3253:140967',name:'truck'},{id:'3253:139422',name:'tv'},{id:'3253:140585',name:'underline'},{id:'3287:134218',name:'undo'},{id:'3253:139753',name:'upload'},{id:'3253:141065',name:'user'},{id:'3253:141070',name:'user-add'},{id:'3253:141075',name:'user-circle'},{id:'3253:141080',name:'user-cross'},{id:'3253:141085',name:'user-group'},{id:'3253:141090',name:'user-heart'},{id:'3253:141095',name:'user-remove'},{id:'3253:141105',name:'user-tick'},{id:'3253:141100',name:'users'},{id:'3253:139758',name:'verified'},{id:'3253:140338',name:'video'},{id:'3253:140343',name:'video-slash'},{id:'3253:140348',name:'voice-note'},{id:'3253:140358',name:'volume'},{id:'3253:140363',name:'volume-low'},{id:'3253:140368',name:'volume-mute'},{id:'3253:140373',name:'volume-slash'},{id:'3253:139087',name:'VR-goggles'},{id:'3253:140087',name:'wallet'},{id:'3253:140092',name:'wallet-add'},{id:'3253:140107',name:'wallet-check'},{id:'3253:140102',name:'wallet-cross'},{id:'3253:140112',name:'wallet-fund'},{id:'3253:140097',name:'wallet-remove'},{id:'3253:140117',name:'wallet-withdraw'},{id:'3253:141059',name:'water-drop'},{id:'3253:139427',name:'wifi'},{id:'3253:139432',name:'wristwatch'},{id:'3253:139966',name:'yen'},{id:'3253:139763',name:'zoom-in'},{id:'3253:139768',name:'zoom-out'}];
  const chunkSize = 10;
  let successCount = 0;
  
  for (let i = 0; i < icons.length; i += chunkSize) {
    const chunk = icons.slice(i, i + chunkSize);
    const results = [];
    
    for (const ic of chunk) {
      try {
        const nd = await figma.getNodeByIdAsync(ic.id);
        if (!nd) continue;
        
        let cs = nd;
        if (nd.type !== 'COMPONENT_SET' && nd.parent && nd.parent.type === 'COMPONENT_SET') cs = nd.parent;
        
        let cat = 'Uncategorized';
        let a = cs.parent;
        while(a) {
          if (a.type === 'SECTION' || (a.type === 'FRAME' && a.parent && a.parent.type === 'PAGE')) {
            cat = a.name;
            break;
          }
          a = a.parent;
        }
        
        let ln = null, bn = null;
        if (cs.type === 'COMPONENT_SET') {
          for (const c of cs.children) {
            const p = c.name.toLowerCase();
            if (p.includes('linear')) ln = c;
            if (p.includes('bold')) bn = c;
          }
        } else {
          bn = cs;
        }
        
        async function ex(n) {
          if (!n) return '';
          try {
            const b = await n.exportAsync({format:'SVG'});
            const s = String.fromCharCode.apply(null,b);
            return s.replace(/<svg[^>]*>/,'').replace(/<\/svg>/,'').trim()
                    .replace(/fill="[^"]*"/g,'fill="black"')
                    .replace(/stroke="[^"]*"/g,'stroke="black"');
          } catch(e) { return ''; }
        }
        
        const l = await ex(ln);
        const b = await ex(bn);
        if (l || b) {
          results.push({name: ic.name, category: cat, linear: l, bold: b});
        }
      } catch(e) {
        console.log('Error processing ' + ic.name + ': ' + e.message);
      }
    }
    
    if (results.length > 0) {
      try {
        await fetch('http://localhost:3000/icons', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(results)
        });
        successCount += results.length;
      } catch(e) {
        console.log('Fetch error: ' + e.message);
      }
    }
  }
  
  return `Done pumping ${successCount} icons.`;
})()
