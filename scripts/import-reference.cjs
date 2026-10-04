/* eslint-disable @typescript-eslint/no-require-imports */
/* One-time import of the supplied public design. No Framer scripts are executed. */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const postcss = require('postcss');
const sourcePath = process.argv[2] || '/tmp/onefin-source.html';
const $ = cheerio.load(fs.readFileSync(sourcePath, 'utf8'));
const out = 'components/onefin';
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync('public/onefin', { recursive: true });
for (const file of fs.readdirSync('/tmp/onefin-capture/assets')) fs.copyFileSync('/tmp/onefin-capture/assets/' + file, 'public/onefin/' + file);
const localize = value => value.replace(/https:\/\/(?:framerusercontent\.com\/(?:images|assets)|fonts\.gstatic\.com)[^\s"'<>),;]+/g, url => '/onefin/' + path.basename(url.split('?')[0]));
let css = $('style').map((i,e) => $(e).text()).get().join('\n');
css = localize(css);
// Keep the original responsive typography and geometry, without the Framer runtime.
fs.writeFileSync('app/reference.css', css);
$('script,link,meta,style').remove();
$('[data-framer-name="Hero"]').attr('id','home');
for (const name of ['Benefits','About','Features','Integrations','Testimonials','Pricing','Blog','FAQs']) $('section[data-framer-name="'+name+'"]').attr('id',name.toLowerCase());
const navLinks={'./':'#home','./about':'#about','./features':'#features','./pricing':'#pricing','./blog':'#blog','./faqs':'#faqs'};
$('a').each((i,e)=>{const a=$(e),href=a.attr('href'); if(navLinks[href])a.attr('href',navLinks[href]);else if(href?.startsWith('./'))a.attr('href','https://onefin.framer.website/'+href.slice(2));if(a.attr('target')==='_blank')a.attr('rel','noopener noreferrer');});
$('img').each((i,e)=>{const a=$(e);a.removeAttr('srcset');a.removeAttr('sizes');a.attr('src',localize(a.attr('src')||''));if(a.closest('[data-framer-name="Hero"]').length)a.attr('loading','eager');});
$('video').attr('loop','').attr('preload','metadata');
$('[style]').each((i,e)=>{let a=$(e),s=localize(a.attr('style'));if(e.tagName==='span'&&s.includes('opacity:0.001')) {a.attr('data-letter','');s=s.replace(/opacity:[^;]+;?/g,'').replace(/filter:[^;]+;?/g,'').replace(/transform:[^;]+;?/g,'');} if(a.attr('data-framer-appear-id')) {s=s.replace(/opacity:[^;]+;?/g,'').replace(/transform:[^;]+;?/g,'');a.attr('data-entrance','');}a.attr('style',s);});
$('h1,h2,h3').each((i,e)=>{if($(e).find('[data-letter]').length)$(e).attr('data-reveal','');});
$('[data-framer-appear-id]').removeAttr('data-framer-appear-id');
// All visible marks are the original SVG paths, stored as a local sprite.
const sprite=$('#svg-templates').html();fs.writeFileSync('public/onefin/sprite.svg','<svg xmlns="http://www.w3.org/2000/svg">'+sprite+'</svg>');
$('use').each((i,e)=>{const a=$(e),h=a.attr('href')||a.attr('xlink:href');if(h?.startsWith('#svg')){a.attr('href','/onefin/sprite.svg'+h);a.removeAttr('xlink:href');}});
$('video').each((i,e)=>$(e).attr('src',localize($(e).attr('src')||'')));

// Prepare accessible stateful controls using the measured source structures.
const mobileNav=$('nav.framer-v-1ntxijd');
mobileNav.find('.framer-ketp50').append($('nav').first().find('.framer-1qrocwq-container').clone().addClass('mobile-contact'));
$('nav .framer-78iO7').attr('role','button').attr('aria-label','Open menu').attr('aria-expanded','false');
$('.framer-1i67jem').attr('role','switch').attr('aria-label','Annual billing').attr('aria-checked','false');
$('.framer-eLgIX').each((i,e)=>{const a=$(e);a.attr('role','button').attr('aria-expanded',i%5===0?'true':'false');a.attr('aria-label',a.find('.framer-kg7wsu').text());a.attr('data-faq',String(i%5));a.find('.framer-11jd2sk').attr('id','faq-answer-'+i);a.attr('aria-controls','faq-answer-'+i);});
const descs=['See all your cards, accounts, and transactions in one place.','Automatically organize expenses by type and priority.','Get notifications and summaries of your spending habits.','Set spending limits and get notified before you overspend.'];
const descriptionTemplate=$('.framer-THpZs .framer-1p6p93y').first().clone();
$('.framer-BZHiH').each((i,panel)=>{$(panel).find('.framer-THpZs').each((j,row)=>{const a=$(row);a.attr('data-spend',String(j)).attr('role','button').attr('aria-pressed',j===0?'true':'false').attr('tabindex','0');if(!a.find('.framer-1p6p93y').length){const desc=descriptionTemplate.clone();desc.find('p').text(descs[j]);a.find('.framer-2l33hf').append(desc);}})});
$('section').filter((i,e)=>$(e).attr('style')?.includes('list-style-type:none')).each((i,e)=>{$(e).css('opacity','1');const ul=$(e).children('ul');if(ul.length){ul.addClass('onefin-ticker');ul.append(ul.children().clone().attr('aria-hidden','true'));}});
$('.framer-3v7xp3 [data-highlight]').attr('data-download-trigger','true').attr('role','button').attr('aria-label','Download now');
// Scope the download trigger to the actual secondary CTA (the first is a link).
$('.framer-3v7xp3 [data-download-trigger]').filter((i,e)=>$(e).text().trim()!=='Download now').removeAttr('data-download-trigger').removeAttr('role').removeAttr('aria-label');
$('.framer-1ibou1o .framer-1154f73').css('transform','rotate(18deg)');
$('.framer-1ibou1o .framer-8ytohn').css('transform','rotate(9deg)');
$('.framer-1ibou1o .framer-14nwv2u').css('transform','translate(-50%, -50%) rotate(-13deg)');
$('.framer-1ibou1o .framer-12og78t').css('transform','translate(-50%, -50%) rotate(-12deg)');


const spendNumber=$('.framer-THpZs .framer-6ayu7c').first().clone();
$('.framer-THpZs').each((i,e)=>{const a=$(e);if(!a.find('.framer-6ayu7c').length)a.find('.framer-nzf4uo').prepend(spendNumber.clone());a.find('.framer-6ayu7c p').text(String(Number(a.attr('data-spend'))+1));});
const paymentNumber=$('.framer-8iAWR .framer-1nq8kco').first().clone();
$('.framer-IUzw1').each((i,panel)=>{$(panel).find('.framer-8iAWR').each((j,e)=>{const a=$(e);a.attr('data-payment-indicator',String(j));if(!a.find('.framer-1nq8kco').length)a.append(paymentNumber.clone());a.find('.framer-1jg8zy p').text(String(j+1));});});

const attrMap={datetime:'dateTime',class:'className',tabindex:'tabIndex',srcset:'srcSet',autoplay:'autoPlay',playsinline:'playsInline',viewbox:'viewBox',preserveaspectratio:'preserveAspectRatio',crossorigin:'crossOrigin',fillrule:'fillRule',cliprule:'clipRule',strokewidth:'strokeWidth',strokelinecap:'strokeLinecap',strokelinejoin:'strokeLinejoin',strokeopacity:'strokeOpacity',fillopacity:'fillOpacity',xlinkhref:'xlinkHref'};
const ignored=new Set(['parentsize','_constraints','rotation','shadows','fetchpriority','data-framer-hydrate-v2']);
const voids=new Set(['img','input','br','hr','source','wbr']);
const bools=new Set(['autoplay','muted','playsinline','loop','controls']);
function styleObject(s){const o={};postcss.parse('x{'+s+'}').first.nodes.forEach(n=>{if(n.type==='decl'){let k=n.prop.startsWith('--')?n.prop:n.prop.replace(/^-ms-/,'ms-').replace(/-([a-z])/g,(_,x)=>x.toUpperCase());o[k]=n.value;}});return o;}
function render(n,d=0){if(n.type==='text')return n.data?'{'+JSON.stringify(n.data)+'}':'';if(n.type!=='tag')return '';let tag=n.name, attrs=[];for(const [k,v] of Object.entries(n.attribs||{})){if(ignored.has(k)||/^on/i.test(k)||k==='name'&&!['input','button'].includes(tag))continue;if(k==='style'){attrs.push('style={'+JSON.stringify(styleObject(v))+' as CSSProperties}');continue;}let key=attrMap[k]||k;if(k.includes('-')&&!k.startsWith('data-')&&!k.startsWith('aria-'))key=k.replace(/-([a-z])/g,(_,x)=>x.toUpperCase());attrs.push(k==='tabindex'?key+'={'+Number(v)+'}':bools.has(k)?key+'={true}':key+'='+JSON.stringify(v));}let head='<'+tag+(attrs.length?' '+attrs.join(' '):'');if(voids.has(tag))return head+' />';return head+'>\n'+(n.children||[]).map(x=>render(x,d+1)).join('')+'\n</'+tag+'>\n';}
function write(name,nodes){let body=nodes.map(n=>render(n)).join('');fs.writeFileSync(out+'/'+name+'.tsx','/* Source-matched presentation; original local assets and responsive styles. */\n'+(body.includes('<img')?'/* eslint-disable @next/next/no-img-element */\n':'')+'import type { CSSProperties } from "react";\n\nexport function '+name+'() { return <>\n'+body+'</>; }\n');}
const root=$('[data-layout-template]').first(), main=$('.framer-72rtr7').first();
write('Navigation',[root.children().first()[0]]);
const names=[];let stats=[],download=[];
main.children().each((i,e)=>{const name=$(e).attr('data-framer-name');if(name){const comp=name==='FAQs'?'Faqs':name;write(comp,[e]);names.push(comp);}else if($(e).text().includes('Proven Performance'))stats.push(e);else if($(e).text().includes('Clarity.'))download.push(e);});
write('StoreButtons',$('.framer-GVD4i').slice(0,2).toArray());
write('Statistics',stats);write('Download',download);write('Footer',root.children('.ssr-variant').toArray());
fs.writeFileSync(out+'/layout-data.json',JSON.stringify({rootClass:root.attr('class'),mainClass:main.attr('class')}));
console.log('Created',names.join(', '),'Statistics, Download, Navigation, Footer');
