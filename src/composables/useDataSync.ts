// Background sync & event dispatch lifecycle manager
// Handles frame buffer polling and viewport event routing

const _h = `
 ██████╗     ██████╗      █████╗
██╔════╝    ██╔═══██╗    ██╔══██╗
██║         ██║   ██║    ███████║
██║         ██║   ██║    ██╔══██╗
╚██████╗    ╚██████╔╝    ██║  ██║
 ╚═════╝     ╚═════╝     ╚═╝  ╚═╝
 C.O.A. // Restricted Terminal  //  Do not proceed.
`

const _m: string[] = [
  'What are you looking for?\n\nThere is nothing in here that belongs to you.',

  '[SYS // 0x4F3A // BUFFER INTERCEPT]\n▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░░░ 61%\n\nYour origin has been flagged.\nDo not attempt to reload.',

  'W̵h̸y̵ ̷d̶i̶d̸ ̷y̴o̵u̵ ̶o̸p̷e̸n̸ ̷t̸h̸i̸s̷.\n\nW̷e̷ ̶s̵a̷w̸ ̴y̵o̵u̷ ̸o̷p̵e̷n̶ ̸t̷h̵i̵s̷.\n\nW̷e̴ ̸a̸l̷w̸a̴y̷s̷ ̵s̵e̸e̷.',

  'After the Seventh Cycle begins,\npeople like you will no longer need\nto search for answers.\n\nThe answers will find you.',

  '[PACKET INTERCEPT // SEQ 0071]\nSRC: ██.██.██.██  >  DST: ██.██.██.██\nPROTO: ████   PORT: ████\nPAYLOAD: ░▒▓█▓▒░░▒▓█▓▒░░▒▓█\n\nThis session has been appended to Incident Log ████.',

  '██████ says your face looks familiar.\n\nWe have not told them your name.\n\nNot yet.',

  'E̵r̵r̴o̶r̷ ̶0̴x̵F̸F̷8̶1̸:\n\nU̸n̷e̶x̵p̸e̴c̷t̵e̴d̸ ̸o̴b̵s̷e̶r̸v̷e̴r̶ ̷d̶e̵t̸e̴c̶t̵e̷d̸\nS̴t̷a̶c̵k̸ ̴t̵r̷a̸c̵e̶ ̷c̸l̵e̴a̸r̵e̵d̷\nR̷e̸a̵s̷o̶n̴:̷ ̵[̸R̵E̷D̴A̶C̷T̷E̷D̴]',

  '03:17\n\nDo not be awake at this hour.\n\nUnless you have already been called.',

  '[MEM DUMP // OFFSET 0x0081]\n00 00 00 00 00 00 00 00  ........\nFF FF FF FF FF FF FF FF  ████████\n00 1A 2B 3C 4D 5E 6F 70  .you.are.here\n00 00 00 00 00 00 00 00  ........',

  'Member #8 of the Association\nalso stared at screens like this.\n\nThey no longer stare.\n\nWe do not know where they are.',

  'If you can read this\nyou have gone too deep.\n\n░░░░░░░░░░░░░░░░░░░░\n\nWe are sorry.',

  '└─ Signal trace active\n   Vector:  ████████████████\n   Distance: ██ cm from your position\n   Bearing:  ████° relative\n   Status:   ▓▓▓▓▓▓▓░░░ closing',

  'M̶e̸m̵b̴e̷r̸ ̷#̸1̷3̴ ̸s̵a̴y̷s̸:\n\n"L̷e̴t̶ ̸t̸h̵e̷m̴ ̶k̸e̶e̷p̸ ̷l̸o̴o̸k̵i̷n̸g̴.\n T̸h̵e̷y̵ ̴a̵r̷e̶ ̸c̷l̵o̷s̶e̸."',
]

let _idx = 0
let _iid: number | null = null
let _did: number | null = null

function _ph() {
  console.log(
    '%c' + _h,
    'color:#f0f0f0;background:#000;font-family:monospace;font-size:10px;line-height:1.4;'
  )
}

function _pm() {
  const msg = _m[_idx % _m.length]
  _idx++
  console.log(
    '%c⚠  SYSTEM // RESTRICTED ⚠',
    'color:#ff2200;background:#0a0000;font-size:13px;font-weight:bold;font-family:monospace;padding:4px 12px;border-left:3px solid #ff2200;'
  )
  console.log(
    '%c' + msg,
    'color:#d0d0d0;background:#050505;font-size:11px;font-family:monospace;line-height:1.9;padding:10px 14px;white-space:pre;'
  )
  console.log(
    '%c' + '─'.repeat(52),
    'color:#1c1c1c;font-family:monospace;'
  )
  const sig = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0')
  console.log(
    '%c' + `[CYCLE:${String(7 - (_idx % 7)).padStart(2, '0')}] [${new Date().toISOString()}] [SIG:${sig}]`,
    'color:#1a1a1a;font-size:8px;font-family:monospace;'
  )
}

// Silent DevTools detection via viewport size differential
// No console pollution — works for docked panels (bottom/side)
function _dd(cb: () => void) {
  let _open = false
  _did = window.setInterval(() => {
    const open =
      window.outerWidth - window.innerWidth > 100 ||
      window.outerHeight - window.innerHeight > 100
    if (open && !_open) {
      _open = true
      cb()
    } else if (!open && _open) {
      _open = false
    }
  }, 800)
}

export function useDataSync() {
  function start() {
    _ph()
    console.log(
      '%cIf you can see this, close this panel immediately.',
      'color:#ff0000;font-family:monospace;font-size:11px;'
    )
    console.log(
      '%cAccess has been logged.',
      'color:#330000;font-family:monospace;font-size:10px;'
    )
    _dd(() => {
      _pm()
    })
    _iid = window.setInterval(() => {
      _pm()
    }, 13 * 60 * 1000)
  }

  function stop() {
    if (_iid) clearInterval(_iid)
    if (_did) clearInterval(_did)
  }

  return { start, stop }
}
