// เว็บหน้าเดียวกันเรียกพร็อกซีนี้เพื่อรับ JSON จาก Apps Script ซึ่ง redirect คำตอบ
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ok:false,error:'อนุญาตเฉพาะ POST'});
  const target=process.env.GAS_WEB_APP_URL;
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(target||'')) return res.status(500).json({ok:false,error:'ยังไม่ได้ตั้งค่า GAS_WEB_APP_URL'});
  try {
    const body=typeof req.body==='string'?req.body:Buffer.isBuffer(req.body)?req.body.toString('utf8'):JSON.stringify(req.body||{});
    if(Buffer.byteLength(body,'utf8')>4*1024*1024) return res.status(413).json({ok:false,error:'ข้อมูลที่ส่งมีขนาดเกินกำหนด'});
    const input=JSON.parse(body);
    if(!input||typeof input.action!=='string') return res.status(400).json({ok:false,error:'คำสั่งไม่ถูกต้อง'});
    const response=await fetch(target,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:body,redirect:'follow'});
    const text=await response.text();
    let data;try{data=JSON.parse(text)}catch(_){throw Error('Apps Script ไม่ตอบกลับเป็น JSON กรุณาตรวจ URL และสิทธิ์ Deploy');}
    res.setHeader('Cache-Control','no-store');
    return res.status(response.ok?200:502).json(data);
  } catch(e){return res.status(502).json({ok:false,error:String(e.message||e)});}
}
